import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import ImageLog from "./ImageLog";
import User from "../../models/User";
import ImageHeader from "./ImageHeader";
import UserProfile from "../../components/UserProfile";
import {getProfilesToDoubleCheck} from "../../redux/actions/IndependentActions";

import "../../assets/scss/pages/app-chat.scss";
import dayjs from "dayjs";

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
            activeUserIndex: 0,
            loading: false,
            error: null,
            lastActionNext: true,
            userProfile: false,
            userSidebar: false,
            receiverProfile: false,
            activeDescription: "",
            categories: "BLACKLISTED_URL",
            dates: dayjs().format('YYYY-MM-DD'),
            sidebarOpen: false,
            sidebarDocked: mql.matches,

            selectedDate: new Date()
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

            if(nextIndex < 0) nextIndex = 0;
            else if(nextIndex > (length - 1)) nextIndex = (length - 1);

            const activeUser = users[nextIndex];

            this.setState({activeUser, activeChatID: activeUser.id, activeUserIndex: nextIndex, lastActionNext: next});
        }
    }

    handleSearch = (needle) => {
        if(needle !== this.state.activeChatID) {
            const activeUser = {id: needle};
            this.setState({
                toVerify: 0,
                verified: 0,
                activeUserIndex: 0,
                users: [activeUser],
                activeUser,
                categories: "",
                dates: "",
                activeChatID: activeUser.id
            });
        }
    }

    handleToVerify = () => {
        if(this.state.toVerify === 0) {
            this.setState({toVerify: 1});
        }
    }

    loadData = (categories, dates) => {
        let cat, dat = "";

        if(categories && dates) {
            this.setState({categories, dates});

            cat = categories;
            dat = dates;
        } else {
            cat = this.state.categories;
            dat = this.state.dates;
        }

        // Init request
        this.setState({
            loading: true, error: null, users: [], search: "", verified: 0, activeUserIndex: 0,
            activeUser: null, activeChatID: null,
        });

        getProfilesToDoubleCheck(cat, dat)
            .then(res => {
                let users = res.reduce(function(results, org) {
                    results[org.userId] = [...results[org.userId] || [], org];
                    return results;
                }, {})

                const buildUsers = [];

                for(const user of Object.values(users)) {
                    const id = user[0].userId;
                    const category = user[0].category;
                    const date = dates ? dates.split(',')[0] : "";
                    if(id !== "EMPTY_USER_ID") {
                        if(id) buildUsers.push({id, category, date});
                    }
                }

                if(buildUsers.length > 0) {
                    const activeUser = buildUsers[0];

                    if(activeUser.id === this.state.activeChatID) {
                        this.setState({toVerify: buildUsers.length, users: buildUsers});
                    } else {
                        this.setState({toVerify: buildUsers.length, users: buildUsers, activeUser, activeChatID: activeUser.id});
                    }
                }
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    handleRemoveProfileToList = (userId) => {
        // Init request
        this.setState({ error: null, search: ""});

        const users = this.state.users;
        const filterUsers = users.filter(user => (user.id !== userId));

        const length = filterUsers.length;

        let currentIndex = 0;
        let i = 0;

        users.forEach(user => {
            if(user.id === userId) currentIndex = i;
            i++;
        });

        let nextIndex = this.state.lastActionNext ? currentIndex : currentIndex - 1;

        if(nextIndex < 0) nextIndex = 0;
        else if(nextIndex > (length - 1)) nextIndex = (length - 1);

        const activeUser = filterUsers[nextIndex];

        this.setState({
            toVerify: filterUsers.length,
            users: filterUsers,
            activeUser,
            loading: (filterUsers.length === 0) ? false : this.state.loading,
            activeUserIndex: nextIndex,
            activeChatID: activeUser.id
        });
    };
 
  render() {
    const {activeUser, activeChatID, loading, error, users, activeUserIndex, verified, toVerify, selectedDate, activeDescription} = this.state;

    return (
      <div className="chat-application position-relative fullHeight">
          <ImageHeader
              verified={verified}
              toVerify={toVerify}
              loadData={this.loadData}
              selectedDate={selectedDate}
              handleSearch={this.handleSearch}
              activeDescription={activeDescription}
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
        <ImageLog
            activeUser={activeUser}
            activeChatID={activeChatID}
            loading={loading}
            error={error}
            activeUserIndex={activeUserIndex}
            toVerify={toVerify}
            date={toVerify}
            showPreviousNavigation={activeUserIndex > 0}
            showNextNavigation={activeUserIndex < (users.length - 1)}
            handleChangeUser={this.handleChangeUser}
            mainSidebar={this.onSetSidebarOpen}
            handleActiveUser={this.handleActiveUser}
            handleReceiverSidebar={this.handleReceiverSidebar}
            handleRemoveProfileToList={this.handleRemoveProfileToList}
            handleToVerify={this.handleToVerify}

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
