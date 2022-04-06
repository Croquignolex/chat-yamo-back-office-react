import React from "react";

import Error500 from "../Error500";
import {connect} from "react-redux";
import * as Icon from "react-feather";
import BackofficeUser from "../../models/BackofficeUser";
import {Button, Card, CardBody, Col, Row, Table} from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {getBackofficeUsers} from "../../redux/actions/IndependentActions";

class BackofficeUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            backofficeUsers: []
        }
    }

    componentDidMount() {
        this.loadBackofficeUsers();
    }

    loadBackofficeUsers = () => {
        // Init request
        this.setState({ loading: true, error: null, users: [] });
        getBackofficeUsers(this.props?.backOfficeUserId)
            .then(data => {
                const backofficeUsers = data?.map(u => new BackofficeUser(u));
                // Set backofficeUsers
                this.setState({ backofficeUsers });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { backofficeUsers, error, loading } = this.state;

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
                                <Button color="primary" className="mb-2">
                                    Add backoffice user
                                </Button>
                                <Table hover bordered responsive>
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
                                    {backofficeUsers.map((backofficeUser, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td className="font-weight-bold">{backofficeUser.username}</td>
                                            <td>{backofficeUser.firstName}</td>
                                            <td>{backofficeUser.lastName}</td>
                                            <td>{backofficeUser.username}</td>
                                            <td className="text-center">
                                                <Button color="warning" className="rounded mr-50" size="sm">
                                                    <Icon.Edit size={15} />
                                                </Button>
                                                <Button color="danger" className="rounded" size="sm">
                                                    <Icon.Trash size={15} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
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

const mapStateToProps = state => {
    return {
        backOfficeUserId: state.authUser?.data?.entityId,
    }
};

export default connect(mapStateToProps)(BackofficeUsers)
