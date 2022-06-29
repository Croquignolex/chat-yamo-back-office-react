import React from "react";
import {Card, Table, Spinner} from "reactstrap"; 

import Error500 from "../Error500"; 
import Souscriptions from "../../models/Souscriptions";
import {getUserSouscriptions} from "../../redux/actions/IndependentActions";

class UserSouscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            souscriptions: []
        }
    }

    componentDidMount() {
        this.loadUserSouscriptions();
    }

    loadUserSouscriptions = () => {
        // Init request
        this.setState({ loading: true, error: null, data: [] });
        getUserSouscriptions(this.props?.userId)
            .then(data => { 
                const souscriptions = data?.map(s => new Souscriptions(s));
                this.setState({ souscriptions });
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { error, loading, souscriptions } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadUserSouscriptions} />
                </Card>
            )
        }

        return (
            <Table hover bordered responsive className="mt-2">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>#</th>
                        <th>TYPE</th>
                        <th>START</th>
                        <th>END</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td className="text-center mt-2" colSpan={4}><Spinner color="primary" /></td></tr> : (
                        souscriptions.map((souscription, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{souscription.type}</td>
                                <td className="font-weight-bold text-success">{souscription.startDate?.format('LL')}</td>
                                <td className="font-weight-bold text-danger">{souscription.endDate?.format('LL')}</td> 
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        )
    }
}

export default UserSouscriptions;
