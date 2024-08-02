import React from "react";
import * as Icon from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar";
import {Button, Card, Spinner, Input, Form} from "reactstrap";

import Error500 from "../Error500";
import User from "../../models/User";
import ImageSidebarItem from "../verifications/ImageSidebarItem";
import {imageExistsStepByStep} from "../../helpers/helpers";
import {
    getUserStatus,
    getUserProfile,
    getUserAppData,
    getUserIdentity,
    getOldUserImages,
    getUserProfileImage,
    getUserSuspiciousState,
    getSearchFilter, getUserLifeStyle
} from "../../redux/actions/IndependentActions";

class ImageSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            all_images: [],
            users: [],
            toVerify: 0,
            loading: false,
            search: ""
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        // Init request
        this.setState({ loading: true, error: null, users: [], all_images: [], search: "" });
        this.props.handleActiveChat(null, null);
        this.props.handleResetImage();

        getOldUserImages()
            .then(res => {
                this.setState({all_images: res, toVerify: res.length});

                let users = res.reduce(function(results, org) {
                    results[org.userId] = [...results[org.userId] || [], org];
                    return results;
                }, {})

                const buildUsers = [];

                for(const user of Object.values(users)) {
                    buildUsers.push(user);
                }

                this.setState({ users: buildUsers }, async () => {
                    for(const userImage of buildUsers) {
                        // Async user data
                        if(userImage != null){
                            await this.loadUserInfo(userImage[0]);
                        }
                    }
                });
            })
            .catch(error => {
                console.log("error ", error);
                this.setState({ error });
            })
            .finally(() => this.setState({ loading: false }));
    };

    loadUserInfo = (feedback) => {
        return new Promise((resolve) => {
            const userId = feedback.userId;
            getUserProfile(userId)
                .then(async data => {
                    const userObject = {...feedback, ...data};
                    userObject.images = this.state.all_images.filter(item => item.userId?.toString() === userId?.toString());
                    // Make user as an object
                    const user = new User(userObject);
                    user.setId = userId;
                    try {
                        user.setStatus = await getUserStatus(user.id);
                        user.setAppData = await getUserAppData(user.id);
                        user.setSearchFilter = await getSearchFilter(user.id);
                        user.setLifeStyle = await getUserLifeStyle(user.id);
                        user.setCertified = await getUserIdentity(user.id);
                        user.setSuspiciousState = await getUserSuspiciousState(user.id);

                        if(!user.isDeleted) {
                            // User profile image
                            const avatar = await getUserProfileImage(userId);
                            user.setAvatar = await imageExistsStepByStep(avatar);
                        } else {
                            this.setState({toVerify: this.state.toVerify - 1});
                        }
                    } catch (e) {}
                    this.updateUsers(user);
                })
                .catch(() => {
                    const userObject = {...feedback, notFound: true};
                    const user = new User(userObject);
                    this.updateUsers(user);
                })
                .finally(() => resolve());
        })
    };

    onClickItem = (user) => {
        const { handleActiveChat, mainSidebar, handleUserSidebar } = this.props;
        mainSidebar(false);
        handleUserSidebar("open");
        handleActiveChat(user.id, user);
    };

    updateUsers = (user) => {
        this.setState((prevState) => {
            const tempusers = prevState.users.map((f) => { 
                if(Array.isArray(f)) {
                    // f !== undefined
                    if(f[0]?.userId?.toString() === user.id?.toString()) {
                        f = user;
                    }
                }
                return f;
            })
            return {users: tempusers};
        });
    };

    handleSearchVerification = (e) => {
        e.preventDefault();
        // Mock to users type 
        const mockUser = new User({userId: this.state.search});
        this.setState({ users: [[mockUser]] }, async () => {
            await this.loadUserInfo(mockUser);
        });
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    render() {
        const { error, loading, users, toVerify } = this.state;
        const { verified } = this.props;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData} />
                </Card>
            )
        }

        return (
            <Card className="sidebar-content h-100">
                <div className="chat-fixed-search h-100">
                    <div className="d-flex align-items-center mb-50">
                        <Button color="primary" className="mr-50 rounded" onClick={this.loadData} size="sm">
                            <Icon.RefreshCcw size={15} /> 
                        </Button>
                    </div>
                    <strong className="text-primary">{verified}</strong> noted image(s) / <strong className="text-primary">{toVerify}</strong> image(s) to note
                </div>
                <PerfectScrollbar className="chat-user-list list-group" options={{wheelPropagation: false}}>
                    {loading ?
                        (
                            <div className="w-100 d-flex align-items-center justify-content-center my-2">
                                <Spinner color="primary"/>
                            </div>
                        ) : (
                            <ul className="chat-users-list-wrapper media-list">
                                {/* First element: search bar */}
                                <li>
                                    <Form className="d-flex mx-auto " onSubmit={this.handleSearchVerification}>
                                        <div className="position-relative">
                                            <Input
                                                type="text"
                                                className="search-width"
                                                placeholder="Search verification by user id..."
                                                onChange={(this.updateSearchInput)}
                                                value={this.state.search}
                                            />
                                            <div className="form-control-position">
                                                <Icon.X size={15} onClick={(this.loadData)} />
                                            </div>
                                        </div>
                                        <div className="ml-1">
                                            <Button size="sm" color="primary" className="rounded" type="submit" title="Search">
                                                <Icon.Search size={20} />
                                            </Button>
                                        </div>
                                    </Form>
                                </li>
                                {/* Search result or users list */}
                                {users.map((user, index) => (
                                    <React.Fragment key={index}>
                                        <ImageSidebarItem
                                            user={user}
                                            onClickItem={this.onClickItem}
                                            activeChatId={this.props.activeChatId}
                                        />
                                    </React.Fragment>
                                ))}
                            </ul> 
                        )
                    }
                </PerfectScrollbar>
            </Card>
        );
    }
}

export default ImageSidebar;
