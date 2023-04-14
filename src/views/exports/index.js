import dayjs from "dayjs";
import Select from 'react-select';
import * as Icon from "react-feather";
import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";

import Error500 from "../Error500";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {Col, Row, Form, Input, Button, Spinner, FormGroup, Label, Card} from "reactstrap";
import {exportDeletedUsers, exportNewUsers, exportSubscriptions} from "../../redux/actions/IndependentActions";

import "react-datepicker/dist/react-datepicker.css";
import {downloadFile} from "../../helpers/helpers";

class Exports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            data: null,
            range: true,
            selectedStartDate: new Date(),
            startDate: dayjs().format("YYYY-MM-DD"),
            selectedEndDate: new Date(),
            endDate: dayjs().format("YYYY-MM-DD"),
            type: {label: 'Sub reminder', value: 'sub_reminder'}
        }
    }

    updateTypeSelect = (type) => {
        if(type.value === "del_users") this.setState({type, range: false});
        else this.setState({type, range: true});
    };

    handleSelectedStartDate = (selectedStartDate) => {
        let startDate;

        if(this.state.range) {
            startDate = dayjs(selectedStartDate).format("YYYY-MM-DD");
        } else {
            startDate = dayjs(selectedStartDate).format("YYYY-MM");
        }

        this.setState({selectedStartDate, startDate});
    };

    handleSelectedEndDate = (selectedEndDate) => {
        const endDate = dayjs(selectedEndDate).format("YYYY-MM-DD");
        this.setState({selectedEndDate, endDate});
    };

    handleExport = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true, data: null});

        const {type, startDate, endDate, selectedStartDate} = this.state;

        if(type.value === "sub_reminder")
        {
            exportSubscriptions(startDate, endDate)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `premium_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => this.setState({ error }));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else if(type.value === "del_users")
        {
            exportDeletedUsers(startDate)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `deleted_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => this.setState({ error }));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else if(type.value === "new_users")
        {
            exportNewUsers(startDate, endDate)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `new_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => this.setState({ error }));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else this.setState({ error: "No type selected" });
    };

    render() {

        const {error, loading, type, data, range, selectedStartDate, selectedEndDate} = this.state;

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup>
                <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/>
            </FormGroup>
        ));

        const selectItems = [
            {label: 'Sub reminder', value: 'sub_reminder'},
            {label: 'Delete users', value: 'del_users'},
            {label: 'New users', value: 'new_users'},
        ];

        const now = new Date();

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Exports"
                    breadCrumbActive="Chooses data to export"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Form className="d-flex mx-auto" onSubmit={this.handleExport}>
                            <div className="w-25">
                                <Label>Choose data type</Label>
                                <Select
                                    value={type}
                                    options={selectItems}
                                    onChange={this.updateTypeSelect}
                                />
                            </div>
                            {range
                                ? (
                                    <>
                                        <div className="w-25 ml-1">
                                            <Label>Choose start date</Label>
                                            <DatePicker
                                                selectsStart
                                                endDate={now}
                                                selected={selectedStartDate}
                                                startDate={selectedStartDate}
                                                calendarStartDay={1}
                                                dateFormat="yyyy/MM/dd"
                                                maxDate={now}
                                                onChange={this.handleSelectedStartDate}
                                                customInput={<CustomInput isBegin />}
                                            />
                                        </div>
                                        <div className="w-25 ml-1">
                                            <Label>Choose end date</Label>
                                            <DatePicker
                                                selectsEnd
                                                selected={selectedEndDate}
                                                endDate={selectedEndDate}
                                                minDate={selectedStartDate}
                                                startDate={selectedStartDate}
                                                calendarStartDay={1}
                                                dateFormat="yyyy/MM/dd"
                                                customInput={<CustomInput />}
                                                onChange={this.handleSelectedEndDate}
                                                maxDate={now}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-25 ml-1">
                                        <Label>Choose a date</Label>
                                        <DatePicker
                                            selectsStart
                                            showMonthYearPicker
                                            selected={selectedStartDate}
                                            calendarStartDay={1}
                                            dateFormat="yyyy/MM"
                                            maxDate={now}
                                            onChange={this.handleSelectedStartDate}
                                            customInput={<CustomInput />}
                                        />
                                    </div>
                                )
                            }
                            <div className="ml-1">
                                {(!loading) && (
                                    <Button color="primary" className="rounded mt-1" type="submit">
                                        Download
                                    </Button>
                                )}
                            </div>
                        </Form>
                        <hr/>
                        <div className="mt-50 text-center">
                            {(loading) ? <Spinner color="primary" /> : (
                                (data !== null) && (
                                    <>
                                        <Icon.Check size={40} className="text-success" />
                                        <h4 className="text-success">File downloaded</h4>
                                    </>
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

export default Exports;
