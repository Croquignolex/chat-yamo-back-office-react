import React from "react";
import dayjs from "dayjs";
import * as Icon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Button, Card, Spinner, Input, Form} from "reactstrap";

import Error500 from "../Error500";
import User from "../../models/User";
import Feedback from "../../models/Feedback";
import ChatSidebarItem from "./ChatSidebarItem";
import {twoDigitDisplay} from "../../helpers/helpers";
import {
    getCases,
    getUserStatus,
    getUserProfile,
    getUserIdentity,
    getSuspiciousState,
    getUserProfileImage
} from "../../redux/actions/IndependentActions";

class ChatSidebar extends React.Component {
    // props { activeChatId, mainSidebar, handleActiveChat, handleUserSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            feedbacks: [],
            loading: false,
            date: dayjs().startOf('day'),
            search: "",
            hour: 0
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, feedbacks: [], search: "" });
        getCases(this.state.date.format('YYYY-MM-DDTHH:mm:ss'))
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
                    // Make user as an object
                    user.setLastMessageTime = feedback.createdDate.format("HH:mm");
                    user.setPendingMessage = (feedback.userId === feedback.authorId);
                    user.setId = userId;
                    try {
                        user.setStatus = await getUserStatus(user.id);
                        user.setCertified = await getUserIdentity(user.id);
                        user.setSuspiciousState = await getSuspiciousState(user.id);

                        if(!user.isDeleted) {
                            // User profile image
                            user.setAvatar = await getUserProfileImage(userId);
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
                if(f.id?.toString() === feedback.id?.toString()) {
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
            const tempHour = prevState.hour;
            const nextHour = (tempHour - 6);
            return {
                hour: nextHour < 0 ? 18 : nextHour,
                date: tempDate.subtract(6, 'hour')
            };
        }, () => this.loadData());
    }

    handleNextDate = () => {
        this.setState((prevState) => {
            const tempDate = prevState.date;
            const tempHour = prevState.hour;
            const nextHour = (tempHour + 6);
            return {
                hour: nextHour > 18 ? 0 : nextHour,
                date: tempDate.add(6, 'hour')
            };
        }, () => this.loadData());
    }

    handleSearchConversation = (e) => {
        e.preventDefault();
        // Mock to feedback type 
        const mockFeedback = new Feedback({userId: this.state.search});
        this.setState({ feedbacks: [mockFeedback] }, async () => {
            await this.loadUserInfo(mockFeedback);
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
                        <Button color="primary" className="mr-50 rounded" onClick={this.loadData} size="sm">
                            <Icon.RefreshCcw size={15} />
                            {/*<span className="d-lg-block d-none">Refresh</span>*/}
                        </Button>
                        <Button size="sm" color="primary" className="mr-50 rounded" onClick={this.handlePrevDate} title="Previous day">
                            <Icon.ArrowLeft size={15} />
                        </Button>
                        <strong>
                            {this.state.date.format('DD-MM-YYYY')} &nbsp;
                            {twoDigitDisplay(this.state.hour)}-
                            {twoDigitDisplay(this.state.hour + 6)}
                        </strong>
                        <Button size="sm" color="primary" className="ml-50 rounded" onClick={this.handleNextDate} title="Next day">
                            <Icon.ArrowRight size={15} />
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
                                    <Form className="d-flex mx-auto " onSubmit={this.handleSearchConversation}>
                                        <div className="position-relative">
                                            <Input
                                                type="text"
                                                className="search-width"
                                                placeholder="Search conversation by user id..."
                                                onChange={(this.updateSearchInput)}
                                                value={this.state.search}
                                            />
                                            <div className="form-control-position">
                                                <Icon.X size={15} onClick={(this.loadData)} />
                                            </div>
                                        </div>
                                        <div className="ml-1">
                                            <Button size="sm" color="primary" className="rounded" type="submit" title="Search">
                                                <Icon.Search size={20} />
                                            </Button>
                                        </div>
                                    </Form>
                                </li>
                                {/* Search result or users list */}
                                {feedbacks.map(feedback => (
                                    <React.Fragment key={feedback.id}>
                                        <ChatSidebarItem
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
