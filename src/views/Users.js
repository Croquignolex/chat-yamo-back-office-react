import React from "react";
import * as Icon from "react-feather";

import {
    Col,
    Row,
    Card,
    Form,
    Input,
    Media,
    Button,
    CardBody
} from "reactstrap";
import Breadcrumbs from "../components/@vuexy/breadCrumbs/BreadCrumb";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: "",
            error: null,
            user: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        /*this.setState({loading: true});
        const {oldpass, newpass} = data;
        changePassword(oldpass, newpass, this.props.backOfficeUserId)
            .then(() => {
                resetForm({values: ''});
                NotificationManager.success("Password successfully changed, you need to connect back", null, 5000);
                setTimeout(() => {
                    // Redirect to login page after 2 seconds
                    this.props.logoutWithJWT()
                    history.push(AUTH.LOGIN);
                }, 2000);
            })
            .finally(() => {
                this.setState({loading: false});
            });*/
    };

    render() {
        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Users"
                    breadCrumbActive="Search a user"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Form className="form-inline" onSubmit={this.handleSearchConversation}>
                            <Input
                                type="text"
                                className="w-75"
                                placeholder="Search user by phone or email..."
                                onChange={(this.updateSearchInput)}
                                value={this.state.search}
                            />
                            <Button size="sm" color="primary" className="rounded ml-1" type="submit" title="Search">
                                <Icon.Search size={20} />
                            </Button>
                        </Form>
                    </Col>
                    {(this.state.user !== null) && (
                        <Col>
                            <Card>
                                <CardBody>
                                    user data
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                    {(this.state.loading) && (
                        <Col>
                            <Card>
                                <CardBody>
                                    user data
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                    {(this.state.error !== null) && (
                        <Col>
                            <Card>
                                <CardBody>
                                    error data
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </>
        )
    }
}

export default Users;
