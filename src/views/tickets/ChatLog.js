import React from "react"
import ReactDOM from "react-dom"
import Error500 from "../Error500";
import {Button, Spinner} from "reactstrap";
import Message from "../../models/Message";
import ChatLogContent from "./ChatLogContent";
import ChatInput from "./messages-inputs/ChatInput";
import PerfectScrollbar from "react-perfect-scrollbar";
import {MessageSquare, Menu, Loader} from "react-feather";
import {getCaseMessages, getMessageImage} from "../../redux/actions/IndependentActions";

class ChatLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            loading: false,
        }
    }

    componentDidMount() {
        this.loadData();
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
        if (prevProps.caseId !== this.props.caseId) {
            this.loadData();
        }
    }

    loadData = () => {
        if (this.props.caseId) {
            this.setState({ loading: true });
            getCaseMessages(this.props.activeUser.id)
                .then(data => {
                    const messages = data.messages
                        .sort((a, b) => a.createdAt - b.createdAt)
                        .map(m => new Message(m));

                    this.setState({ messages }, () => {
                        messages.forEach((message) => {
                            if(message.mediaId) {
                                this.loadMessageImage(message);
                            }
                        });
                    });
                })
                .catch(() => this.setState({messages: null}))
                .finally(() => this.setState({loading: false}));
        }
    };

    loadMessageImage = (responseMessageData) => {
        getMessageImage(responseMessageData.mediaId, responseMessageData.caseId)
            .then(data => {
                const base64ImageString = Buffer.from(data, 'binary').toString('base64');
                responseMessageData.setMedia = "data:image/jpg;base64," + base64ImageString;
                this.setState((prevState) => {
                    const tempMessages = prevState.messages;
                    tempMessages.map((m) => {
                        if(m.messageId === responseMessageData.messageId) {
                            m = responseMessageData;
                        }
                        return m;
                    })
                    return {
                        messages: tempMessages
                    };
                });
            });
    };

    scrollToBottom = () => {
        if (this.chatArea) {
            const chatContainer = ReactDOM.findDOMNode(this.chatArea);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    notifyChanges = (messageObj) => {
        const _messages = [...this.state.messages];
        const messageItemIndex = _messages.findIndex(m => m.id === messageObj.id);

        if (messageItemIndex === -1) {
            _messages.push(messageObj);
        } else {
            _messages[messageItemIndex] = messageObj;
        }

        this.setState(({ messages: _messages }));
    };

    renderEmptyUser = (
        <div className={`start-chat-area d-flex`}>
        <span className="mb-1 start-chat-icon">
          <MessageSquare size={50} />
        </span>
            <h4
                className="py-50 px-1 sidebar-toggle start-chat-text"
                onClick={() => {
                    if (this.props.mql.matches === false) {
                        this.props.mainSidebar(true)
                    } else {
                        return null
                    }
                }}>
                Commencer Une Conversation
            </h4>
        </div>
    );

    render() {
        const { messages, loading } = this.state;
        const { activeUser, caseId } = this.props;

        return (
            <div className="content-right">
                <div className="chat-app-window">
                    {this.props.activeUser === null ? this.renderEmptyUser : (
                        <div className={`active-chat d-block`}>
                            <div className="chat_navbar">
                                <header className="chat_header d-flex justify-content-between align-items-center p-1">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="sidebar-toggle d-block d-lg-none mr-1"
                                            onClick={() => this.props.mainSidebar(true)}>
                                            <Menu size={24} />
                                        </div>
                                        <div
                                            className="avatar user-profile-toggle m-0 m-0 mr-1"
                                            onClick={() => this.props.handleReceiverSidebar("open")}>
                                            <img src={activeUser.imageSrc} alt="..." height="40" width="40" />
                                            <span
                                                className={activeUser.getStatus()}
                                            />
                                        </div>
                                        <a
                                            href="#"
                                            className="mb-0"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.props.handleReceiverSidebar("open");
                                            }}
                                        >
                                            Voir les informations
                                        </a>
                                    </div>
                                    <Button
                                        onClick={this.loadData}
                                        color="primary">
                                        <Loader className="d-lg-none" size={15} />
                                        <span className="d-lg-block d-none">Actualiser</span>
                                    </Button>
                                </header>
                            </div>

                            {loading ? (
                                <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                    <Spinner color="primary" />
                                </div>
                            ) : !messages ? (
                                <Error500 onLinkClick={this.loadData} />
                            ) : (
                                <>
                                    <PerfectScrollbar
                                        className="user-chats"
                                        options={{ wheelPropagation: false }}
                                        ref={el => {
                                            this.chatArea = el
                                        }}>
                                        <div className="chats">
                                            <ChatLogContent
                                                messages={messages}
                                                activeUser={activeUser}
                                            />
                                        </div>
                                    </PerfectScrollbar>

                                    <div className="chat-app-form">
                                        <ChatInput
                                            caseId={caseId}
                                            userId={activeUser.id}
                                            notifyChanges={this.notifyChanges}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ChatLog;
