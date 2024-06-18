import React from "react" ;
import {Button, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {MessageSquare, Menu, Loader} from "react-feather";

import Error500 from "../Error500";
import Message from "../../models/Message";
import ChatInput from "./inputs/ChatInput";
import ChatLogContent from "./ChatLogContent";
import DisplayImage from "../../components/DisplayImage";
import {getCaseMessages, getMessageImage} from "../../redux/actions/IndependentActions";
import {imageExistsStepByStep} from "../../helpers/helpers";

class ChatLog extends React.Component {
    // props { activeChatID, activeUser, mainSidebar, handleReceiverSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            messages: [],
            loading: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeUser !== this.props.activeUser) {
            this.loadData();
        }

        if(this.scroll) {
            this.scroll.scrollTop = this.scroll?.scrollHeight;
        }
    }

    loadData = () => {
        const {activeUser} = this.props;

        if (activeUser) {
            // Init request
            this.setState({ loading: true, error: null, messages: [] });
            getCaseMessages(activeUser.id)
                .then(data => {
                    const messages = data?.messages
                        .sort((a, b) => a.createdAt - b.createdAt)
                        .map(m => new Message(m));

                    // Set messages
                    this.setState({ messages }, async () => {
                        for(const message of messages) {
                            // Async user data
                            if(message.mediaId || message.videoId) {
                                await this.loadMessageImage(message);
                            }
                        }
                    });
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ loading: false }));
        }
    };

    loadMessageImage = (message) => {
        return new Promise((resolve) => {
            getMessageImage(message.userId, message.mediaId || message.videoId)
                .then(async data => {
                    message.setMedia = await imageExistsStepByStep(data);
                    message.type = message.mediaId ? "image" : "video";
                    // Update message
                    this.setState((prevState) => {
                        const tempMessages = prevState.messages;
                        tempMessages.map((m) => {
                            if(m.id === message.id) {
                                m = message;
                            }
                            return m;
                        })
                        return {messages: tempMessages};
                    });
                })
                .finally(() => resolve());
        })
    };

    notifyChanges = (message) => {
        const messages = [...this.state.messages];

        if(messages.length > 0) {
            // if(message.caseId === `${this.props.activeUser.id}:${message.authorId}`) {
            if(message.caseId === messages[0]?.caseId) {
                const messageIndex = messages.findIndex(m => m.id === message.id);
                // Update
                if (messageIndex === -1) messages.push(message);
                else {
                    messages[messageIndex] = message;
                }
                this.setState(({ messages }));
            }
        }
    };

    render() {
        const { messages, loading, error } = this.state;
        const { activeUser, activeChatID, mainSidebar, handleReceiverSidebar } = this.props;

        let caseId = activeChatID;

        if(messages.length > 0) {
            caseId = messages[0].caseId;
        }

        if(!activeUser) {
            return (
                <div className="content-right">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <MessageSquare size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                Select a user to start chat
                            </h4>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="content-right">
                <div className="chat-app-window">
                    <div className="active-chat d-block">
                        <div className="chat_navbar">
                            <header className="chat_header d-flex justify-content-between align-items-center p-1">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="sidebar-toggle d-block d-lg-none mr-1"
                                        onClick={() => mainSidebar(true)}>
                                        <Menu size={24} />
                                    </div>
                                    <div
                                        className="avatar user-profile-toggle m-0 m-0 mr-1"
                                        onClick={() => handleReceiverSidebar("open")}>
                                        <DisplayImage src={activeUser.imageSrc} withModal={false} />
                                    </div>
                                    <a
                                        href="/"
                                        className="mb-0"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleReceiverSidebar("open");
                                        }}
                                    >
                                        More information...
                                    </a>
                                </div>
                                <Button color="primary" className="rounded" onClick={this.loadData}>
                                    <Loader className="d-lg-none" size={15} />
                                    <span className="d-lg-block d-none">Refresh</span>
                                </Button>
                            </header>
                        </div>

                        {loading ?
                            (
                                <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                    <Spinner color="primary"/>
                                </div>
                            ) : (
                                error ? <div className="border-top-secondary"><Error500 onLinkClick={this.loadData} /> </div>: (
                                    <>
                                        <PerfectScrollbar
                                            className="user-chats trim-user-chat"
                                            options={{ wheelPropagation: false }}
                                            containerRef={el => {this.scroll = el}}
                                        >
                                            <div className="chats">
                                                <ChatLogContent messages={messages} activeUser={activeUser} />
                                            </div>
                                        </PerfectScrollbar >
                                        <div className="chat-app-form">
                                            <ChatInput
                                                caseId={caseId}
                                                activeUser={activeUser}
                                                activeChatID={activeChatID}
                                                notifyChanges={this.notifyChanges}
                                            />
                                        </div>
                                    </>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatLog;
