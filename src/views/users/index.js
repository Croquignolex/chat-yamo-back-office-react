import React from "react";
import * as Icon from "react-feather";

import User from "./User";
import Error500 from "../Error500";
import {Col, Row, Form, Input, Button, Spinner} from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: "",
            error: null,
            user: "null"
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
        const activeUser = {
            isPremium: true,
            verified: true,
            age: 50,
            gender: "Female",
            city: "Douala",
            province: "Douala",
            country: "Douala",
            homeCountry: "Douala",
            name: "Douala",
            id: "7",
        }

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Users"
                    breadCrumbActive="Search a user"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Form className="form-inline mb-2" onSubmit={this.handleSearchConversation}>
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
                        {(this.state.loading) && <Spinner color="primary" />}
                        {(this.state.error !== null) && <Error500 refresh={false} />}
                        {(this.state.user !== null) && <User user={activeUser} />}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Users;
