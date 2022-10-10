import dayjs from "dayjs"; 
import * as Icon from "react-feather";
import React, {forwardRef} from "react";
import DatePicker from "react-datepicker"; 

import Error500 from "../Error500";   
import {checkTownEvent} from "../../redux/actions/IndependentActions"; 
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";  
import {Col, Row, Form, Input, Button, Spinner, FormGroup, Label, Card} from "reactstrap";
 
import "react-datepicker/dist/react-datepicker.css";

class TownEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: "",
            error: null,
            answer: null,
            selectedDate: new Date(),
            date: dayjs().format("YYYY-MM-DD")
        }
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    handleSelectedDate = (selectedDate) => { 
        const date = dayjs(selectedDate).format("YYYY-MM-DD"); 
        this.setState({selectedDate, date});
    }; 
 
    handleCheck = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true});
        checkTownEvent(this.state.search, this.state.date)
            .then((data) => this.setState({ answer: data?.verified }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({loading: false}));
        
    };

    render() {

        const {error, loading, search, selectedDate, answer} = this.state;

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup> 
                <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/> 
            </FormGroup> 
        ));

        return ( 
            <>
                <Breadcrumbs
                    breadCrumbTitle="Town-events"
                    breadCrumbActive="Check a user town-event"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Label className="mt-2">Choose a date</Label>
                        <Form className="d-flex mx-auto" onSubmit={this.handleCheck}>
                            <div className="position-relative">
                                <DatePicker 
                                    calendarStartDay={1}
                                    selected={selectedDate}  
                                    dateFormat="yyyy/MM/dd" 
                                    customInput={<CustomInput />}
                                    onChange={this.handleSelectedDate} 
                                /> 
                            </div>
                            <div className="position-relative ml-1">
                                <Input
                                    type="text" 
                                    value={search} 
                                    placeholder="Enter user id..."
                                    onChange={(this.updateSearchInput)} 
                                /> 
                            </div>
                            <div className="ml-1">
                                {(!loading) && (
                                    <Button color="primary" className="rounded" type="submit">
                                        Check
                                    </Button>
                                )}
                            </div>
                        </Form>
                        <hr/>
                        <div className="mt-50 text-center"> 
                            {(loading) ? <Spinner color="primary" /> : (
                                (answer !== null) && (
                                    (answer || answer === 'true') 
                                        ? <Icon.Check size={40} className="text-success" /> 
                                        : <Icon.X size={40} className="text-danger" /> 

                                )  
                            )} 
                            {(error) && (
                                <Card className="sidebar-content h-100">
                                    <Error500 refresh={false} />
                                </Card>
                            )}
                        </div> 
                    </Col>
                </Row>
            </>
        )
    }
}

export default TownEvents;
