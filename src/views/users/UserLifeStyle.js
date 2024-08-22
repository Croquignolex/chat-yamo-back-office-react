import React from "react";
import {Table} from "reactstrap";

class UserLifeStyle extends React.Component {

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
                        <td>Size</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.size}</td>
                    </tr>
                    <tr>
                        <td>Shape</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.shape}</td>
                    </tr>
                    <tr>
                        <td>Way Of Living</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.wayOfLiving}</td>
                    </tr>
                    <tr>
                        <td>Activity</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.activity}</td>
                    </tr>
                    <tr>
                        <td>Level Of Education</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.levelOfEducation}</td>
                    </tr>
                    <tr>
                        <td>Children Number</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.childrenNumber}</td>
                    </tr>
                    <tr>
                        <td>Looking For</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.lookingFor}</td>
                    </tr>
                    <tr>
                        <td>Smoking Level</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.smokingLevel}</td>
                    </tr>
                    <tr>
                        <td>Alcohol Level</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.alcoholLevel}</td>
                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.religion}</td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.language}</td>
                    </tr>
                    <tr>
                        <td>Music Genre</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.musicGenre}</td>
                    </tr>
                    <tr>
                        <td>First Date Be Like</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.firstDateBeLike}</td>
                    </tr>
                    <tr>
                        <td>Following Dates Be Like</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.followingDatesBeLike}</td>
                    </tr>
                    <tr>
                        <td>Kiss Metric</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.kissMetric}</td>
                    </tr>
                    <tr>
                        <td>About Future</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.aboutFuture}</td>
                    </tr>
                    <tr>
                        <td>Social Mood</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.socialMood}</td>
                    </tr>
                    <tr>
                        <td>Children</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.children}</td>
                    </tr>
                    <tr>
                        <td>Travels</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.travels}</td>
                    </tr>
                    <tr>
                        <td>Countries Visited</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.countriesVisited}</td>
                    </tr>
                    <tr>
                        <td>Next Country To Visit</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.nextCountryToVisit}</td>
                    </tr>
                    <tr>
                        <td>Interests</td>
                        <td className="font-weight-bold">{this.props.lifeStyle?.interests}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default UserLifeStyle;
