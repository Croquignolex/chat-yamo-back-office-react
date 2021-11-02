import React from "react"
import ChatLog from "./ChatLog"
import Sidebar from "react-sidebar"
import ChatSidebar from "./ChatSidebar"
import {withRouter} from "react-router-dom";
import "../../assets/scss/pages/app-chat.scss"
import ReceiverSidebar from "./receiverProfile"
import {ContextLayout} from "../../utility/context/Layout"

const mql = window.matchMedia(`(min-width: 992px)`);

class Feedbacks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userProfile: false,
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            activeChatID: null,
            activeChat: null,
            activeUser: null,
            receiverProfile: false,
            userSidebar: false
        };
    }

    // mounted = false
    handleUserSidebar = status => {
        this.setState({userProfile: status === "open"});
    };

    handleReceiverSidebar = status => {
        this.setState({
            receiverProfile: status === "open"
        });
    };

    handleActiveChat = (caseId, user) => {
        this.setState({
            activeChatID: caseId,
            activeUser: user
        });
    };

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
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
                    activeChatId={this.state.activeChatID}
                    handleActiveChat={this.handleActiveChat}
                    handleUserSidebar={this.handleUserSidebar}
                    mainSidebar={this.onSetSidebarOpen}
                />
              }
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              touch={false}
              sidebarClassName="chat-sidebar"
              contentClassName="sidebar-children d-none"
              pullRight={context.state.direction === "rtl"}>
                {null}
            </Sidebar>
          )}
        </ContextLayout.Consumer>
        {/*<UserSidebar
          userProfile={this.state.userSidebar}
          handleUserSidebar={this.handleUserSidebar}
        />*/}
        <ChatLog
            mql={mql}
            caseId={this.state.activeChatID}
            activeUser={this.state.activeUser}
            mainSidebar={this.onSetSidebarOpen}
            handleReceiverSidebar={this.handleReceiverSidebar}
        />
        <ReceiverSidebar
          activeUser={this.state.activeUser}
          receiverProfile={this.state.receiverProfile}
          handleReceiverSidebar={this.handleReceiverSidebar}
        />
      </div>
    )
  }
}

export default withRouter(Feedbacks);
