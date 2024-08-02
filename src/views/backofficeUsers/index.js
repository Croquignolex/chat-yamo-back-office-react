import React from "react";
import {connect} from "react-redux";
import * as Icon from "react-feather";
import {Badge, Button, Card, CardBody, Col, Row, Spinner, Table} from "reactstrap";

import Error500 from "../Error500";
import NewBackofficeUser from "./new";
import FormModal from "../../components/FormModal";
import ConfirmModal from "../../components/ConfirmModal";
import BackofficeUser from "../../models/BackofficeUser";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {deleteBackofficeUser, getBackofficeUsers, getAllRoles} from "../../redux/actions/IndependentActions";

class BackofficeUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            itemAction: "", 
            listLoading: true,
            backofficeUsers: [],
            newModal: {show: false, title: ""},
            deleteModal: {show: false, title: "", body: "", data: ""},
            editModal: {},
            allRoles: []
        }
    }

    componentDidMount() {
        this.loadBackofficeUsers();
    }

    loadBackofficeUsers = () => {
        // Init request
        this.setState({ listLoading: true, error: null, backofficeUsers: [], allRoles: [] });

        getAllRoles()
            .then(data => {
                const allRoles = data.roles.map((role) => {
                    return {
                        label: role,
                        value: role,
                        color: "#" + Math.floor(Math.random()*16777215).toString(16),
                    }
                });
                this.setState({ allRoles });

                getBackofficeUsers(this.props?.backOfficeUserId)
                    .then(data => {
                        const backofficeUsers = data?.map(u => new BackofficeUser(u));
                        // Set backofficeUsers
                        this.setState({ backofficeUsers });
                    })
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ listLoading: false }));
    };
 
    toggleNewModal = () => {
        const {newModal} = this.state;
        if(newModal.show) this.setState({newModal: {...newModal, show: false}});
        else this.setState({newModal: {show: true, title: "New backoffice user"}});
    };

    toggleDeleteModal = (item) => {
        const {deleteModal} = this.state;
        if(deleteModal.show) this.setState({deleteModal: {...deleteModal, show: false}});
        else {
            this.setState({deleteModal: {
                ...deleteModal,
                    show: true,
                    data: item,
                    title: `Suppression`,
                    body: `Confirmer la suppression du compte de ${item?.firstName}?`
            }});
        }
    };

    handleCompleted = (data) => {
        this.setState((prevState) => {
            const backofficeUsers = prevState.backofficeUsers;
            backofficeUsers.push(data);
            return {backofficeUsers};
        });
        this.toggleNewModal();
    };

    handleDelete = (item) => {
        this.toggleDeleteModal();
        this.setState({itemAction: item.id});
        deleteBackofficeUser(this.props?.backOfficeUserId, item.id)
            .then(() => {
                this.setState((prevState) => {
                    const backofficeUsers = prevState.backofficeUsers.filter((user) => user.id !== item.id);
                    return {backofficeUsers};
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({itemAction: ""}));
    };

    canHandleActionButtons = (currentUser) => {
        const {backOfficeUserId, backOfficeUserRoles} = this.props;
        return (backOfficeUserRoles.includes('admin')) && (currentUser.id !== backOfficeUserId);
    };

    render() {

        const { backofficeUsers, allRoles, error, listLoading, itemAction, newModal, deleteModal } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData} />
                </Card>
            )
        }

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Backoffice Users"
                    breadCrumbActive="Backoffice Users"
                />
                <Card>
                    <CardBody>
                        <Row className="pt-1">
                            <Col sm="12"> 
                                <Button color="primary" onClick={this.toggleNewModal}>
                                    Add backoffice user
                                </Button>
                                <Table hover bordered responsive className="mt-2">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th>#</th>
                                            <th>USERNAME</th>
                                            <th>FIRST NAME</th>
                                            <th>LAST NAME</th>
                                            <th>ROLES</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {listLoading ? <tr><td className="text-center mt-2" colSpan={6}><Spinner color="primary" /></td></tr> : (
                                        backofficeUsers.map((backofficeUser, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td className="font-weight-bold">{backofficeUser.username}</td>
                                                <td>{backofficeUser.firstName}</td>
                                                <td>{backofficeUser.lastName}</td>
                                                <td>
                                                    {
                                                        backofficeUser.roles.map((role) => {
                                                            const needleRole = allRoles.find((item) => item.value === role);
                                                            return needleRole
                                                                ? (
                                                                    <Badge style={{backgroundColor: needleRole.color}} key={role} className="mr-50">
                                                                        {role}
                                                                    </Badge>
                                                                )
                                                                : (
                                                                    <Badge color="secondary" key={role} className="mr-50">
                                                                        {role}
                                                                    </Badge>
                                                                )
                                                        })
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    {(itemAction === backofficeUser.id)
                                                        ? <Spinner color="primary" />
                                                        : (this.canHandleActionButtons(backofficeUser)) && (
                                                            <>
                                                                {/*<Button color="warning" className="rounded mr-50 mt-50" size="sm">
                                                                    <Icon.Edit size={15} />
                                                                </Button>*/}
                                                                <Button color="danger"
                                                                        className="rounded mr-50 mt-50"
                                                                        size="sm"
                                                                        onClick={() => this.toggleDeleteModal(backofficeUser)}
                                                                >
                                                                    <Icon.Trash size={15} />
                                                                </Button>
                                                            </>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <ConfirmModal
                    small
                    danger
                    modal={deleteModal}
                    handleModal={this.handleDelete}
                    toggleModal={this.toggleDeleteModal}
                />
                <FormModal small modal={newModal} toggleModal={this.toggleNewModal}>
                    <NewBackofficeUser
                        handleCompleted={this.handleCompleted}
                        backOfficeUserId={this.props?.backOfficeUserId}
                        allRoles={allRoles}
                    />
                </FormModal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        backOfficeUserId: state.authUser?.data?.entityId,
        backOfficeUserRoles: state.authUser?.data?.roles,
    }
};

export default connect(mapStateToProps)(BackofficeUsers)
