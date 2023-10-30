import React from "react";
import * as Icon from "react-feather"
import {CardBody, Card, Spinner, Button} from "reactstrap";

import "../../assets/scss/pages/users.scss";

import Error500 from "../Error500";
import UserAppData from "./UserAppData";
import MetaData from "../../models/MetaData";
import UserTownEvents from "./UserTownEvents";
import FormModal from "../../components/FormModal";
import UserSouscriptions from "./UserSouscriptions";
import UserStatusHistory from "./UserStatusHistory";
import DisplayImage from "../../components/DisplayImage";
import {getFreeConversation, getUserMetaData, getUserSouscriptions} from "../../redux/actions/IndependentActions";
import Souscriptions from "../../models/Souscriptions";
import dayjs from "dayjs";

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Metadata state
            show: false,
            error: null,
            loading: false,
            metaData: null,
            freeConversation: 0,
            subscription: "",
            // Modals
            townEventModal: {show: false, title: ""},
            souscriptionModal: {show: false, title: ""},
            statusHistoryModal: {show: false, title: ""},
            appDataModal: {show: false, title: ""}
        }
    }

    componentDidMount() {
        this.showMetaData();
        this.handleFreeConversation();
        this.handleSubscription();
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeUser !== this.props.activeUser) {
            this.showMetaData();
        }
    }*/

    handleFreeConversation = () => {
        const id = this.props.user?.id;
        this.setState({ freeConversation: 0 });

        if(id) {
            getFreeConversation(id)
                .then(data => {
                    this.setState({ freeConversation: data?.count })
                })
                .catch(() => this.setState({ freeConversation: 'ERROR' }));
        }
    }

    handleSubscription = () => {
        const id = this.props.user?.id;
        this.setState({ subscription: '' });

        if(id) {
            getUserSouscriptions(id)
                .then(data => {
                    const sub = new Souscriptions(data[0]);
                    if(dayjs().isBefore(sub.endDate)) {
                        const subscription = `${sub.pack} (${sub.type})`;
                        this.setState({ subscription });
                    }
                })
                .catch(() => this.setState({ subscription: 'ERROR' }));
        }
    }

    showMetaData = () => {
        const id = this.props.user?.id;
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

    /*handleShowMetaData = () => {
        this.setState({loading: true, error: null, metaData: null, show: false});
        getUserMetaData(this.props.user?.id)
            .then(data => {
                const metaData = new MetaData(data);
                this.setState({ metaData, show: true })
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }*/

    toggleSouscriptionModal = () => {
        const {souscriptionModal} = this.state;
        const { user } = this.props;
        if(souscriptionModal.show) this.setState({souscriptionModal: {...souscriptionModal, show: false}});
        else {
            const title = user.isDeleted ? "Deleted user" : `${user.name} souscriptions history`;
            this.setState({souscriptionModal: {show: true, title}});
        }
    };

    toggleTownEventModal = () => {
        const {townEventModal} = this.state;
        const { user } = this.props;
        if(townEventModal.show) this.setState({townEventModal: {...townEventModal, show: false}});
        else {
            const title = user.isDeleted ? "Deleted user" : `${user.name} town event check`;
            this.setState({townEventModal: {show: true, title}});
        }
    };

    toggleStatusHistoryModal = () => {
        const {statusHistoryModal} = this.state;
        const { user } = this.props;
        if(statusHistoryModal.show) this.setState({statusHistoryModal: {...statusHistoryModal, show: false}});
        else {
            const title = user.isDeleted ? "Deleted user" : `${user.name} status history`;
            this.setState({statusHistoryModal: {show: true, title}});
        }
    };

    toggleAppDataModal = () => {
        const {appDataModal} = this.state;
        const { user } = this.props;
        if(appDataModal.show) this.setState({appDataModal: {...appDataModal, show: false}});
        else {
            const title = user?.isDeleted ? "Deleted user" : `${user?.name} app data`;
            this.setState({appDataModal: {show: true, title}});
        }
    };

    render() {

        const { metaData, freeConversation, subscription, souscriptionModal, townEventModal, statusHistoryModal, appDataModal } = this.state;
        const { user } = this.props;

        if (!user) return null;

        return (
            <>
                <Card>
                    <CardBody>
                        <div className="header-profile-sidebar">
                            <div className="avatar">
                                <DisplayImage src={user.imageSrc} height="70" width="70" />
                            </div>
                            {!user.isBlocked
                                ? <Icon.Unlock size={20} className="text-success" />
                                : <Icon.Lock size={20} className="text-danger" />
                            }
                        </div>
                        <hr />
                        <div className="users-page-view-table">
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Premium
                                </div>
                                {(user.isPremium)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Subscription
                                </div>
                                <div className="font-weight-bold primary">
                                    {subscription}
                                </div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Certified
                                </div>
                                {(user?.isCertified)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Verified
                                </div>
                                {(user.verified)
                                    ? <div className="font-weight-bold text-success">Yes</div>
                                    : <div className="font-weight-bold text-danger">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Blocked
                                </div>
                                {(user.isBlocked)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Deleted
                                </div>
                                {(user.isDeleted)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Blacklisted
                                </div>
                                {(user.isBlacklisted)
                                    ? <div className="font-weight-bold text-danger">Yes</div>
                                    : <div className="font-weight-bold text-success">No</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Name
                                </div>
                                <div>{user.name}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Age
                                </div>
                                <div>{user.age}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    gender
                                </div>
                                <div>{user.gender}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    City
                                </div>
                                <div>{user.city}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Town
                                </div>
                                <div>{user.province}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Country
                                </div>
                                <div>{user.country}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Native country
                                </div>
                                <div>{user.homeCountry}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    Greeting text
                                </div>
                                <div>{user.greetingText}</div>
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
                                    End subcription
                                </div>
                                {(user.verified)
                                    ? <div className="font-weight-bold text-success">{user.subscriptionEndDate}</div>
                                    : <div className="font-weight-bold text-danger">{user.subscriptionEndDate}</div>
                                }
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    App version
                                </div>
                                <div className="font-weight-bold text-primary">{user?.appData?.appVersion}</div>
                            </div>
                            <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                    User ID
                                </div>
                                <div className="font-weight-bold text-primary">{user.id}</div>
                            </div>
                            {!(this.props.simplify) && (
                                <>
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
                                        <Button color="primary" onClick={this.toggleStatusHistoryModal}>
                                            Status history
                                        </Button>
                                        <Button color="primary" onClick={this.toggleTownEventModal} className="ml-50">
                                            Town event
                                        </Button>
                                        <Button color="info" onClick={this.toggleAppDataModal} className="ml-50">
                                            App Data
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardBody>
                </Card>

                <FormModal small modal={souscriptionModal} toggleModal={this.toggleSouscriptionModal}>
                    <UserSouscriptions userId={user.id} />
                </FormModal>
                <FormModal small modal={townEventModal} toggleModal={this.toggleTownEventModal}>
                    <UserTownEvents userId={user.id} />
                </FormModal>
                <FormModal small modal={statusHistoryModal} toggleModal={this.toggleStatusHistoryModal}>
                    <UserStatusHistory userId={user.id} />
                </FormModal>
                <FormModal small modal={appDataModal} toggleModal={this.toggleAppDataModal}>
                    <UserAppData appData={user?.appData} />
                </FormModal>
            </>
        )
    }
}

export default UserDetails
