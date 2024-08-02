import React from "react";
import * as Icon from "react-feather";

import Error500 from "../Error500";
import User from "../../models/User";
import UserDetails from "../users/UserDetails";
import {imageExistsStepByStep} from "../../helpers/helpers";
import UserImagesDetails from "./UserImagesDetails";
import {Col, Row, Form, Input, Button, Spinner} from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
    getUserStatus,
    getUserAppData,
    getUserProfile,
    getUserIdentity,
    searchUserImages,
    getUserProfileImage,
    getUserSuspiciousState,
    getSearchFilter, getUserLifeStyle
} from "../../redux/actions/IndependentActions";

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
            .then(async data => {
                const exitingImages = [];

                for(const image of (data || [])) {
                    try {
                        image.chosenUrl = await imageExistsStepByStep(image);
                        image.chosenUrl && exitingImages.push(image);
                    } catch (e) {}
                }

                this.setState({ images: exitingImages });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({loading: false}));

        getUserProfile(search)
            .then(async data => {
                // Make user as an object
                const user = new User(data);
                user.setId = search;
                try {
                    user.setStatus = await getUserStatus(user.id);
                    user.setAppData = await getUserAppData(user.id);
                    user.setSearchFilter = await getSearchFilter(user.id);
                    user.setLifeStyle = await getUserLifeStyle(user.id);
                    user.setCertified = await getUserIdentity(user.id);
                    user.setSuspiciousState = await getUserSuspiciousState(user.id);

                    if(!user.isDeleted) {
                        // User profile image
                        const avatar = await getUserProfileImage(search);
                        user.setAvatar = await imageExistsStepByStep(avatar);
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
                                    <UserDetails user={this.state.user} />
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
