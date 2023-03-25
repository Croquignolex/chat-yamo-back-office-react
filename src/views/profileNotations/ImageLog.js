import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner} from "reactstrap";
import {Image, ThumbsUp, ThumbsDown, Trash2, CheckCircle, ArrowLeft, ArrowRight, Star} from "react-feather";

import Error500 from "../Error500";
import User from "../../models/User";
import DisplayImage from "../../components/DisplayImage";
import {
    blockUser,
    reportUser,
    verifyUserImage,
    deleteUserImage,
    notateUserProfile,
    updateUserProfile,
    getUserProfile,
    getUserStatus,
    getUserProfileImage,
    searchUserImages
} from "../../redux/actions/IndependentActions";

class ImageLog extends React.Component {
    // props { activeChatID, activeUser, mainSidebar, handleReceiverSidebar }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
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
        this.removeImageFormState = this.removeImageFormState.bind(this);
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
        if(activeUser !== null) {
            this.setState({ loading: true, error: null, images: []});
            const userId = activeUser.id;
            getUserProfile(userId)
                .then(async data => {
                    // Make user as an object
                    const user = new User(data);
                    user.setId = userId;
                    try {
                        user.setStatus = await getUserStatus(userId);
                        user.setAvatar = await getUserProfileImage(userId);
                        user.setImages = await searchUserImages(userId);
                        if(user.images?.length === 0) {
                            user.setImages = [{mediaId: null, originalUrl: require("../../assets/img/no-image.png")}]
                        }
                    } catch (e) {}
                    this.setState({
                        images: user.images,
                        activeIndex: 0,
                        profileData: data,
                        activeUser: user
                    });
                    this.props.handleActiveUser(user);
                })
                .catch((error) => console.log("error ", error))
                .catch((error) => {
                    this.setState({ error });
                    this.props.handleActiveUser(null);
                })
                .finally(() => {this.setState({ loading: false })});
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
        verifyUserImage(this.props.activeUser.id, image.mediaId, image.mediaPath, answer)
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
        deleteUserImage(this.props.activeUser.id, image.mediaId)
            .then(() => {
                // Remove image from array
                this.removeImageFormState(image, true)
                NotificationManager.success("Image has been successfully deleted", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ loading: false }));
    };

    notateProfile = (score) => {
        this.setState({ loading: true });
        // Validate all images
        /*this.state.images.forEach((image) => {
            verifyUserImage(image.userId, image.mediaId, image.mediaPath, 'true').then();
        });*/
        notateUserProfile(this.props.activeUser.id, score)
            .then(() => {
                // Update user side profile show
                const {activeUser, handleActiveUser} = this.props;
                handleActiveUser({...activeUser, verified: true}, true);
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
                // Update user side profile show
                const {activeUser, handleActiveUser} = this.props;
                handleActiveUser({...activeUser, blocked: true});
                // Notification
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
                // Update user side profile show
                const {activeUser, handleActiveUser} = this.props;
                handleActiveUser({...activeUser, gender: newGender});
                // Notification
                NotificationManager.success("User gender has been successfully changed", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ profileLoading: false }));
    };

    removeImageFormState = (image, shouldDelete = false) => {
        if(shouldDelete) {
            this.setState((prevState) => {
                const tempImages = prevState.images.filter((i) => i.mediaId !== image.mediaId);
                return (tempImages.length === 0)
                    ? {images: [{mediaId: null, originalUrl: require("../../assets/img/no-image.png")}]}
                    : {images: tempImages};
            });
        } else this.next();
    };

    render() {
        const { activeIndex } = this.state;
        const { activeUser, handleReceiverSidebar } = this.props;
        const slides = this.state.images.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.mediaId}>
                    <DisplayImage src={
                        item.compressedPreSignedUrl ||
                        item.originalPreSignedUrl ||
                        item.compressedUrl ||
                        item.originalUrl
                    } height={"300"}  width={""} />
                </CarouselItem>
            );
        });

        if((this.state.error !== null) || (this.props.error !== null)) {
            return (
                <div className="content-right float-left width-100-percent">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <Error500 onLinkClick={this.loadData} />
                        </div>
                    </div>
                </div>
            )
        }

        if(this.state.loading || this.props.loading) {
            return (
                <div className="content-right float-left width-100-percent">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <Image size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                <Spinner color="primary" />
                            </h4>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="content-right float-left width-100-percent">
                <div className="chat-app-window">
                    <div className="active-chat d-block"> 
                        <div className="chat_navbar">
                            <header className="chat_header px-1 py-50">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex justify-content-between">
                                        <div className="avatar user-profile-toggle m-0 m-0 mr-1 align-content-start">
                                            <DisplayImage src={activeUser.avatar} withModal={false} />
                                        </div>
                                        <h6>
                                            {activeUser?.name}
                                            {activeUser?.verified && <span className="ml-1"><CheckCircle size={17} className="text-success" /></span>}
                                            {activeUser?.isPremium && <span className="ml-1"><Star size={17} className="text-warning" /></span>}
                                            <br/> {activeUser?.city}, {activeUser?.country}
                                        </h6>
                                    </div>
                                    <div>
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
                                </div>
                            </header>
                        </div> 
                        
                        <div className="user-chats">
                            <div className="float-left">
                                <button className="btn btn-primary" onClick={() => this.props.handleChangeUser(false)}>
                                    <ArrowLeft size={20} />
                                </button>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-primary" onClick={() => this.props.handleChangeUser(true)}>
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                            <div className="mx-auto mb-50">
                                {(this.state.profileLoading || this.state.blockLoading) ? <Spinner color="primary" /> : (
                                    <>
                                        <span className="mr-2">
                                            <span className="badge badge-dark badge-pill">{this.state.profileData.gender}</span>
                                            <button className="btn btn-primary btn-sm ml-50" onClick={() => this.changeGender()}>
                                                Change
                                            </button>
                                        </span>
                                        <span className="ml-2">
                                            <button className="btn btn-warning btn-sm mr-50" onClick={() => this.reportProfile()}>
                                                Report
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => this.blockProfile()}>
                                                Block
                                            </button>
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="col-md-6 mx-auto height-xx">
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
                            <div className="col-md-12 mt-50 text-center">
                                {(this.state.loading) ? <Spinner color="primary"/> : (
                                    <>
                                        {(this.state.images[0].mediaId !== null) &&
                                            <span className="mr-4">
                                                {/*<strong>Validate current image</strong><br/>*/}
                                                <button className="btn btn-success mr-50 btn-sm" onClick={() => this.validateImage('true')}><ThumbsUp size={15} /></button>
                                                <button className="btn btn-danger mr-50 btn-sm" onClick={() => this.validateImage('false')}><ThumbsDown size={15} /></button>
                                                <button className="btn btn-dark btn-sm" onClick={this.deleteImage}><Trash2 size={15} /></button>
                                            </span>
                                        }
                                        <span>
                                            {/*<strong>Note profile</strong><br/>*/}
                                            <button className="btn btn-success mr-50 score-size-1" onClick={() => this.notateProfile(1)}>1 <CheckCircle size={20} /></button>
                                            <button className="btn btn-success mr-50 score-size-2" onClick={() => this.notateProfile(2)}>2 <CheckCircle size={20} /></button>
                                            <button className="btn btn-success mr-50 score-size-3" onClick={() => this.notateProfile(3)}>3 <CheckCircle size={20} /></button>
                                            <button className="btn btn-success mr-50 score-size-4" onClick={() => this.notateProfile(4)}>4 <CheckCircle size={20} /></button>
                                            <button className="btn btn-success mr-50 score-size-5" onClick={() => this.notateProfile(5)}>5 <CheckCircle size={20} /></button>
                                        </span>
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
