import React from "react";
import dayjs from "dayjs";
import * as Icon from "react-feather"
import {Button, Card, Spinner, Input, Form} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import Error500 from "../Error500";
import User from "../../models/User";
import Feedback from "../../models/Feedback";
import TicketUserItem from "./TicketUserItem";
import {getCases, getUserProfile, getUserProfileImage} from "../../redux/actions/IndependentActions";
import {imageExistsStepByStep} from "../../helpers/helpers";

class ChatSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            feedbacks: [],
            loading: false,
            date: dayjs(),
            search: ""
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, feedbacks: [], search: "" });
        getCases(this.state.date.format('YYYY-MM-DD'))
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
                    user.setLastMessageTime = feedback.createdDate.format("HH:mm");
                    user.setId = userId;
                    try {
                        if(!user.isDeleted) {
                            // User profile image
                            const avatar = await getUserProfileImage(userId);
                            user.setAvatar = await imageExistsStepByStep(avatar);
                        }
                    } catch (e) {}
                    feedback.setUser = user;
                    this.updateFeedback(feedback);
                })
                .catch(() => {
                    feedback.setUser = new User({notFound: true});
                    this.updateFeedback(feedback);
                })
                .finally(() => resolve());
        })
    };

    onClickItem = (feedback) => {
        const { handleActiveChat, mainSidebar, handleUserSidebar } = this.props;
        const {id, user} = feedback;
        mainSidebar(false);
        handleUserSidebar("open");
        handleActiveChat(id, user);
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

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
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

    handleSearchConversation = (e) => {
        e.preventDefault();
        // Mock to feedback type
        const feedbacks = [new Feedback({userId: this.state.search})];
        this.setState({ feedbacks }, async () => {
            for(const feedback of feedbacks) {
                // Async user data
                await this.loadUserInfo(feedback);
            }
        });
    }

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
                {/* Top control buttons */}
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
                                {/* First element: search bar */}
                                <li>
                                    <Form className="d-flex mx-auto w-100" onSubmit={this.handleSearchConversation}>
                                        <Input
                                            type="text"
                                            placeholder="Search conversation by user id..."
                                            onChange={(this.updateSearchInput)}
                                            value={this.state.search}
                                        />
                                        <Button size="sm" color="primary" className="ml-1 rounded" type="submit" title="Search">
                                            <Icon.Search size={20} />
                                        </Button>
                                    </Form>
                                </li>
                                {/* Search result or users list */}
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
