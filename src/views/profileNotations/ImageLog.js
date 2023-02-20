import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import {Image, Menu, ThumbsUp, ThumbsDown, Trash2, CheckCircle, RefreshCw} from "react-feather";
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner} from "reactstrap";

import DisplayImage from "../../components/DisplayImage";
import {
    blockUser,
    reportUser,
    verifyUserImage,
    deleteUserImage,
    getUserProfileV2,
    notateUserProfile,
    updateUserProfile
} from "../../redux/actions/IndependentActions";
import Error500 from "../Error500";

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
            profileLoading: false,
            activeUser: null,
            profileData: null,
        };
        this.next = this.next.bind(this);
        this.onExited = this.onExited.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.validateImage = this.validateImage.bind(this);
        this.notateProfile = this.notateProfile.bind(this);
        this.removeAllImageFormState = this.removeAllImageFormState.bind(this);
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

        if(activeUser != null) {
            // Load profile data
            this.setState({ error: null, profileData: null, images: [] });
            getUserProfileV2(activeUser.id)
                .then((data) => {
                    this.setState({
                        images: activeUser.images,
                        activeIndex: 0,
                        profileData: data,
                        activeUser
                    });
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({ profileLoading: false }));
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

    deleteImage = () => {
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
    };

    notateProfile = (score) => {
        const image = this.state.images[this.state.activeIndex];
        this.setState({ loading: true });
        // Validate all images
        /*this.state.images.forEach((image) => {
            verifyUserImage(image.userId, image.mediaId, image.mediaPath, 'true').then();
        });*/
        notateUserProfile(image.userId, score)
            .then(() => {
                // Remove all image from array
                this.removeAllImageFormState()
                NotificationManager.success("Profile has been successfully noted", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    reportProfile = () => {
        const {backOfficeUserLastName, backOfficeUserFirstName} = this.props;
        this.setState({reportLoading: true});
        reportUser(this.props.activeUser.id, backOfficeUserFirstName, backOfficeUserLastName)
            .then(() => {
                // No action
                NotificationManager.success("User profile has been successfully reported", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ reportLoading: false }));
    };

    blockProfile = () => {
        this.setState({blockLoading: true});
        blockUser(this.props.activeUser.id)
            .then(() => {
                // No action
                NotificationManager.success("User profile has been successfully blocked", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ blockLoading: false }));
    };

    changeGender = () => {
        const profileData = this.state.profileData;
        const newGender = profileData.gender === "Male" ? "Female" : "Male";
        this.setState({profileLoading: true});
        updateUserProfile(this.props.activeUser.id, newGender, profileData)
            .then(() => {
                this.setState((prevState) => {
                    const tempProfileData = prevState.profileData;
                    return {profileData: {...tempProfileData, gender: newGender}};
                });
                NotificationManager.success("User gender has been successfully changed", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ profileLoading: false }));
    };

    removeImageFormState = (image) => {
        this.next();
        /*this.setState((prevState) => {
            const tempImages = prevState.images.filter((i) => i.mediaId !== image.mediaId);
            return {images: tempImages};
        });
        this.props.handleRemoveImage(image);*/
    };

    removeAllImageFormState = () => {
        // this.setState({images: []});
        this.props.handleRemoveAllImages(this.state.images);
    };

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

        if(this.state.error !== null) {
            return (
                <div className="content-right">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <Error500 onLinkClick={this.loadData} />
                        </div>
                    </div>
                </div>
            )
        }

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
                            <div className="mx-auto">
                                {(this.state.profileLoading) ? <Spinner color="primary" /> : (this.state.profileData && (
                                        <h4>
                                            <span className="badge badge-dark badge-pill">{this.state.profileData.gender}</span>
                                            <button className="btn btn-primary btn-sm ml-50" onClick={() => this.changeGender()}>
                                                <RefreshCw size={20} />
                                            </button>
                                        </h4>
                                    )
                                )}
                            </div>
                            <div className="mx-auto mb-2">
                                {(this.state.reportLoading || this.state.blockLoading) ? <Spinner color="primary" /> : (
                                    <>
                                        <button className="btn btn-warning mr-50 mb-50" onClick={() => this.reportProfile()}>
                                            Report
                                        </button>
                                        <button className="btn btn-danger mb-50" onClick={() => this.blockProfile()}>
                                            Block
                                        </button>
                                    </>
                                )}
                            </div>
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
                            <div className="col-md-12 mt-2 text-center">
                                {(this.state.loading) ? <Spinner color="primary"/> : (
                                    <>
                                        <h4>Validate current image</h4>
                                        <button className="btn btn-success mr-1" onClick={() => this.validateImage('true')}><ThumbsUp size={20} /></button>
                                        <button className="btn btn-danger mr-1" onClick={() => this.validateImage('false')}><ThumbsDown size={20} /></button>
                                        <button className="btn btn-dark" onClick={this.deleteImage}><Trash2 size={20} /></button>
                                        <hr/>
                                        <h4>Note profile</h4>
                                        <button className="btn btn-success mr-1 score-size-1" onClick={() => this.notateProfile(1)}>1 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-2" onClick={() => this.notateProfile(2)}>2 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-3" onClick={() => this.notateProfile(3)}>3 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-4" onClick={() => this.notateProfile(4)}>4 <CheckCircle size={20} /></button>
                                        <button className="btn btn-success mr-1 score-size-5" onClick={() => this.notateProfile(5)}>5 <CheckCircle size={20} /></button>
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

const mapStateToProps = state => {
    return {
        backOfficeUserId: state.authUser?.data?.entityId,
        backOfficeUserLastName: state.authUser?.data?.lastName,
        backOfficeUserFirstName: state.authUser?.data?.firstName,
    }
};

export default connect(mapStateToProps)(ImageLog);
