import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import ImageLog from "./ImageLog";
import User from "../../models/User";
import ImageHeader from "./ImageHeader";
import UserProfile from "../../components/UserProfile";
import {getUserProfileImagesForNotation} from "../../redux/actions/IndependentActions";

import "../../assets/scss/pages/app-chat.scss";

const mql = window.matchMedia(`(min-width: 992px)`);

class ImageVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            verified: 0,
            toVerify: 0,
            users: [],
            activeUser: null,
            activeChatID: null,
            loading: false,
            error: null,
            // activeChat: null,
            userProfile: false,
            userSidebar: false,
            receiverProfile: false,
            // date: dayjs().startOf('day'),
            // deletedImages: [],
            sidebarOpen: false,
            sidebarDocked: mql.matches,
        };
    }

    // mounted = false
    handleUserSidebar = status => {
        this.setState({userProfile: status === "open"});
    };

    handleReceiverSidebar = status => {
        this.setState({receiverProfile: status === "open"});
    };

    handleActiveUser = (data, note = false) => {
        const activeUser = new User(data);
        const verified = note ? this.state.verified + 1 : this.state.verified;
        this.setState({activeUser, verified});
    };

    /*handleActiveChat = (caseId, user) => {
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
            nextUser = new User({...user, images: tempImages});
        }

        this.setState({activeChatID: caseId, activeUser: nextUser});
    };*/

    /*handleRemoveImage = (image) => {
        this.setState((prevState) => {
            const tempImages = prevState.deletedImages;
            tempImages.push(image);
            return {deletedImages: tempImages};
        });
    };*/

    /*handleRemoveAllImages = (images) => {
        this.setState((prevState) => {
            // const tempImages = [...prevState.deletedImages, ...images];
            const tempVerified = prevState.verified + 1;
            // return {deletedImages: tempImages, verified: tempVerified};
            return {verified: tempVerified};
        });
    };*/

    /*handleResetImage = () => {
        this.setState({verified: 0, deletedImages: []});
    };*/

    /*handleImagesToNotate = (toVerify) => {
        this.setState({toVerify});
    }*/

    onSetSidebarOpen = open => {
        this.setState({ sidebarOpen: open })
    }

    mediaQueryChanged = () => {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
    }

    componentDidMount() {
        this.loadData();
    }

    UNSAFE_componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged)
    }

    handleChangeUser = (next) => {
        const users = this.state.users;
        const length = users.length;

        if(length > 1) {
            let currentIndex = 0;
            let i = 0;

            users.forEach(user => {
                if(user.id === this.state.activeChatID) currentIndex = i;
                i++;
            });

            let nextIndex = next ? currentIndex + 1 : currentIndex - 1;

            if(nextIndex < 0) nextIndex = length - 1;
            else if(nextIndex > (length - 1)) nextIndex = 0;

            const activeUser = users[nextIndex];

            this.setState({activeUser, activeChatID: activeUser.id});
        }
    }

    handleSearch = (e, needle) => {
        e.preventDefault();
        if(needle && (needle !== "") && (needle !== this.state.activeChatID)) {
            const activeUser = {id: needle};
            this.setState({toVerify: 1, verified: 0, users: [activeUser], activeUser, activeChatID: activeUser.id});
        }
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, users: [], search: "", verified: 0});

        getUserProfileImagesForNotation()
            .then(res => {
                let users = res.reduce(function(results, org) {
                    results[org.userId] = [...results[org.userId] || [], org];
                    return results;
                }, {})

                const buildUsers = [];

                for(const user of Object.values(users)) {
                    const id = user[0].userId;
                    if(id) buildUsers.push({id});
                }

                const activeUser = buildUsers[0];

                if(activeUser.id === this.state.activeChatID) {
                    this.setState({toVerify: buildUsers.length, users: buildUsers});
                } else {
                    this.setState({toVerify: buildUsers.length, users: buildUsers, activeUser, activeChatID: activeUser.id});
                }
            })
            .catch(error => console.log("error ", error))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };
 
  render() {
    return (
      <div className="chat-application position-relative fullHeight">
          <ImageHeader
              verified={this.state.verified}
              toVerify={this.state.toVerify}
              loadData={this.loadData}
              handleSearch={this.handleSearch}
          />
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
        {/*<ContextLayout.Consumer>
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
        </ContextLayout.Consumer>*/}
        <ImageLog
            activeUser={this.state.activeUser}
            activeChatID={this.state.activeChatID}
            loading={this.state.loading}
            error={this.state.error}
            showNavigation={this.state.users.length > 1}
            handleChangeUser={this.handleChangeUser}
            mainSidebar={this.onSetSidebarOpen}
            handleActiveUser={this.handleActiveUser}
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
