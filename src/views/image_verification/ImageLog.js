import React from "react"
import ReactDOM from "react-dom"
import { Button, Spinner, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Menu, Loader, Image, CheckCircle, XCircle, Trash2} from "react-feather";

import Error500 from "../Error500";
import Message from "../../models/Message";
import ChatLogContent from "./ChatLogContent";
import ChatInput from "./messages-inputs/ChatInput";
import {getCaseMessages, getMessageImage} from "../../redux/actions/IndependentActions";


const items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
  ];

class ImageLog extends React.Component {
    // props { activeChatID, activeUser, mainSidebar, handleReceiverSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            messages: [],
            loading: false,
            activeIndex: 0 
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
    this.animating = false;
    }

    next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    }

    previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
    }


    componentDidMount() {
        this.loadData();
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeChatID !== this.props.activeChatID) {
            this.loadData();
            this.scrollToBottom();
        }
    }

    loadData = () => {
        const {activeChatID, activeUser} = this.props;

        if (activeChatID) {
            // Init request
            this.setState({ loading: true, error: null, messages: [] });
            getCaseMessages(activeUser.id)
                .then(data => {
                    const messages = data?.messages
                        .sort((a, b) => a.createdAt - b.createdAt)
                        .map(m => new Message(m));
 ;
                    // Set messages
                    this.setState({ messages }, async () => {
                        for(const message of messages) {
                            // Async user data
                            if(message.mediaId) {
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
            getMessageImage(message.userId, message.mediaId)
                .then(data => {
                    message.setMedia = data;
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

    scrollToBottom = () => {
        if (this.chatArea) {
            const chatContainer = ReactDOM.findDOMNode(this.chatArea);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    notifyChanges = (message) => {
        const messages = [...this.state.messages];
        const messageIndex = messages.findIndex(m => m.id === message.id);
        // Update
        if (messageIndex === -1) messages.push(message);
        else {
            messages[messageIndex] = message;
        }
        this.setState(({ messages }));
    };

    render() {
        const { messages, loading, error, activeIndex } = this.state;
        const { activeUser, activeChatID, mainSidebar, handleReceiverSidebar } = this.props;

        const slides = items.map((item) => {
        return (
            <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
            >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
            );
        });


        if(!activeUser) {
            return (
                <div className="content-right">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <Image size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                Select a user to start image verification
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
                                <div className="mx-auto">
                                <h3>{ activeUser.name } : IMG1</h3>
                                </div>
                            </header>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}>
                                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                </Carousel>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-2 mb-5">
                            <button className="btn btn-success mr-1"><CheckCircle size={20} /></button>
                            <button className="btn btn-danger mr-1"><XCircle size={20} /></button>
                            <button className="btn btn-dark"><Trash2 size={20} /></button>
                        </div>

                       {/*  {loading ?
                            (
                                <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                    <Spinner color="primary"/>
                                </div>
                            ) : (
                                error ? <div className="border-top-secondary"><Error500 onLinkClick={this.loadData} /> </div>: (
                                    <>
                                        <PerfectScrollbar
                                            className="user-chats"
                                            options={{ wheelPropagation: false }}
                                            ref={el => {this.chatArea = el}}>
                                            <div className="chats">
                                                <ChatLogContent messages={messages} activeUser={activeUser} />
                                            </div>
                                        </PerfectScrollbar>
                                        <div className="chat-app-form">
                                            <ChatInput
                                                activeUser={activeUser}
                                                activeChatID={activeChatID}
                                                notifyChanges={this.notifyChanges}
                                            />
                                        </div>
                                    </>
                                )
                            )
                        } */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLog;
