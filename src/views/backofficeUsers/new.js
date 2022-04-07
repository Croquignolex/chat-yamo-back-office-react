import React from "react";

import Error500 from "../Error500";
import {connect} from "react-redux";
import * as Icon from "react-feather";
import BackofficeUser from "../../models/BackofficeUser";
import {Badge, Button, Card, CardBody, Col, Row, Spinner, Table} from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {deleteBackofficeUser, getBackofficeUsers} from "../../redux/actions/IndependentActions";
import ConfirmModal from "../../components/ConfirmModal";
import FormModal from "../../components/FormModal";

class NewBackofficeUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
        }
    }

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

    render() {

        const { backofficeUsers, error, listLoading, addLoading, itemAction, deleteModal } = this.state;

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
                                {(addLoading) ? <Spinner color="primary" /> : (
                                    <Button color="primary" onClick={this.toggleNewModal}>
                                        Add backoffice user
                                    </Button>
                                )}
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
                                                    {backofficeUser.getRoles.map((role) => (
                                                        <Badge color={role.color} pill key={role.text}>
                                                            {role.text}
                                                        </Badge>
                                                    ))}
                                                </td>
                                                <td className="text-center">
                                                    {(itemAction === backofficeUser.id)
                                                        ? <Spinner color="primary" />
                                                        : (this.canHandleActionButtons(backofficeUser)) && (
                                                            <>
                                                                <Button color="warning" className="rounded mr-50" size="sm">
                                                                    <Icon.Edit size={15} />
                                                                </Button>
                                                                <Button color="danger"
                                                                        className="rounded"
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
            </>
        )
    }
}

export default NewBackofficeUser;
