import React from "react";
import Sidebar from "react-sidebar";
import {withRouter} from "react-router-dom";

import ChatLog from "./ChatLog";
import ChatSidebar from "./ChatSidebar";
import UserProfile from "./UserProfile";
import {ContextLayout} from "../../utility/context/Layout";

import "../../assets/scss/pages/app-chat.scss";

const mql = window.matchMedia(`(min-width: 992px)`);

class Feedbacks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: null,
            activeChat: null,
            sidebarOpen: false,
            activeChatID: null,
            userProfile: false,
            userSidebar: false,
            receiverProfile: false,
            sidebarDocked: mql.matches
        };
    }

    // mounted = false
    handleUserSidebar = status => {
        this.setState({userProfile: status === "open"});
    };

    handleReceiverSidebar = status => {
        this.setState({receiverProfile: status === "open"});
    };

    handleActiveChat = (caseId, user) => {
        this.setState({activeChatID: caseId, activeUser: user});
    };

    onSetSidebarOpen = open => {
        this.setState({ sidebarOpen: open })
    }

    mediaQueryChanged = () => {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
    }

    UNSAFE_componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged)
    }

  render() {
    return (
      <div className="chat-application position-relative">
        <div
          className={`chat-overlay ${
            this.state.receiverProfile ||
            this.state.userSidebar ||
            this.state.sidebarOpen
              ? "show"
              : "d-none"
          }`}
          onClick={() => {
            this.handleReceiverSidebar("close")
            this.handleUserSidebar("close")
            this.onSetSidebarOpen(false)
          }}
        />
        <ContextLayout.Consumer>
          {context => (
            <Sidebar
              sidebar={
                <ChatSidebar
                    mainSidebar={this.onSetSidebarOpen}
                    activeChatId={this.state.activeChatID}
                    handleActiveChat={this.handleActiveChat}
                    handleUserSidebar={this.handleUserSidebar}
                />
              }
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              touch={false}
              sidebarClassName="chat-sidebar"
              contentClassName="sidebar-children d-none"
              pullRight={context.state.direction === "rtl"}>
                <></>
            </Sidebar>
          )}
        </ContextLayout.Consumer>
        <ChatLog
            activeUser={this.state.activeUser}
            mainSidebar={this.onSetSidebarOpen}
            activeChatID={this.state.activeChatID}
            handleReceiverSidebar={this.handleReceiverSidebar}
        />
        <UserProfile
          activeUser={this.state.activeUser}
          receiverProfile={this.state.receiverProfile}
          handleReceiverSidebar={this.handleReceiverSidebar}
        />
      </div>
    )
  }
}

export default withRouter(Feedbacks);
