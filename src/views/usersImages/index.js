import React from "react";
import * as Icon from "react-feather";

import Error500 from "../Error500";
import UserDetails from "../users/UserDetails";
import UserImagesDetails from "./UserImagesDetails";
import {Col, Row, Form, Input, Button, Spinner} from "reactstrap";
import {
    getUserBlockStatus,
    getUserProfile,
    getUserProfileImage,
    searchUserImages
} from "../../redux/actions/IndependentActions";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import User from "../../models/User";

class UsersImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: "",
            error: null,
            images: null,
            user: null,
        }
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    handleSearchImages = (e) => {
        e.preventDefault();
        const {search} = this.state;

        if(!search) return;

        this.setState({loading: true, error: null, user: null, images: null});

        searchUserImages(search)
            .then(data => {
                this.setState({ images: data });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({loading: false}));

        getUserProfile(search)
            .then(async data => {
                // Make user as an object
                const user = new User(data);
                user.setId = search;
                // User block status
                user.setStatus = await getUserBlockStatus(search);
                try {
                    if(!user.isDeleted) {
                        // User profile image
                        user.setAvatar = await getUserProfileImage(search);
                    }
                } catch (e) {}
                this.setState({ user })
            })
    };

    render() {
        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="User images"
                    breadCrumbActive="Search a user images"
                />
                <Row>
                    <Col lg={12} sm={12}>
                        <Form className="form-inline mb-2" onSubmit={this.handleSearchImages}>
                            <Input
                                type="text"
                                className="w-75"
                                placeholder="Search user images by user id..."
                                onChange={(this.updateSearchInput)}
                                value={this.state.search}
                            />
                            <Button size="sm" color="primary" className="rounded ml-1" type="submit" title="Search">
                                <Icon.Search size={20} />
                            </Button>
                        </Form>
                        {(this.state.loading) && <Spinner color="primary" />}
                        {(this.state.error !== null) && <Error500 refresh={false} />}
                        <Row>
                            {(this.state.images !== null) && (
                                <Col lg={7} sm={6}>
                                    <UserImagesDetails images={this.state.images} />
                                </Col>
                            )}
                            {(this.state.user !== null && this.state.error === null) && (
                                <Col lg={5} sm={6}>
                                    <UserDetails user={this.state.user} simplify />
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default UsersImages;
