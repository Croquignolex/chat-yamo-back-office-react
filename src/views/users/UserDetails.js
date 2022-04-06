import React from "react";

import "../../assets/scss/pages/users.scss";
import {Row, Col, CardBody, Card, Spinner, Button} from "reactstrap";
import DisplayImage from "../../components/DisplayImage";
import {getUserMetaData} from "../../redux/actions/IndependentActions";
import MetaData from "../../models/MetaData";
import Error500 from "../Error500";

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Metadata state
            show: false,
            error: null,
            loading: false,
            metaData: null,
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

    render() {

        const { metaData } = this.state;
        const { user } = this.props;

        if (!user) return null;

        return (
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
                                    <div className="mb-2">
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
                                        {/*<div className="d-flex user-info">
                                            <div className="user-info-title font-weight-bold">
                                                Created at
                                            </div>
                                            <div className="text-primary font-weight-bold">
                                                {metaData.createdDate?.format('LL')}
                                            </div>
                                        </div>*/}
                                    </div>
                                )}
                                <div className="text-center">
                                    {(this.state.loading) ? <Spinner color="primary" /> : (
                                        (!this.state.show) && (
                                            <Button color="primary" onClick={this.handleShowMetaData}>
                                                Show private data
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default UserDetails
