import React from "react";
import {Button, Card, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import Error500 from "../Error500";
import User from "../../models/User";
import Feedback from "../../models/Feedback";
import TicketUserItem from "./TicketUserItem";
import {getCases, getUserProfile, getUserProfileImage} from "../../redux/actions/IndependentActions";

class ChatSidebar extends React.Component {
// props { activeChatId, mainSidebar, handleActiveChat, updateActiveUser }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            feedbacks: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, feedbacks: [] });
        getCases()
            .then(data => {
                const feedbacks = data?.messages.map(f => new Feedback(f));
                // Set feedbacks
                this.setState({ feedbacks }, async () => {
                    for(const feedback of feedbacks) {
                        // Async user data
                        await this.loadUserInfo(feedback);
                    }
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    loadUserInfo = (feedback) => {
        return new Promise((resolve) => {
            const userId = feedback.userId;
            getUserProfile(userId)
                .then(async data => {
                    const user = new User(data);
                    try {
                        if(!user.isDeleted) {
                            // User profile image
                            user.setAvatar = await getUserProfileImage(userId);
                        }
                    } catch (e) {}
                    feedback.setUser = user;
                    this.updateFeedback(feedback);
                    resolve();
                })
                .catch(() => {
                    feedback.setUser = new User({notFound: true});
                    this.updateFeedback(feedback);
                    resolve();
                });
        })
    };

    onClickItem = (feedback) => {
        const { handleActiveChat, mainSidebar, updateActiveUser } = this.props;
        const {id, user} = feedback;
        handleActiveChat(id, user);
        updateActiveUser(user)
        mainSidebar(false);
    };

    updateFeedback = (feedback) => {
        this.setState((prevState) => {
            const tempFeedbacks = prevState.feedbacks;
            tempFeedbacks.map((f) => {
                if(f.id === feedback.id) {
                    f = feedback;
                }
                return f;
            })
            return {feedbacks: tempFeedbacks};
        });
    };

    render() {
        const { feedbacks, error, loading } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData} />
                </Card>
            )
        }

        return (
            <Card className="sidebar-content h-100">
                <div className="chat-fixed-search">
                    <div className="d-flex align-items-center">
                        <Button
                            onClick={this.loadData}
                            color="primary">
                            Refresh
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
                                {feedbacks.map(feedback => (
                                    <React.Fragment key={feedback.id}>
                                        <TicketUserItem
                                            feedback={feedback}
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
