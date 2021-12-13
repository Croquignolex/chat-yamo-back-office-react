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

        getUserImages().then(res => {
            this.setState({all_images: res});
            let users = res.reduce(function(results, org) {
                (results[org.userId] = results[org.userId] || []).push(org);
                return results;
            }, [])

            this.setState({ users }, async () => {
                for(const userImage of users) {
                    // Async user data
                    if(userImage != null){
                        await this.loadUserInfo(userImage[0]);
                    }
                }
            });
        }).catch(error => {
            console.log("error ", error);
        }).catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));

    };

    loadUserInfo = (feedback) => {
        return new Promise((resolve) => {
            const userId = feedback.userId;
            getUserProfile(userId)
                .then(async data => {
                    const user = new User(data);
                    //user.setLastMessageTime = feedback.createdDate.format("HH:mm")
                    try {
                        if(!user.isDeleted) {
                            // User profile image
                            user.setAvatar = await getUserProfileImage(userId);
                        }
                    } catch (e) {}
                    feedback = {...feedback, ...user};
                    feedback.images = this.state.all_images.filter(item => item.userId == userId);
                    this.updateUsers(feedback);
                })
                .catch(() => {
                    feedback = {...feedback, ...new User({notFound: true})};;
                    this.updateUsers(feedback);
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
                if(f!= undefined){
                    if(f[0]?.userId === user.id) {
                        f = user;
                    }
                    return f;
                }
            })
            return {users: tempusers};
        });
    };

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
                                {users.map(user => (
                                    <React.Fragment key={user?.id}>
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
