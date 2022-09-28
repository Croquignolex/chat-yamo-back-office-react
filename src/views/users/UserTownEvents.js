import dayjs from "dayjs";
import * as Icon from "react-feather";
import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {Card, FormGroup, Spinner, Form, Button, Input, Label} from "reactstrap"; 

import Error500 from "../Error500";   
import {checkTownEvent} from "../../redux/actions/IndependentActions"; 

import "react-datepicker/dist/react-datepicker.css";

class UserTownEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            answer: null,
            selectedDate: new Date(),
            date: dayjs().format("YYYY-MM-DD")
        }
    }
 
    handleSelectedDate = (selectedDate) => { 
        const date = dayjs(selectedDate).format("YYYY-MM-DD"); 
        this.setState({selectedDate, date});
    }; 

    handleCheck = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true});
        checkTownEvent(this.props.userId, this.state.date)
            .then((data) => this.setState({ answer: data?.verified }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({loading: false}));
        
    };

    render() {

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup> 
                <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value} /> 
            </FormGroup> 
        ));

        const { error, loading, answer, selectedDate } = this.state; 

        return (
            <>
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
            </>
        )
    }
}

export default UserTownEvents;
