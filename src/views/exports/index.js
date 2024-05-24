import dayjs from "dayjs";
import Select from 'react-select';
import * as Icon from "react-feather";
import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";

import Error500 from "../Error500";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {Col, Row, Form, Input, Button, Spinner, FormGroup, Label, Card} from "reactstrap";
import {
    exportDeletedUsers,
    exportNewUsers,
    exportSubscriptions,
    exportDeletedUserEmails,
    exportNewUserEmails,
    exportSubscriptionEmails,
} from "../../redux/actions/IndependentActions";

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
            exclude: true,
            selectedStartDate: new Date(),
            startDate: dayjs().format("YYYY-MM-DD"),
            selectedEndDate: new Date(),
            endDate: dayjs().format("YYYY-MM-DD"),
            type: {label: 'Premium users', value: 'premium_users'}
        }
    }

    updateTypeSelect = (type) => {
        const {selectedStartDate} = this.state;
        const range = true;
        const startDate = dayjs(selectedStartDate).format("YYYY-MM-DD");
        this.setState({type, range, startDate});
    };

    handleSelectedStartDate = (selectedStartDate) => {
        const startDate = dayjs(selectedStartDate).format("YYYY-MM-DD");
        this.setState({selectedStartDate, startDate});
    };

    handleSelectedEndDate = (selectedEndDate) => {
        const endDate = dayjs(selectedEndDate).format("YYYY-MM-DD");
        this.setState({selectedEndDate, endDate});
    };

    handleExport = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true, data: null, error: null});

        const {type, startDate, endDate, selectedStartDate, exclude} = this.state;

        if(type.value === "premium_users")
        {
            exportSubscriptions(startDate, endDate, exclude)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `premium_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => console.log({error}));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        if(type.value === "premium_user_emails")
         {
             exportSubscriptionEmails(startDate, endDate, exclude)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `premium_user_emails_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => console.log({error}));
             })
             .catch((error) => this.setState({ error }))
             .finally(() => this.setState({loading: false}))
         }
        else if(type.value === "deleted_users")
        {
            exportDeletedUsers(startDate, endDate, exclude)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `deleted_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => console.log({error}));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else if(type.value === "deleted_user_emails")
                {
                    exportDeletedUserEmails(startDate, endDate, exclude)
                        .then((data) => {
                            const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                            const name = `deleted_user_emails_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                            downloadFile(file, name)
                                .then(() => this.setState({ data }))
                                .catch((error) => console.log({error}));
                        })
                        .catch((error) => this.setState({ error }))
                        .finally(() => this.setState({loading: false}))
                }
        else if(type.value === "new_users")
        {
            exportNewUsers(startDate, endDate, exclude)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `new_user_metadata_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => console.log({error}));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else if(type.value === "new_user_emails")
        {
            exportNewUserEmails(startDate, endDate, exclude)
                .then((data) => {
                    const file = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
                    const name = `new_user_emails_${dayjs(selectedStartDate).format("YYYY_MM_DD")}.csv`;
                    downloadFile(file, name)
                        .then(() => this.setState({ data }))
                        .catch((error) => console.log({error}));
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
        else this.setState({ error: "No type selected" });
    };

    render() {

        const {error, loading, type, data, selectedStartDate, selectedEndDate, exclude} = this.state;

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup>
                <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/>
            </FormGroup>
        ));

        const selectItems = [
            {label: 'Premium users', value: 'premium_users'},
            {label: 'Deleted users', value: 'deleted_users'},
            {label: 'New users', value: 'new_users'},
            {label: 'Premium user emails', value: 'premium_user_emails'},
            {label: 'Deleted user emails', value: 'deleted_user_emails'},
            {label: 'New user emails', value: 'new_user_emails'},
        ];

        const now = new Date();
        const sixMonthEarlier = dayjs().subtract(6, 'month').toDate();
        const twoYearLater = dayjs().add(2, 'year').toDate();

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Exports"
                    breadCrumbActive="Chooses data to export"
                />
                <Row>
                    <Col lg={10} sm={12}>
                        <div className="ml-2 mb-1">
                            <Input
                                type="checkbox"
                                checked={exclude}
                                onChange={() => this.setState({exclude: !exclude})}
                            />
                            <Label check>Add Blacklist</Label>
                        </div>
                        <Form className="d-flex mx-auto" onSubmit={this.handleExport}>
                            <div className="w-25">
                                <Label>Choose data type</Label>
                                <Select
                                    value={type}
                                    options={selectItems}
                                    onChange={this.updateTypeSelect}
                                />
                            </div>
                            {(
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
                                                minDate={sixMonthEarlier}
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
                                                maxDate={twoYearLater}
                                            />
                                        </div>
                                    </>
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
                            {(error && data === null && !loading) && (
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
