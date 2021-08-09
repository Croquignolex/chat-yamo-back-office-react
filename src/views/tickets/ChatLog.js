import React from "react"
import ReactDOM from "react-dom"
import {Spinner} from "reactstrap";
import Message from "../../models/Message";
import ChatLogContent from "./ChatLogContent";
import Error500 from "../pages/misc/error/500";
import ChatInput from "./messages-inputs/ChatInput";
import { MessageSquare, Menu } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import {getCaseMessages} from "../../redux/actions/IndependentActions";

class ChatLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
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
            getCaseMessages(this.props.caseId)
                .then(data => {
                    this.setState({ messages: data.messages.map(m => new Message(m)) });
                })
                .catch(() => this.setState({messages: null}))
                .finally(() => this.setState({loading: false}));
        }
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
                Start Conversation
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
                                            <img
                                                src={activeUser.imageUrl}
                                                alt={activeUser.userName}
                                                height="40"
                                                width="40"
                                            />
                                            <span
                                                className={activeUser.getStatus()}
                                            />
                                        </div>
                                        <h6 className="mb-0">
                                            {activeUser.userName}
                                        </h6>
                                    </div>
                                </header>
                            </div>

                            {loading ? (
                                <Spinner color="primary" />
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
