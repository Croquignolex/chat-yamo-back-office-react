import React from "react";
import {Row, Col, CardBody, Card, Spinner, Button} from "reactstrap";

import Error500 from "../Error500";
import "../../assets/scss/pages/users.scss";
import MetaData from "../../models/MetaData";
import FormModal from "../../components/FormModal";
import UserSouscriptions from "./UserSouscriptions";
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
            // Souscription modal
            souscriptionModal: {show: false, title: ""},
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

    render() {

        const { metaData, souscriptionModal } = this.state;
        const { user } = this.props;

        if (!user) return null;

        return (
            <>
                <Row className="ml-5">
                    <Col sm="8">
                        <Card>
                            <CardBody>
                                <div className="header-profile-sidebar">
                                    <div className="avatar">
                                        <DisplayImage src={user.imageSrc} height="70" width="70" />
                                    </div>
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
                                            Verified
                                        </div>
                                        {(user.verified)
                                            ? <div className="font-weight-bold text-success">Yes</div>
                                            : <div className="font-weight-bold text-danger">No</div>
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
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> 
                <FormModal small modal={souscriptionModal} toggleModal={this.toggleSouscriptionModal}>
                    <UserSouscriptions userId={user.id} />
                </FormModal>
            </> 
        )
    }
}

export default UserDetails
