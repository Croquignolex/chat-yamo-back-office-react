import React from "react"
import ReactDOM from "react-dom"
import ChatLogContent from "./ChatLogContent";
import Error500 from "../pages/misc/error/500";
import {Input, Button, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MessageSquare, Menu, Star, Send } from "react-feather";
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

    componentDidUpdate() {
        this.scrollToBottom();
    }

    loadData = () => {
        if (this.props.activeCaseId) {
            this.setState({ loading: true });
            getCaseMessages(this.props.activeCaseId)
                .then(messages => {
                    this.setState({ messages });
                })
                .catch(() => this.setState({messages: null}))
                .finally(() => this.setState({ loading: false }));
        }
    };

    handleSendMessage = (id, isPinned, text) => {
        if (text.length > 0) {
            this.props.sendMessage(id, isPinned, text)
            this.setState({
                msg: ""
            })
        }
    };

    scrollToBottom = () => {
        if (this.chatArea) {
            const chatContainer = ReactDOM.findDOMNode(this.chatArea);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    handleMsgSubmit = e => {
        e.preventDefault();
        // TODO: Handle submit message
        /*this.handleSendMessage(
            this.props.activeUser.uid,
            false,
            this.state.msg,
            this.props.activeUser
        )*/
    };

    onChangeMsg = e => {
        e.preventDefault();
        this.setState({
            msg: e.target.value
        })
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
        const { activeUser } = this.props;

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
                            ) : messages ? (
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
                                        <form
                                            className="chat-app-input d-flex align-items-center"
                                            onSubmit={this.handleMsgSubmit}>
                                            <Input
                                                type="text"
                                                value={this.state.msg}
                                                className="message mr-1 ml-50"
                                                placeholder="Type your message"
                                                onChange={this.onChangeMsg}
                                            />
                                            <Button color="primary">
                                                <Send className="d-lg-none" size={15} />
                                                <span className="d-lg-block d-none">Send</span>
                                            </Button>
                                        </form>
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
