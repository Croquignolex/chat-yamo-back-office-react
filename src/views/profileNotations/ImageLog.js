import React from "react"
import ReactDOM from "react-dom"
import {Image, Menu, CheckCircle, ThumbsUp, ThumbsDown, Trash2} from "react-feather";
import {NotificationManager} from "react-notifications";
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner} from "reactstrap";

import DisplayImage from "../../components/DisplayImage";
import {deleteUserImage, notateUserProfile, verifyUserImage} from "../../redux/actions/IndependentActions";

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
            blockLoading: false,
            reportLoading: false,
            activeUser: null
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.validateImage = this.validateImage.bind(this);
        // this.deleteImage = this.deleteImage.bind(this);
        // this.notateProfile = this.notateProfile.bind(this);
        // this.removeAllImageFormState = this.removeAllImageFormState.bind(this);
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
            this.setState({images: activeUser.images, activeIndex: 0, activeUser});
        }
    };
 
    scrollToBottom = () => {
        if (this.chatArea) {
            const chatContainer = ReactDOM.findDOMNode(this.chatArea);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    validateImage = (answer) => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        verifyUserImage(image.userId, image.mediaId, image.mediaPath, answer)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image)
                NotificationManager.success(
                    `Image has been successfully ${answer === 'true' ? 'validated' : 'unvalidated'}`,
                    null,
                    1000
                );
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    /*deleteImage = () => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        deleteUserImage(image.userId, image.mediaId)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image)
                NotificationManager.success("Image has been successfully deleted", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };*/

    /*notateProfile = (score) => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        notateUserProfile(image.userId, score)
            .then(() => {
                // Remove all image from array
                this.removeAllImageFormState()
                NotificationManager.success("Profile has been successfully noted", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };*/

    removeImageFormState = (image) => {
        this.setState((prevState) => {
            const tempImages = prevState.images.filter((i) => i.mediaId !== image.mediaId);
            return {images: tempImages};
        });
        this.props.handleRemoveImage(image);
    };

    /*removeAllImageFormState = () => {
        this.props.handleRemoveAllImages(this.state.images);
        this.setState({images: []});
    };*/

    render() {
        const { activeIndex } = this.state;
        const { activeUser, mainSidebar, handleReceiverSidebar } = this.props;
        const slides = this.state.images.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.mediaId}>
                    <DisplayImage src={item.compressedUrl || item.originalUrl} withPercentage />
                </CarouselItem>
            );
        });

        if(this.state.images.length === 0 || !activeUser) {
            return (
                <div className="content-right">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <Image size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                {activeUser !== null
                                    ? "Profile already noted"
                                    : "Select a user to start profile notation"
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
                                        <DisplayImage src={activeUser.avatar} withModal={false} />
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
                            </header>
                        </div> 
                        
                        <div className="user-chats">
                            <div className="col-md-6 mx-auto"> 
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
                            {(this.state.images.length > 1) && (
                                <div className="col-md-12 mb-5 mt-3">
                                    {this.state.loading ? <Spinner color="primary"/> : (
                                        <>
                                            <button className="btn btn-success mr-1" onClick={() => this.validateImage('true')}> <ThumbsUp size={20} /></button>
                                            <button className="btn btn-danger mr-1" onClick={() => this.validateImage('false')}><ThumbsDown size={20} /></button>
                                            {/*<button className="btn btn-dark" onClick={this.deleteImage}><Trash2 size={20} /></button>*/}
                                        </>
                                    )}
                                    {/*<h3>Note this profile</h3>
                                    {this.state.loading ? <Spinner color="primary"/> : (
                                        <>
                                            <button className="btn btn-primary mr-1 score-size-1" onClick={() => this.notateProfile(1)}>1 <CheckCircle size={20} /></button>
                                            <button className="btn btn-primary mr-1 score-size-2" onClick={() => this.notateProfile(2)}>2 <CheckCircle size={20} /></button>
                                            <button className="btn btn-primary mr-1 score-size-3" onClick={() => this.notateProfile(3)}>3 <CheckCircle size={20} /></button>
                                            <button className="btn btn-primary mr-1 score-size-4" onClick={() => this.notateProfile(4)}>4 <CheckCircle size={20} /></button>
                                            <button className="btn btn-primary mr-1 score-size-5" onClick={() => this.notateProfile(5)}>5 <CheckCircle size={20} /></button>
                                        </>
                                    )}*/}
                                </div>
                            )}
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLog;
