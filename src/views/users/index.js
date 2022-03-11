import React from "react";
import * as Icon from "react-feather";

import Error500 from "../Error500";
import User from "../../models/User";
import UserDetails from "./UserDetails";
import {Col, Row, Form, Input, Button, Spinner} from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {getUserProfileImage, searchUser} from "../../redux/actions/IndependentActions";

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
        if(!this.state.search) return;

        this.setState({loading: true, error: null, user: null});
        searchUser(this.state.search)
            .then(async data => {
                const user = new User(data);
                try {
                    if(!user.isDeleted) {
                        // User profile image
                        user.setAvatar = await getUserProfileImage(user.id);
                    }
                } catch (e) {}
                this.setState({ user });
            })
            .catch(error => this.setState({ error }))
            .finally(() => {
                this.setState({loading: false});
            });
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
                        {(this.state.user !== null) && <UserDetails user={this.state.user} />}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Users;
