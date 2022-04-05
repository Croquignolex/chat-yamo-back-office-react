import React from "react"
import ReactDOM from "react-dom"
import {NotificationManager} from "react-notifications";
import { Image, CheckCircle, XCircle, Trash2, AlertTriangle} from "react-feather";
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner} from "reactstrap";

import {deleteUserImage, reportUser, verifyUserImage} from "../../redux/actions/IndependentActions";

class ImageLog extends React.Component {
    // props { activeChatID, activeUser, mainSidebar, handleReceiverSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            activeIndex: 0,
            images: [],
            all_images: [],
            reportLoading: false
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
        const {activeUser} = this.props;

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


    validateImage = (score) => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        verifyUserImage(image.userId, image.mediaId, image.mediaPath, 'true', score)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image)
                NotificationManager.success("Image has been successfully validated", null);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    invalidateImage = () => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        verifyUserImage(image.userId, image.mediaId, image.mediaPath, 'false', 0)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image)
                NotificationManager.success("Image has been successfully unvalidated", null);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    deleteImage = () => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        deleteUserImage(image.userId, image.mediaId)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image)
                NotificationManager.success("Image has been successfully deleted", null);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    removeImageFormState = (image) => {
        this.setState((prevState) => {
            const tempImages = prevState.images.filter((i) => i.mediaId !== image.mediaId);
            return {images: tempImages};
        });
        this.props.handleRemoveImage(image);
    };

    reportProfile = (userId) => {
        this.setState({reportLoading: true});
        reportUser(userId)
            .then(() => {
                // No action
                NotificationManager.success("User profile has been successfully reported", null);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ reportLoading: false }));
    };

    render() {
        const { activeIndex } = this.state;
        const { activeUser } = this.props;
        const slides = this.state.images.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.mediaId}>
                    {/*<DisplayImage src={item.compressedUrl || item.originalUrl} width={1000} height={1000} />*/}
                    <img src={item.compressedUrl || item.originalUrl} alt={item.mediaId} style={{ width: "100%"}} />
                </CarouselItem>
            );
        });

        if(!activeUser || (this.state.images.length) === 0) {
            return (
                <div className="content-right">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <Image size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                {(this.state.images.length) === 0
                                    ? "No image to verify for this user"
                                    : "Select a user to start image verification"
                                }
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
                        <div className="row user-chats">
                            <div className="col-md-6 mx-auto">
                                <div className="mb-2">
                                    {(this.state.reportLoading) ? <Spinner color="danger" /> : (
                                        <button className="btn btn-lg btn-danger" onClick={() => this.reportProfile(activeUser.id)}>
                                            Repport User
                                        </button>
                                    )}
                                </div>
                                <Carousel
                                    interval={false}
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}>
                                    <CarouselIndicators items={this.state.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                </Carousel>
                            </div>
                            <div className="col-md-12 mt-3 mb-5">
                                {this.state.loading ? <Spinner color="primary"/> : (
                                    <>
                                        <button className="btn btn-success mr-1 score-size-1" onClick={() => this.validateImage(1)}>1 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-2" onClick={() => this.validateImage(2)}>2 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-3" onClick={() => this.validateImage(3)}>3 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-4" onClick={() => this.validateImage(4)}>4 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-5" onClick={() => this.validateImage(5)}>5 <CheckCircle size={20} /></button>
                                        <button className="btn btn-danger mr-1" onClick={this.invalidateImage}><XCircle size={20} /></button>
                                        <button className="btn btn-dark" onClick={this.deleteImage}><Trash2 size={20} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLog;
