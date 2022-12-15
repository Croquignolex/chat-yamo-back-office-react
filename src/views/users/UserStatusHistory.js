import React from "react";
import {Card, Table, Spinner} from "reactstrap";

import Error500 from "../Error500";
import History from "../../models/History";
import {getUserStatusHistory} from "../../redux/actions/IndependentActions";

class UserStatusHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            history: []
        }
    }

    componentDidMount() {
        this.loadUserStatusHistory();
    }

    loadUserStatusHistory = () => {
        // Init request
        this.setState({ loading: true, error: null, data: [] });
        getUserStatusHistory(this.props?.userId)
            .then(data => {
                const history = data?.map(s => new History(s));
                this.setState({ history });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { error, loading, history } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadUserStatusHistory} />
                </Card>
            )
        }

        return (
            <Table hover bordered responsive className="mt-2">
                <thead className="bg-primary text-white">
                <tr>
                    <th>#</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>NOTE</th>
                </tr>
                </thead>
                <tbody>
                {loading ? <tr><td className="text-center mt-2" colSpan={4}><Spinner color="primary" /></td></tr> : (
                    history.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.date}</td>
                            <td>{item.status}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        )
    }
}

export default UserStatusHistory;
