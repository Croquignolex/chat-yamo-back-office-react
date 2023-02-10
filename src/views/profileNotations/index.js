import React from "react";
import dayjs from "dayjs";
import Sidebar from "react-sidebar";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import ImageLog from "./ImageLog";
import ImageSidebar from "./ImageSidebar";
import UserProfile from "../../components/UserProfile";
import {ContextLayout} from "../../utility/context/Layout";
import {getImagesForNotedCount, sendNotedImages} from "../../redux/actions/IndependentActions";

import "../../assets/scss/pages/app-chat.scss";

const mql = window.matchMedia(`(min-width: 992px)`);

class ImageVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            verified: 0,
            activeUser: null,
            activeChat: null,
            sidebarOpen: false,
            activeChatID: null,
            userProfile: false,
            userSidebar: false,
            receiverProfile: false,
            sidebarDocked: mql.matches,
            // date: dayjs().startOf('day'),
            deletedImages: [],
            toVerify: 0
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
        let nextUser = null;

        if(user !== null && user.images) {
            // Remove deleted images in list
            let tempImages = user.images.filter((i) => {
                let flag = true;
                this.state.deletedImages.forEach((_i) => {
                    if(_i.mediaId === i.mediaId) flag = false;
                })
                return flag;
            });
            nextUser = {...user, images: tempImages};
        }

        this.setState({activeChatID: caseId, activeUser: nextUser});
    };

    handleRemoveImage = (image) => {
        /*const backOfficeUserId = this.props.backOfficeUserId;
        const date = this.state.date.format('YYYY-MM-DD');*/

        /*sendNotedImages(backOfficeUserId, date, this.state.toVerify)
            .then(() => {
                getImagesForNotedCount(backOfficeUserId, date)
                    .then(res => {
                        this.setState({verified: res.count || 0});
                    });
            });*/

        this.setState((prevState) => {
            const tempImages = prevState.deletedImages;
            tempImages.push(image);
            return {deletedImages: tempImages};
        });
    };

    handleRemoveAllImages = (images) => {
        /*const backOfficeUserId = this.props.backOfficeUserId;
        const date = this.state.date.format('YYYY-MM-DD');*/

        /*sendNotedImages(backOfficeUserId, date, this.state.toVerify)
            .then(() => {
                getImagesForNotedCount(backOfficeUserId, date)
                    .then(res => {
                        this.setState({verified: res.count || 0});
                    });
            });*/

        this.setState((prevState) => {
            const tempImages = [...prevState.deletedImages, ...images];
            const tempVerified = prevState.verified + 1;
            return {deletedImages: tempImages, verified: tempVerified};
        });
    };

    handleResetImage = () => {
        this.setState({verified: 0, deletedImages: []});
        /*getImagesForNotedCount(this.props.backOfficeUserId, this.state.date.format('YYYY-MM-DD'))
            .then(res => {
                this.setState({verified: res.count || 0, deletedImages: []});
            });*/
    };

    handleImagesToNotate = (toVerify) => {
        this.setState({toVerify});
    }

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
      <div className="chat-application position-relative fullHeight">
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
                <ImageSidebar
                    verified={this.state.verified} 
                    mainSidebar={this.onSetSidebarOpen}
                    activeChatId={this.state.activeChatID}
                    handleResetImage={this.handleResetImage}
                    handleActiveChat={this.handleActiveChat}
                    handleUserSidebar={this.handleUserSidebar}
                    handleImagesToNotate={this.handleImagesToNotate}
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
        <ImageLog
            activeUser={this.state.activeUser}
            mainSidebar={this.onSetSidebarOpen}
            activeChatID={this.state.activeChatID}
            handleRemoveImage={this.handleRemoveImage}
            handleRemoveAllImages={this.handleRemoveAllImages}
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

const mapStateToProps = state => {
    return {
        backOfficeUserId: state.authUser?.data?.entityId,
    }
};

export default connect(mapStateToProps)(withRouter(ImageVerification))
