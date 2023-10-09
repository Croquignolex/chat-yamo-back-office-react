import React from "react";
import * as Icon from "react-feather";

import Error500 from "../Error500";
import {exportsBlacklist} from "../../redux/actions/IndependentActions";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";  
import {Col, Row, Form, Input, Button, Spinner, Label, Card} from "reactstrap";
 
import "react-datepicker/dist/react-datepicker.css";

class TownEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            answer: null,
            reason: "",
            phone: "",
        }
    }

    updateReasonInput = (e) => {
        const reason = e?.target?.value;
        this.setState({reason})
    };

    updatePhoneInput = (e) => {
        const phone = e?.target?.value;
        this.setState({phone})
    };

    handleBlacklist = (e) => {
        e.preventDefault();
        const {reason, phone} = this.state;

        if(reason !== "" && phone !== "") {
            // Reset error data
            this.setState({loading: true, error: null, answer: null});

            exportsBlacklist(phone, reason)
                .then(() => {
                    const message = "Phone number successfully blacklisted into exports";
                    this.setState({answer: {message, flag: true}, reason: "", phone: ""});
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}));
        } else {
            const message = "Some fields are empty";
            this.setState({answer: {message, flag: false}});
        }
    };

    render() {

        const {error, loading, answer, reason, phone} = this.state;
// console.log({error}, error?.response.status)
        return ( 
            <>
                <Breadcrumbs
                    breadCrumbTitle="Exports blacklist"
                    breadCrumbActive="Blacklist a user on exprts"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Form className="d-flex mx-auto" onSubmit={this.handleBlacklist}>
                            <div className="w-50 ml-1">
                                <Label>Enter user phone number</Label>
                                <Input
                                    type="text" 
                                    value={phone}
                                    placeholder="Enter user phone number..."
                                    onChange={(this.updatePhoneInput)}
                                /> 
                            </div>
                            <div className="w-50 ml-1">
                                <Label>Enter the reason</Label>
                                <Input
                                    type="text"
                                    value={reason}
                                    placeholder="Enter the reason..."
                                    onChange={(this.updateReasonInput)}
                                />
                            </div>
                            <div className="ml-1">
                                {(!loading) && (
                                    <Button color="primary" className="rounded mt-1" type="submit">
                                        Blacklist
                                    </Button>
                                )}
                            </div>
                        </Form>
                        <hr/>
                        <div className="mt-50 text-center"> 
                            {(loading) ? <Spinner color="primary" /> : (
                                (answer !== null) && (
                                    (answer.flag) ? (
                                        <div className="text-success">
                                            <Icon.Check size={30} />
                                            {answer.message}
                                        </div>
                                    ) : (
                                        <div className="text-warning">
                                            <Icon.AlertTriangle size={20} />
                                            {answer.message}
                                        </div>
                                    )
                                )
                            )} 
                            {(error) && (
                                <>
                                    {((error?.response.status) === 404) && (
                                        <div className="text-danger">
                                            <Icon.X size={30} />
                                            Le numéro à blacklister ne correspond pas à celui d'un utilisateur
                                        </div>
                                    )}
                                    <Card className="sidebar-content h-100">
                                        <Error500 refresh={false} />
                                    </Card>
                                </>
                            )}
                        </div> 
                    </Col>
                </Row>
            </>
        )
    }
}

export default TownEvents;
