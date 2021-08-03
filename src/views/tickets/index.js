import React from "react"
import ChatLog from "./ChatLog"
import Sidebar from "react-sidebar"
import {connect} from "react-redux";
import ChatSidebar from "./ChatSidebar"
import UserSidebar from "./UserSidebar"
import {withRouter} from "react-router-dom";
import "../../assets/scss/pages/app-chat.scss"
import ReceiverSidebar from "./receiverProfile"
import {urlConfig} from "../../configs/AppConfig";
import {searchUrlParams} from "../../helpers/helpers";
import {ContextLayout} from "../../utility/context/Layout"

const mql = window.matchMedia(`(min-width: 992px)`);

class Ticket extends React.Component {
    constructor(props) {
        super(props);

        const caseId = searchUrlParams(urlConfig.params.caseId);

        this.state = {
            userProfile: false,
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            activeChatID: Number(caseId) || null,
            activeChat: null,
            activeUser: null,
            receiverProfile: false,
            userSidebar: false
        };
    }

    updateUrlParams = (caseId) => {
        if (caseId) {
            const url = new URL(window.location);
            url.searchParams.set(urlConfig.params.caseId, `${caseId}`);
            window.history.pushState({}, '', url);
        }
    };

    // mounted = false
  handleUserSidebar = status => {
    if (status === "open") {
      this.setState({
        userProfile: true
      })
    } else {
      this.setState({
        userProfile: false
      })
    }
  };

    handleActiveChat = (caseId, user) => {
        this.setState({
            activeChatID: caseId,
            activeUser: user
        });
        this.updateUrlParams(caseId);
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
        <UserSidebar
          userProfile={this.state.userSidebar}
          handleUserSidebar={this.handleUserSidebar}
        />
        <ChatLog
            mql={mql}
            activeUser={this.state.activeUser}
            mainSidebar={this.onSetSidebarOpen}
            activeCaseId={this.state.activeChatID}
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

const mapStateToProps = ({ tickets }) => ({
    // tickets
});

export default connect(mapStateToProps, {})(withRouter(Ticket));
