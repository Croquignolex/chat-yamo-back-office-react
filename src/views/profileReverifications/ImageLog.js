import React from "react";
import ReactDOM from "react-dom"
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import * as Icon from "react-feather";
import {
    Spinner,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from "reactstrap";
import {
    Star,
    Image,
    Trash2,
    ThumbsUp,
    ArrowLeft,
    ThumbsDown,
    ArrowRight,
    RefreshCcw,
    CheckCircle,
    X
} from "react-feather";

import Error500 from "../Error500";
import User from "../../models/User";
import {imageExists} from "../../helpers/helpers";
import DisplayImage from "../../components/DisplayImage";
import FormatStringWithPopHover from "../../components/FormatStringWithPopHover";
import {
    blockUser,
    reportUser,
    getUserStatus,
    getUserProfile,
    getUserAppData,
    deleteUserImage,
    verifyUserImage,
    getUserIdentity,
    searchUserImages,
    notateUserProfile,
    updateUserProfile,
    getUserProfileImage,
    getUserSuspiciousState,
    deleteUserProfileDescription,
    reVerifiedProfile,
    getSearchFilter
} from "../../redux/actions/IndependentActions";

class ImageLog extends React.Component {
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
            descriptionLoading: false,
            reverificationLoading: false,
            activeUser: null,
            profileData: null,
            deleteDescription: '',
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
        const {activeUser, handleActiveUser, handleRemoveProfileToList, handleToVerify} = this.props;
        if(activeUser !== null) {
            this.setState({ loading: true, error: null, images: []});
            const userId = activeUser.id;
            const date = activeUser.date;
            const category = activeUser.category;
            getUserProfile(userId)
                .then(async data => {
                    // Make user as an object
                    const user = new User({...data, date, category});

                    handleToVerify();

                    try {
                        // Not concerned in removal conditions
                        try {
                            user.setAppData = await getUserAppData(userId);
                            user.setSearchFilter = await getSearchFilter(user.id);
                            user.setCertified = await getUserIdentity(userId);
                            user.setForceStatus = await getUserStatus(userId);
                            user.setSuspiciousState = await getUserSuspiciousState(userId);
                        } catch (e) {}

                        if(user.isDeleted) {
                            // Remove profile from list and go to another profile
                            handleRemoveProfileToList(userId);
                        } else {
                            // User profile image
                            user.setAvatar = await getUserProfileImage(userId);

                            const images = await searchUserImages(userId);
                            const exitingImages = [];

                            for(const image of (images || []))
                            {
                                try {
                                    const response = await imageExists(
                                        image.enhancedPreSignedUrl ||
                                        image.compressedPreSignedUrl ||
                                        image.originalPreSignedUrl ||
                                        image.compressedUrl ||
                                        image.originalUrl
                                    );

                                    response && exitingImages.push(image);
                                } catch (e) {}
                            }

                            if(exitingImages.length === 0) {
                                // No image in the profile
                                handleRemoveProfileToList(userId);
                            } else {
                                user.setImages = exitingImages;

                                this.setState({
                                    images: user.images,
                                    activeIndex: 0,
                                    profileData: data,
                                    activeUser: user,
                                    deleteDescription: user.greetingText
                                });
                                handleActiveUser(user);

                                this.setState({ loading: false });
                            }
                        }
                    } catch (e) {
                        // Manage exception but not blocking
                        handleRemoveProfileToList(userId);
                    }
                })
                .catch((error) => {
                    this.loadErrorProfile(activeUser, error);
                    this.setState({ loading: false });
                });
        }
    };

    loadErrorProfile = (activeUser, error) => {
        const {handleActiveUser} = this.props;
        console.log("error ", error);
        const user = new User(activeUser);
        user.setImages = [{mediaId: null, originalUrl: require("../../assets/img/no-image.png")}]
        this.setState({
            images: user.images,
            activeIndex: 0,
            profileData: {},
            activeUser: user,
            error
        });
        handleActiveUser(user);
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
        verifyUserImage(this.state.activeUser.id, image.mediaId, image.mediaPath, answer)
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
        deleteUserImage(this.state.activeUser.id, image.mediaId)
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
        notateUserProfile(this.state.activeUser.id, score)
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
        reportUser(this.state.activeUser.id, backOfficeUserFirstName, backOfficeUserLastName)
            .then(() => {
                // No action
                NotificationManager.success("User profile has been successfully reported", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ reportLoading: false }));
    };

    blockProfile = () => {
        this.setState({blockLoading: true});
        blockUser(this.state.activeUser.id)
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
        updateUserProfile(this.state.activeUser.id, newGender, profileData)
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

    deleteDescription = () => {
        this.setState({descriptionLoading: true});
        deleteUserProfileDescription(this.state.activeUser.id, this.state.profileData)
            .then(() => {
                this.setState((prevState) => {
                    const tempProfileData = prevState.profileData;
                    return {profileData: {...tempProfileData, greetingText: "", deleteDescription: ""}};
                });
                // Update user side profile show
                const {activeUser, handleActiveUser} = this.props;
                handleActiveUser({...activeUser, greetingText: ""});
                // Notification
                NotificationManager.success("User profile description has been successfully deleted", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ descriptionLoading: false }));
    };

    reverification = () => {
        // console.log("this.state.activeUser", this.state.activeUser)
        this.setState({reverificationLoading: true});
        const {id, date, category} = this.state.activeUser;
        reVerifiedProfile(id, date, category)
            .then(() => {
                // Notification
                NotificationManager.success("User profile has been successfully re-verified", null, 1000);
            })
            .catch((error) => console.log("error ", error))
            .finally(() => this.setState({ reverificationLoading: false }));
    };

    removeImageFormState = (image, shouldDelete = false) => {
        if(shouldDelete) {
            this.setState((prevState) => {
                const tempImages = prevState.images.filter((i) => i.mediaId !== image.mediaId);
                const images = (tempImages.length === 0) ? [{mediaId: null, originalUrl: require("../../assets/img/no-image.png")}] : tempImages;
                return {images, activeIndex: 0};
            });
        } else this.next();
    };

    render() {
        const { activeIndex, profileData, images } = this.state;
        const { activeUser, handleReceiverSidebar, showPreviousNavigation, showNextNavigation, handleChangeUser, toVerify, activeUserIndex } = this.props;
        const slides = images.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.mediaId}>
                    <DisplayImage src={
                        item.enhancedPreSignedUrl ||
                        item.compressedPreSignedUrl ||
                        item.originalPreSignedUrl ||
                        item.compressedUrl ||
                        item.originalUrl
                    } height={"300"}  width={""} />
                </CarouselItem>
            );
        });

        if(this.props.error !== null) {
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

        if(this.props.activeUser === null) {
            return (
                <div className="content-right float-left width-100-percent">
                    <div className="chat-app-window">
                        <div className={`start-chat-area d-flex`}>
                            <span className="mb-1 start-chat-icon">
                                <Image size={50} />
                            </span>
                            <h4 className="py-50 px-1 sidebar-toggle start-chat-text">
                                No data found
                            </h4>
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
                        <div className="chat_navbar mt-50">
                            <header className="chat_header px-1">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex flex-1">
                                        <div className="avatar user-profile-toggle m-0 m-0 mr-1 align-content-start">
                                            {(activeUser.greetingText)
                                                ? <DisplayImage src={activeUser?.avatar} withModal={false} width={"50"} height={"50"} />
                                                : <DisplayImage src={activeUser?.avatar} withModal={false} />
                                            }
                                        </div>
                                        {(this.state.error) ? <h6 className="text-danger pt-1">User not found</h6> : (
                                           <>
                                               <h6 className="align-content-start">
                                                   {activeUser?.name}
                                                   {activeUser?.verified && <span className="ml-1"><CheckCircle size={17} className="text-success" /></span>}
                                                   {activeUser?.isPremium && <span className="ml-1"><Star size={17} className="text-warning" /></span>}
                                                   <br/> {activeUser?.city}, {activeUser?.country}
                                                   <br/> <FormatStringWithPopHover text={activeUser.greetingText} />
                                               </h6>
                                           </>
                                        )}
                                    </div>
                                    {!(this.state.error) && (
                                        <>
                                            <div className="flex-1 text-center">
                                                {(activeUser?.isBlacklisted)
                                                    ? (
                                                        <div className="badge badge-danger badge-pill font-weight-bold">
                                                            <Icon.Slash size={17} className="mr-25" />
                                                            Blacklisted
                                                            <Icon.Slash size={17} className="ml-25" />
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="badge badge-success badge-pill font-weight-bold">
                                                            <Icon.Heart size={17} className="mr-25" />
                                                            Not blacklisted
                                                            <Icon.Heart size={17} className="ml-25" />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex-1 text-right">
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
                                        </>
                                    )}
                                </div>
                            </header>
                        </div>

                        <div className="user-chats">
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    {showPreviousNavigation && (
                                        <>
                                            <strong>Previous profile</strong><br/>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleChangeUser(false)}>
                                                <ArrowLeft size={15} className="mx-50" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {showNextNavigation && (
                                        <>
                                            <strong>Next profile</strong><br/>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleChangeUser(true)}>
                                                <ArrowRight size={15} className="mx-50" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={`d-flex flex-row justify-content-between ${(showPreviousNavigation || showNextNavigation)  ? 'mb-2' : 'mt-3 mb-2'}`}>
                                <div className={`col-3 d-flex flex-column justify-content-between`}>
                                    <div className="mt-5 text-right">
                                        {!(this.state.error) && (
                                            <>
                                                {
                                                    (this.state.profileLoading) ? <Spinner color="primary" /> : (
                                                        <>
                                                            <strong>Change gender</strong><br/>
                                                            <span className="badge badge-dark badge-pill mb-50">{profileData?.gender ? profileData?.gender : 'none'}</span>
                                                            <button className="btn btn-primary btn-sm ml-50" onClick={() => this.changeGender()}>
                                                                <RefreshCcw size={10} />
                                                            </button>
                                                        </>
                                                    )
                                                }
                                                {
                                                    (this.state.descriptionLoading) ? <div className="mt-4"><Spinner color="primary" /></div> : (
                                                        <>
                                                            <div className="mt-4">
                                                                <strong>Delete Description</strong><br/>
                                                                <button className="btn btn-danger btn-sm" onClick={() => this.deleteDescription()}>
                                                                    <X size={10} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-5 text-right">

                                        {images && images.length > 0 && (!(this.state.error) && (images[0].mediaId !== null)) && (
                                            (this.state.loading) ? <Spinner color="primary"/> : (
                                                <>
                                                    <strong>Validate current image</strong><br/>
                                                    <button className="btn btn-success btn-sm mb-50" onClick={() => this.validateImage('true')}><ThumbsUp size={15} /></button>
                                                    <button className="btn btn-danger ml-50 btn-sm mb-50" onClick={() => this.validateImage('false')}><ThumbsDown size={15} /></button>
                                                    <button className="btn btn-dark ml-50 btn-sm mb-50" onClick={this.deleteImage}><Trash2 size={15} /></button>
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <Carousel
                                        interval={false}
                                        activeIndex={activeIndex}
                                        next={this.next}
                                        previous={this.previous}>
                                        <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                        {slides}
                                        {(images.length > 1) && (
                                            <>
                                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                            </>
                                        )}
                                    </Carousel>
                                    {(!this.state.error) && (
                                        <h4 className="mt-1">
                                            Profile <strong className="text-primary">{activeUserIndex + 1}</strong> / {toVerify}
                                        </h4>
                                    )}
                                </div>
                                <div className={`col-3 d-flex flex-column ${(this.state.error) ? 'justify-content-center' : 'justify-content-between'}`}>
                                    <div className="mt-5 text-left">
                                        {!(this.state.error) && (
                                            <>
                                                {
                                                    (activeUser.date && activeUser.category) && (
                                                        (this.state.reverificationLoading) ? <div className="mb-3"><Spinner color="primary" /></div> : (
                                                            <>
                                                                <div className="mb-3">
                                                                    <strong>Révérification</strong><br/>
                                                                    <button className="btn btn-primary btn-sm px-4" onClick={() => this.reverification()}>
                                                                        <CheckCircle size={15} />
                                                                        {/*<X size={10} />*/}
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )
                                                    )
                                                }
                                                {
                                                    (this.state.reportLoading || this.state.blockLoading) ? <Spinner color="primary" /> : (
                                                        <>
                                                            <strong>Actions</strong><br/>
                                                            <button className="btn btn-warning btn-sm mr-50 mb-50" onClick={() => this.reportProfile()}>
                                                                Report
                                                            </button>
                                                            <button className="btn btn-danger btn-sm mb-50" onClick={() => this.blockProfile()}>
                                                                Block
                                                            </button>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-5 text-left">
                                        {!(this.state.error) && (
                                            (this.state.loading) ? <Spinner color="primary"/> : (
                                                <>
                                                    <strong>Note profile</strong><br/>
                                                    <button className="btn btn-success mr-50 mb-50 score-size-1" onClick={() => this.notateProfile(1)}>1 <CheckCircle size={20} /></button>
                                                    <button className="btn btn-success mr-50 mb-50 score-size-2" onClick={() => this.notateProfile(2)}>2 <CheckCircle size={20} /></button>
                                                    <button className="btn btn-success mr-50 mb-50 score-size-3" onClick={() => this.notateProfile(3)}>3 <CheckCircle size={20} /></button>
                                                    <button className="btn btn-success mr-50 mb-50 score-size-4" onClick={() => this.notateProfile(4)}>4 <CheckCircle size={20} /></button>
                                                    <button className="btn btn-success mb-50 score-size-5" onClick={() => this.notateProfile(5)}>5 <CheckCircle size={20} /></button>
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
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
