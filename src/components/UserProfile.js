import React from "react";
import dayjs from "dayjs";
import {X} from "react-feather";
import * as Icon from "react-feather";
import {Button, Spinner} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import FormModal from "./FormModal";
import Error500 from "../views/Error500";
import MetaData from "../models/MetaData";
import DisplayImage from "./DisplayImage";
import Souscriptions from "../models/Souscriptions";
import UserSearchFilter from "../views/users/UserSearchFilter";
import UserAppData from "../views/users/UserAppData";
import UserTownEvents from "../views/users/UserTownEvents";
import UserStatusHistory from "../views/users/UserStatusHistory";
import UserSouscriptions from "../views/users/UserSouscriptions";
import UserLifeStyle from "../views/users/UserLifeStyle";
import {
    getConversation,
    getFreeConversation,
    getPendingResLikes,
    getScore,
    getUserMetaData,
    getUserSouscriptions,
    getVideoDates
} from "../redux/actions/IndependentActions";

import "../assets/scss/pages/users.scss";
import UserCustomerJourney from "../views/users/UserCustomerJourney";
import UserAutomaticPayments from "../views/users/UserAutomaticPayments";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: null,
            show: false,
            error: null,
            loading: false,
            metaData: null,
            freeConversation: 0,
            score: 0,
            activeCon: 0,
            vidDates: 0,
            penResLikes: 0,
            moreCon: false,
            subscription: "",
            townEventModal: {show: false, title: ""},
            souscriptionModal: {show: false, title: ""},
            automaticPaymentModal: {show: false, title: ""},
            statusHistoryModal: {show: false, title: ""},
            appDataModal: {show: false, title: ""},
            searchFilterModal: {show: false, title: ""},
            lifeStyleModal: {show: false, title: ""},
            customerJourneyModal: {show: false, title: ""},
        }
    }

    componentDidMount() {
        this.showMetaData();
        this.handleFreeConversation();
        this.handleScore();
        this.handleSubscription();
        this.handleConversation();
        this.handleVideoDates();
        this.handlePendingResLikes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeUser !== this.props.activeUser) {
            this.showMetaData();
            this.handleFreeConversation();
            this.handleScore();
            this.handleSubscription();
            this.handleConversation();
            this.handleVideoDates();
            this.handlePendingResLikes();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeUser !== state.activeUser) {
            return {
                activeUser: props.activeUser,
                loading: false, error: null, metaData: null, show: false
            }
        }
        return null
    }

    handleFreeConversation = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ freeConversation: 0 });

        if(id) {
            getFreeConversation(id)
                .then(data => {
                    this.setState({ freeConversation: data?.count })
                })
                .catch(() => this.setState({ freeConversation: '' }));
        }
    }

    handleScore = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ score: 0 });

        if(id) {
            getScore(id)
                .then(data => {
                    if(data && data.length > 0) {
                        this.setState({ score: data[0]?.score })
                    }
                })
                .catch(() => this.setState({ score: '' }));
        }
    }

    handleConversation = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ activeCon: 0, moreCon: false });

        if(id) {
            getConversation(id)
                .then(data => {
                    this.setState({ activeCon: data?.count, moreCon: data?.moreChatrooms })
                })
                .catch(() => this.setState({ activeCon: '', moreCon: '' }));
        }
    }

    handleVideoDates = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ vidDates: 0 });

        if(id) {
            getVideoDates(id)
                .then(data => {
                    this.setState({ vidDates: data?.count })
                })
                .catch(() => this.setState({ vidDates: '' }));
        }
    }

    handlePendingResLikes = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ penResLikes: 0 });

        if(id) {
            getPendingResLikes(id)
                .then(data => {
                    this.setState({ penResLikes: data?.count })
                })
                .catch(() => this.setState({ penResLikes: '' }));
        }
    }

    handleSubscription = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ subscription: '' });

        if(id) {
            getUserSouscriptions(id)
                .then(data => {
                    const sub = new Souscriptions(data[0]);
                    // console.log({data}, data[0], sub, dayjs().isBefore(sub.endDate))
                    if(dayjs().isBefore(sub.endDate)) {
                        const subscription = `${sub.pack} (${sub.type})`;
                        this.setState({ subscription });
                    }
                })
                .catch(() => this.setState({ subscription: '' }));
        }
    }

    showMetaData = () => {
        const id = this.state.activeUser?.id || this.state.activeUser?.userId;
        this.setState({ metaData: null });

        if(id) {
            getUserMetaData(id)
                .then(data => {
                    const metaData = new MetaData(data);
                    this.setState({ metaData })
                })
                .catch(error => this.setState({ error }));
        }
    }

    toggleSouscriptionModal = () => {
        const {souscriptionModal, activeUser} = this.state;
        if(souscriptionModal.show) this.setState({souscriptionModal: {...souscriptionModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} souscriptions history`;
            this.setState({souscriptionModal: {show: true, title}});
        }
    };

    toggleAutomaticPaymentModal = () => {
        const {automaticPaymentModal, activeUser} = this.state;
        if(automaticPaymentModal.show) this.setState({automaticPaymentModal: {...automaticPaymentModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} automatic payment`;
            this.setState({automaticPaymentModal: {show: true, title}});
        }
    };

    toggleTownEventModal = () => {
        const {townEventModal, activeUser} = this.state;
        if(townEventModal.show) this.setState({townEventModal: {...townEventModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} town event check`;
            this.setState({townEventModal: {show: true, title}});
        }
    };

    toggleStatusHistoryModal = () => {
        const {statusHistoryModal, activeUser} = this.state;
        if(statusHistoryModal.show) this.setState({statusHistoryModal: {...statusHistoryModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} status history`;
            this.setState({statusHistoryModal: {show: true, title}});
        }
    };

    toggleAppDataModal = () => {
        const {appDataModal, activeUser} = this.state;
        if(appDataModal.show) this.setState({appDataModal: {...appDataModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} app data`;
            this.setState({appDataModal: {show: true, title}});
        }
    };

    toggleSearchFilterModal = () => {
        const {searchFilterModal, activeUser} = this.state;
        if(searchFilterModal.show) this.setState({searchFilterModal: {...searchFilterModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} search filter`;
            this.setState({searchFilterModal: {show: true, title}});
        }
    };

    toggleLifeStyleModal = () => {
        const {lifeStyleModal, activeUser} = this.state;
        if(lifeStyleModal.show) this.setState({lifeStyleModal: {...lifeStyleModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} life style`;
            this.setState({lifeStyleModal: {show: true, title}});
        }
    };

    toggleCustomerJourneyModal = () => {
        const {customerJourneyModal, activeUser} = this.state;
        if(customerJourneyModal.show) this.setState({customerJourneyModal: {...customerJourneyModal, show: false}});
        else {
            const title = activeUser?.isDeleted ? "Deleted user" : `${activeUser?.name} customer journey`;
            this.setState({customerJourneyModal: {show: true, title}});
        }
    };

    render() {
        const {
            activeCon, moreCon, vidDates, penResLikes, automaticPaymentModal,
            activeUser, metaData, score, freeConversation, subscription, souscriptionModal, customerJourneyModal,
            townEventModal, statusHistoryModal, appDataModal, searchFilterModal, lifeStyleModal
        } = this.state;
        const { receiverProfile, handleReceiverSidebar } = this.props;

        if (!activeUser) return null;

        return (
            <>
                <div className={`user-profile-sidebar ${receiverProfile ? "show" : null}`}>
                    <header className="user-profile-header">
            <span className="close-icon" onClick={() => handleReceiverSidebar("close")}>
              <X size={24} />
            </span>
                        <div className="header-profile-sidebar">
                            <div className="avatar">
                                <DisplayImage src={activeUser?.imageSrc} height="70" width="70" />
                            </div>
                            <h4 className="chat-user-name">
                                {activeUser?.isDeleted ? "Deleted user" : activeUser?.name}
                                <br/>
                                {!activeUser?.isBlocked
                                    ? <Icon.Unlock size={20} className="text-success" />
                                    : <Icon.Lock size={20} className="text-danger" />
                                }
                            </h4>
                        </div>
                    </header>
                    <PerfectScrollbar className="user-profile-sidebar-area p-2" options={{wheelPropagation: false}}>
                        <div className="users-page-view-table">
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Premium
                                </div>
                                {(activeUser?.isPremium)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Subscription
                                </div>
                                <div className="font-weight-bold text-primary">
                                    {subscription}
                                </div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Certified
                                </div>
                                {(activeUser?.isCertified)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Verified
                                </div>
                                {(activeUser?.verified)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Blocked
                                </div>
                                {(activeUser?.isBlocked)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Deleted
                                </div>
                                {(activeUser?.isDeleted)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Blacklisted
                                </div>
                                {(activeUser?.isBlacklisted)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Age
                                </div>
                                <div>{activeUser?.age}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    gender
                                </div>
                                <div>{activeUser?.gender ? activeUser?.gender : 'none'}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    City
                                </div>
                                <div>{activeUser?.city}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Town
                                </div>
                                <div>{activeUser?.province}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Country
                                </div>
                                <div>{activeUser?.country}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Native country
                                </div>
                                <div>{activeUser?.homeCountry}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Greeting text
                                </div>
                                <div>{activeUser?.greetingText}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Account creation
                                </div>
                                <div className="font-weight-bold text-primary">{metaData?.creation}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Free conversation
                                </div>
                                <div className="font-weight-bold text-primary">{freeConversation}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Score
                                </div>
                                <div className="font-weight-bold text-primary">{score}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Active Conversation
                                </div>
                                <div className="font-weight-bold text-primary">{activeCon}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    More Conversation
                                </div>
                                {(moreCon)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Scheduled video dates
                                </div>
                                <div className="font-weight-bold text-primary">{vidDates}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Pending received likes
                                </div>
                                <div className="font-weight-bold text-primary">{penResLikes}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    End subcription
                                </div>
                                {(activeUser?.verified)
                                    ? <div className="font-weight-bold text-success">{activeUser?.subscriptionEndDate}</div>
                                    : <div className="font-weight-bold text-danger">{activeUser?.subscriptionEndDate}</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    App version
                                </div>
                                <div className="font-weight-bold text-primary">{activeUser?.appData?.appVersion}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    User ID
                                </div>
                                <div className="font-weight-bold text-primary">{activeUser?.id}</div>
                            </div>
                            <hr />
                            {(this.state.error) && <Error500 refresh={false} />}
                            {(this.state.show) && (
                                <div className="mb-50 border border-danger p-50">
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                            Identifier
                                        </div>
                                        <div className="text-primary font-weight-bold">
                                            {metaData?.id}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                            Old Phone
                                        </div>
                                        <div className="text-primary font-weight-bold">
                                            {metaData?.oldPhone}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="text-center">
                                {(this.state.loading) ? <Spinner color="primary" /> : (
                                    (!this.state.show) && (
                                        <Button color="danger" onClick={() => this.setState({show: true})}>
                                            Private data
                                        </Button>
                                    )
                                )}
                                {(!this.state.loading) && (
                                    <Button color="primary" className="ml-50" onClick={this.toggleSouscriptionModal}>
                                        Souscriptions
                                    </Button>
                                )}
                            </div>
                            <hr />
                            <div className="text-center">
                                <div className="mb-50 text-center">
                                    <Button color="primary" onClick={this.toggleStatusHistoryModal} className="mt-50">
                                        Status history
                                    </Button>
                                    <Button color="primary" onClick={this.toggleTownEventModal} className="ml-50 mt-50">
                                        Town event
                                    </Button>
                                    {(!this.state.loading) && (
                                        <Button color="primary" className="ml-50 mt-50" onClick={this.toggleAutomaticPaymentModal}>
                                            Automatic Payment
                                        </Button>
                                    )}
                                </div>
                                <hr />
                                <div className="mt-50 text-center">
                                    <Button color="success" onClick={this.toggleAppDataModal} className="mt-50">
                                        App Data
                                    </Button>
                                    <Button color="success" onClick={this.toggleSearchFilterModal} className="mt-50 ml-50">
                                        Search Filter
                                    </Button>
                                </div>
                                <div className="mt-50 text-center">
                                    <Button color="success" onClick={this.toggleLifeStyleModal} className="mt-50">
                                        Life Style
                                    </Button>
                                    <Button color="dark" onClick={this.toggleCustomerJourneyModal} className="mt-50 ml-50">
                                        Customer Journey
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
                <FormModal small modal={souscriptionModal} toggleModal={this.toggleSouscriptionModal}>
                    <UserSouscriptions userId={activeUser?.id} />
                </FormModal>
                <FormModal modal={automaticPaymentModal} toggleModal={this.toggleAutomaticPaymentModal}>
                    <UserAutomaticPayments userId={activeUser?.id} />
                </FormModal>
                <FormModal small modal={townEventModal} toggleModal={this.toggleTownEventModal}>
                    <UserTownEvents userId={activeUser?.id} />
                </FormModal>
                <FormModal small modal={statusHistoryModal} toggleModal={this.toggleStatusHistoryModal}>
                    <UserStatusHistory userId={activeUser?.id} />
                </FormModal>
                <FormModal color={"success"} small modal={appDataModal} toggleModal={this.toggleAppDataModal}>
                    <UserAppData appData={activeUser?.appData} />
                </FormModal>
                <FormModal color={"success"} small modal={searchFilterModal} toggleModal={this.toggleSearchFilterModal}>
                    <UserSearchFilter searchFilter={activeUser?.searchFilter} />
                </FormModal>
                <FormModal color={"success"} small modal={lifeStyleModal} toggleModal={this.toggleLifeStyleModal}>
                    <UserLifeStyle lifeStyle={activeUser?.lifeStyle} />
                </FormModal>
                <FormModal color={"dark"} small modal={customerJourneyModal} toggleModal={this.toggleCustomerJourneyModal}>
                    <UserCustomerJourney userId={activeUser?.id} />
                </FormModal>
            </>
        )
    }
}
export default UserProfile
