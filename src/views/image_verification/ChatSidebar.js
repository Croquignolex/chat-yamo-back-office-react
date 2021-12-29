import React from "react";
import dayjs from "dayjs";
import * as Icon from "react-feather"
import {Button, Card, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import Error500 from "../Error500";
import User from "../../models/User";
import TicketUserItem from "./TicketUserItem";
import {getUserImages, getUserProfile, getUserProfileImage} from "../../redux/actions/IndependentActions";

class ChatSidebar extends React.Component {
    // props { activeChatId, mainSidebar, handleActiveChat, handleUserSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            all_images: [],
            users: [],
            loading: false,
            date: dayjs()
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, users: [], all_images: [] });
        this.props.handleActiveChat(null, null);

        getUserImages(this.state.date.format('YYYY-MM-DD'))
            .then(res => {
                this.setState({all_images: res});

                let users = res.reduce(function(results, org) {
                    results[org.userId] = [...results[org.userId] || [], org];
                    return results;
                }, {})

                const buildUsers = [];

                for(const user of Object.values(users)) {
                    buildUsers.push(user);
                }

                this.setState({ users: buildUsers }, async () => {
                    for(const userImage of buildUsers) {
                        // Async user data
                        if(userImage != null){
                            await this.loadUserInfo(userImage[0]);
                        }
                    }
                });
            })
            .catch(error => console.log("error ", error))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    loadUserInfo = (feedback) => {
        return new Promise((resolve) => {
            const userId = feedback.userId;
            getUserProfile(userId)
                .then(async data => {
                    const userObject = {...feedback, ...data};
                    userObject.images = this.state.all_images.filter(item => item.userId === userId);
                    // make user as an object
                    const user = new User(userObject);
                    user.setId = userId;
                    //user.setLastMessageTime = feedback.createdDate.format("HH:mm")
                    try {
                        if(!user.isDeleted) {
                            // User profile image
                            user.setAvatar = await getUserProfileImage(userId);
                        }
                    } catch (e) {}
                    this.updateUsers(user);
                })
                .catch(() => {
                    const userObject = {...feedback, notFound: true};
                    const user = new User(userObject);
                    this.updateUsers(user);
                })
                .finally(() => resolve());
        })
    };

    onClickItem = (user) => {
        const { handleActiveChat, mainSidebar, handleUserSidebar } = this.props;
        mainSidebar(false);
        handleUserSidebar("open");
        handleActiveChat(user.id, user);
    };

    updateUsers = (user) => {
        this.setState((prevState) => {
            const tempusers = prevState.users.map((f) => {
                if(Array.isArray(f)) {
                    // f !== undefined
                    if(f[0]?.userId === user.id) {
                        f = user;
                    }
                }
                return f;
            })
            return {users: tempusers};
        });
    };

    handlePrevDate = () => {
        this.setState((prevState) => {
            const tempDate = prevState.date;
            return {date: tempDate.subtract(1, 'day')};
        }, () => this.loadData());
    }

    handleNextDate = () => {
        this.setState((prevState) => {
            const tempDate = prevState.date;
            return {date: tempDate.add(1, 'day')};
        }, () => this.loadData());
    }

    render() {
        const { error, loading, users } = this.state;
        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData} />
                </Card>
            )
        }

        return (
            <Card className="sidebar-content h-100">
                <div className="chat-fixed-search h-100">
                    <div className="d-flex align-items-center">
                        <Button color="primary" className="mr-2 rounded" onClick={this.loadData}>
                            <Icon.Loader className="d-lg-none" size={15} />
                            <span className="d-lg-block d-none">Refresh</span>
                        </Button>
                        <Button size="sm" color="primary" className="mr-1 rounded" onClick={this.handlePrevDate} title="Previous day">
                            <Icon.ArrowLeft size={20} />
                        </Button>
                        <strong>{this.state.date.format('DD-MM-YYYY')}</strong>
                        <Button size="sm" color="primary" className="ml-1 rounded" onClick={this.handleNextDate} title="Next day">
                            <Icon.ArrowRight size={20} />
                        </Button>
                    </div>
                </div>
                <PerfectScrollbar className="chat-user-list list-group" options={{wheelPropagation: false}}>
                    {loading ?
                        (
                            <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                <Spinner color="primary"/>
                            </div>
                        ) : (
                            <ul className="chat-users-list-wrapper media-list">
                                {users.map((user, index) => (
                                    <React.Fragment key={index}>
                                        <TicketUserItem
                                            user={user}
                                            onClickItem={this.onClickItem}
                                            activeChatId={this.props.activeChatId}
                                        />
                                    </React.Fragment>
                                ))}
                            </ul>
                        )
                    }
                </PerfectScrollbar>
            </Card>
        );
    }
}

export default ChatSidebar;
