import React from "react";
import { X } from "react-feather";
import Error500 from "../Error500";
import User from "../../models/User";
import Feedback from "../../models/Feedback";
import TicketUserItem from "./TicketUserItem";
import {Button, Card, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {getCases, getUserProfile, getUserProfileImage} from "../../redux/actions/IndependentActions";

class ChatSidebar extends React.Component {
// { activeChatId, mainSidebar, handleActiveChat, updateActiveUser }
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
        this.setState({ loading: true, error: null, feedbacks: [] });
        getCases()
            .then(data => {
                const feedbacks = data.messages
                    .sort((a, b) => {
                        // Feedbacks filter
                        const newA = parseInt(a.createdAt, 10);
                        const newB = parseInt(b.createdAt, 10);
                        return newB - newA;
                    })
                    .map(f => new Feedback(f));

                this.setState({ feedbacks }, async () => {
                    for(const feedback of feedbacks) {
                        await this.loadUserInfo(feedback);
                    }
                });
            })
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    loadUserInfo = (responseFeedbackData) => {
        return new Promise((resolve) => {
            getUserProfile(responseFeedbackData.userId)
                .then(async (data) => {
                    const responseUserData = new User(data);
                    if(!responseUserData.isDeleted) {
                        // User profile image
                        const image = await getUserProfileImage(responseFeedbackData.userId);
                        const base64ImageString = Buffer.from(image, 'binary').toString('base64');
                        responseUserData.setAvatar = "data:image/jpg;base64," + base64ImageString;
                    }
                    responseFeedbackData.setUser = responseUserData;
                    this.setState((prevState) => {
                        const tempFeedbacks = prevState.feedbacks;
                        tempFeedbacks.map((f) => {
                            if(f.caseId === responseFeedbackData.caseId) {
                                f = responseFeedbackData;
                            }
                            return f;
                        })
                        return {
                            feedbacks: tempFeedbacks
                        };
                    });
                    resolve()
                })
        })
    };

    onClickItem = (caseId, user) => {
        const { handleActiveChat, mainSidebar } = this.props;
        // Update the chat log
        handleActiveChat(caseId, user);
        // Hide sidebar if opened
        mainSidebar(false);
    };

    render() {

        const { feedbacks, error, loading } = this.state;
        const { updateActiveUser, activeChatId } = this.props;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData}/>
                </Card>
            )
        }

        return (
            <Card className="sidebar-content h-100">
                <span
                    className="sidebar-close-icon"
                    onClick={() => this.props.mainSidebar(false)}
                >
                  <X size={15}/>
                </span>
                <div className="chat-fixed-search">
                    <div className="d-flex align-items-center">
                        <Button
                            onClick={this.loadData}
                            color="primary">
                            Actualiser
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
                                {feedbacks.map(item => (
                                    <TicketUserItem
                                        feedback={item}
                                        key={item.caseId}
                                        updateActiveUser={updateActiveUser}
                                        isActive={activeChatId === item.caseId}
                                        onClickItem={user => this.onClickItem(item.caseId, user)}
                                    />
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
