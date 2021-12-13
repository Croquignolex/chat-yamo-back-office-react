import React from "react"
import ReactDOM from "react-dom"
import { Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators } from "reactstrap";
import { Image, CheckCircle, XCircle, Trash2} from "react-feather";

import { getUserImages} from "../../redux/actions/IndependentActions";


class ImageLog extends React.Component {
    // props { activeChatID, activeUser, mainSidebar, handleReceiverSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            activeIndex: 0,
            images: [],
            all_images: []
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.validateImage = this.validateImage.bind(this);
        this.invalidateImage = this.invalidateImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
    this.animating = false;
    }

    next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    }

    previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.images.length - 1 : this.state.activeIndex - 1;
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

        if(activeUser != null){
            this.setState({images: activeUser.images});
        }
    };


    scrollToBottom = () => {
        if (this.chatArea) {
            const chatContainer = ReactDOM.findDOMNode(this.chatArea);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };


    validateImage = () => {
        const image = this.state.images[this.state.activeIndex];
        console.log("image ", image);
    };

    invalidateImage = () => {
        const image = this.state.images[this.state.activeIndex];
        console.log("image ", image);
    };

    deleteImage = () => {
        const image = this.state.images[this.state.activeIndex];
        console.log("image ", image);
    };

    render() {
        const { activeIndex } = this.state;
        const { activeUser,  } = this.props;
        const slides = this.state.images.map((item) => {
        return (
            <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.mediaId}>
            <img src={item.originalUrl} alt={item.mediaId} style={{ width: "100%"}} />
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
                                <h3>{ activeUser.name } : IMG {activeIndex+1}</h3>
                                </div>
                            </header>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}>
                                    <CarouselIndicators items={this.state.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                </Carousel>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2 mb-5">
                            <button className="btn btn-success mr-1" onClick={this.validateImage}><CheckCircle size={20} /></button>
                            <button className="btn btn-danger mr-1" onClick={this.invalidateImage}><XCircle size={20} /></button>
                            <button className="btn btn-dark" onClick={this.deleteImage}><Trash2 size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLog;
