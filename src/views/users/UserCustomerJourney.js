import React from "react";
import {Badge, Card, CardBody} from "reactstrap";
import {Check, ShoppingBag} from "react-feather";
import dayjs from "dayjs";

import {getUserCustomerJourney} from "../../redux/actions/IndependentActions";

class UserCustomerJourney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            currentLevelName: "",
            passedAvailableCredits: 0,
            userId: "",
            creationDate: "",
            actualLevel: 0,
            levels: [],
        }
    }

    componentDidMount() {
        this.loadUserCustomerJourney();
    }

    loadUserCustomerJourney = () => {
        // Init request
        this.setState({ loading: true, error: null, data: [] });
        getUserCustomerJourney(this.props?.userId)
            .then(data => {
                const currentLevelName = data?.currentLevelName;
                const passedAvailableCredits = data?.passedAvailableCredits;
                const userId = data?.customerJourney?.userId;
                const creationDate = data?.customerJourney?.creationDate;
                const actualLevel = data?.customerJourney?.actualLevel;
                const levels = data?.customerJourney?.levels;

                this.setState({ userId, creationDate, actualLevel, levels, currentLevelName, passedAvailableCredits });
            })
            .catch(() => this.setState({
                currentLevelName: "",
                passedAvailableCredits: 0,
                userId: "",
                creationDate: "",
                actualLevel: 0,
                levels: [],
            }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const {currentLevelName, passedAvailableCredits, userId, creationDate, actualLevel, levels} = this.state;

        const colors = ["primary", "danger", "secondary", "warning", "success", "info"];

        return (
            <>
                <h3 className="text-center text-primary font-weight-bold">Parcours du Célibataire</h3>

                <div className="mt-2">
                    Niveau actuel
                    <Badge color="light-primary" className="ml-50 badge-pill font-weight-bold">
                        {currentLevelName}
                    </Badge>
                </div>
                <div className="mt-50 mb-2">
                    Date de début: <strong className="text-primary">{creationDate}</strong><br/>
                    Crédits restant: <strong className="text-primary">{passedAvailableCredits}</strong>
                </div>

                {levels.map((level, index) => {
                    const color = colors[index];

                    return (
                        <Card className={`bg-${color} text-white`} key={index}>
                            <CardBody>
                                <h4 className="text-white font-weight-bold">{level?.name}</h4>
                                <span className="text-dark">
                                    Commencé le <b>{dayjs(level?.startedAt).format("YYYY-MM-DD HH:mm")}</b>
                                </span>

                                <ul className="activity-timeline timeline-left list-unstyled mt-3">
                                    {level?.credits.map((credit, index2) => {
                                        const done = !!credit?.requiredActionDone;
                                        const action = credit?.requiredActionLocalization?.localizations[0]?.requiredAction;
                                        const message = credit?.requiredActionLocalization?.localizations[0]?.requiredActionMessage;

                                        return (
                                            <li className="pb-1" key={index2}>
                                                <div className="float-right">
                                                    <Badge className={`badge-pill font-weight-bold text-${color} bg-white px-1`}>
                                                        <span className="font-medium-1 mr-50">
                                                            {credit?.creditCount}
                                                        </span>
                                                        <ShoppingBag size={20} />
                                                    </Badge>
                                                </div>
                                                <div className={`timeline-icon bg-white text-${done ? color : "white"}`}>
                                                    <Check size={20} />
                                                </div>
                                                <div className="timeline-info">
                                                    <p className="font-weight-bold mb-0">{action}</p>
                                                    <span className="text-dark">
                                                        {message.split('\n').map(str => {
                                                            return (
                                                                <span>{str} <br/></span>
                                                            );
                                                        })}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </CardBody>
                        </Card>
                    );
                })}
            </>
        )
    }
}

export default UserCustomerJourney;
