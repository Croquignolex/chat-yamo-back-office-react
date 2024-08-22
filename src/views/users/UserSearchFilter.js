import React from "react";
import {Table} from "reactstrap";

class UserSearchFilter extends React.Component {

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
                        <td>Gender</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.gender}</td>
                    </tr>
                    <tr>
                        <td>Min Age</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.minAge}</td>
                    </tr>
                    <tr>
                        <td>Max Age</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.maxAge}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.city}</td>
                    </tr>
                    <tr>
                        <td>All cities</td>
                        <td className="font-weight-bold">
                        {(this.props.searchFilter?.allCities)
                            ? <div className="text-success">True</div>
                            : <div className="text-danger">False</div>
                        }
                        </td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.country}</td>
                    </tr>
                    <tr>
                        <td>All countries</td>
                        <td className="font-weight-bold">
                        {(this.props.searchFilter?.allCountries)
                            ? <div className="text-success">True</div>
                            : <div className="text-danger">False</div>
                        }
                        </td>
                    </tr>
                    <tr>
                        <td>Home Country</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.homeCountry}</td>
                    </tr>
                    <tr>
                        <td>Certified</td>
                        <td className="font-weight-bold">
                            {(this.props.searchFilter?.certified)
                                ? <div className="text-success">True</div>
                                : <div className="text-danger">False</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Premium Users</td>
                        <td className="font-weight-bold">
                            {(this.props.searchFilter?.premiumUsers)
                                ? <div className="text-success">True</div>
                                : <div className="text-danger">False</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Looking For</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.lookingFor}</td>
                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.religion}</td>
                    </tr>
                    <tr>
                        <td>Apply age to received likes</td>
                        <td className="font-weight-bold">
                            {(this.props.searchFilter?.applyAgeFilter)
                                ? <div className="text-success">True</div>
                                : <div className="text-danger">False</div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td className="font-weight-bold">{this.props.searchFilter?.language}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default UserSearchFilter;
