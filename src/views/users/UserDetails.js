import React from "react";
import * as Icon from "react-feather"
import {CardBody, Card, Spinner, Button} from "reactstrap";

import Error500 from "../Error500"; 
import "../../assets/scss/pages/users.scss";
import MetaData from "../../models/MetaData";
import UserTownEvents from "./UserTownEvents";
import FormModal from "../../components/FormModal";
import UserSouscriptions from "./UserSouscriptions";
import UserStatusHistory from "./UserStatusHistory";
import DisplayImage from "../../components/DisplayImage";
import {getUserMetaData} from "../../redux/actions/IndependentActions";

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Metadata state
            show: false,
            error: null, 
            loading: false,
            metaData: null,
            // Modals
            townEventModal: {show: false, title: ""},
            souscriptionModal: {show: false, title: ""},
            statusHistoryModal: {show: false, title: ""}
        }
    }

    handleShowMetaData = () => {
        this.setState({loading: true, error: null, metaData: null, show: false});
        getUserMetaData(this.props.user?.id)
            .then(data => {
                const metaData = new MetaData(data);
                this.setState({ metaData, show: true })
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

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

    render() {

        const { metaData, souscriptionModal, townEventModal, statusHistoryModal } = this.state;
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
                                    End subcription
                                </div>
                                {(user.verified)
                                    ? <div className="font-weight-bold text-success">{user.subscriptionEndDate}</div>
                                    : <div className="font-weight-bold text-danger">{user.subscriptionEndDate}</div>
                                }
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
                                                <Button color="danger" onClick={this.handleShowMetaData}>
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
            </> 
        )
    }
}

export default UserDetails
