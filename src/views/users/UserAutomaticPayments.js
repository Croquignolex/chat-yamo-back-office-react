import React from "react";
import {Card, Table, Spinner} from "reactstrap"; 

import Error500 from "../Error500";
import {getUserAutomaticPayments} from "../../redux/actions/IndependentActions";
import AutomaticPayment from "../../models/AutomaticPayment";

class UserAutomaticPayments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            automaticPayments: []
        }
    }

    componentDidMount() {
        this.loadUserSAutomaticPayments();
    }

    loadUserSAutomaticPayments = () => {
        // Init request
        this.setState({ loading: true, error: null, data: [] });
        getUserAutomaticPayments(this.props?.userId)
            .then(data => { 
                const automaticPayments = data?.map(a => new AutomaticPayment(a));
                this.setState({ automaticPayments });
            })
            .catch(() => this.setState({ automaticPayments: [] }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { error, loading, automaticPayments } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadUserSAutomaticPayments} />
                </Card>
            )
        }

        return (
            <Table hover bordered responsive className="mt-2">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>#</th>
                        <th>Subscription Pack</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Period</th>
                        <th>Started at</th>
                        <th>Renewing at</th>
                        <th>Payment Provider</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td className="text-center mt-2" colSpan={4}><Spinner color="primary" /></td></tr> : (
                        automaticPayments.map((automaticPayment, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{automaticPayment.pack}</td>
                                <td>{automaticPayment.currency}</td>
                                <td>{automaticPayment.amount}</td>
                                <td>{automaticPayment.period}</td>
                                <td className="font-weight-bold text-success">{automaticPayment.startDate?.format('YYYY-MM-DD HH:mm')}</td>
                                <td className="font-weight-bold text-danger">{automaticPayment.renewingDate?.format('YYYY-MM-DD HH:mm')}</td>
                                <td>{automaticPayment.source}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        )
    }
}

export default UserAutomaticPayments;
