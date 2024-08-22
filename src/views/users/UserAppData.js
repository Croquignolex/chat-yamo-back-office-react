import React from "react";
import {Table} from "reactstrap";

class UserAppData extends React.Component {

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
                        <td>Status</td>
                        <td className="font-weight-bold">{this.props.appData?.status}</td>
                    </tr>
                    <tr>
                        <td>Device Type</td>
                        <td className="font-weight-bold">{this.props.appData?.deviceType}</td>
                    </tr>
                    <tr>
                        <td>Language Code</td>
                        <td className="font-weight-bold">{this.props.appData?.languageCode}</td>
                    </tr>
                    <tr>
                        <td>App Version</td>
                        <td className="font-weight-bold">{this.props.appData?.appVersion}</td>
                    </tr>
                    <tr>
                        <td>Release</td>
                        <td className="font-weight-bold">{this.props.appData?.release}</td>
                    </tr>
                    <tr>
                        <td>SDK</td>
                        <td className="font-weight-bold">{this.props.appData?.sdkInt}</td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td className="font-weight-bold">{this.props.appData?.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Model</td>
                        <td className="font-weight-bold">{this.props.appData?.model}</td>
                    </tr>
                    <tr>
                        <td>Hardware</td>
                        <td className="font-weight-bold">{this.props.appData?.hardware}</td>
                    </tr>
                    <tr>
                        <td>Device</td>
                        <td className="font-weight-bold">{this.props.appData?.device}</td>
                    </tr>
                    <tr>
                        <td>Device Consistent ID</td>
                        <td className="font-weight-bold">{this.props.appData?.deviceConsistentId}</td>
                    </tr>
                    <tr>
                        <td>Device Country ISO Code</td>
                        <td className="font-weight-bold">{this.props.appData?.deviceCountryIsoCode}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default UserAppData;
