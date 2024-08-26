import React from "react";
import {Table} from "reactstrap";

class UserCustomerJourney extends React.Component {

    render() {
        return (
            <Table hover bordered responsive className="mt-2">
                <thead className="bg-success text-white">
                <tr>
                    <th>DATA</th>
                    <th>VALUE</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Current Level</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.currentLevelName}</td>
                    </tr>
                    <tr>
                        <td>Current Level used Credits</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.currentLevelUsedCredits}</td>
                    </tr>
                    <tr>
                        <td>Current Level total Credits</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.currentLevelTotalCredits}</td>
                    </tr>
                    <tr>
                        <td>Current Level Activation Date</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.currentLevelActivationDate}</td>
                    </tr>
                    <tr>
                        <td>Total used credits</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.totalUsedCredits}</td>
                    </tr>
                    <tr>
                        <td>Total Credits</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.totalCredits}</td>
                    </tr>
                    <tr>
                        <td>Passed Levels</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.passedLevels}</td>
                    </tr>
                    <tr>
                        <td>Activation Date</td>
                        <td className="font-weight-bold">{this.props.customerJourney?.activationDate}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default UserCustomerJourney;
