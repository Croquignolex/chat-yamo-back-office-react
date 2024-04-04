// import React, {forwardRef} from "react";
import React, {forwardRef} from "react";
import * as Icon from "react-feather";
import {Button, Input, Form, FormGroup} from "reactstrap";
import FormSelect from "../../components/FormSelect";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
// import Select from 'react-select';
// import DatePicker from "react-datepicker";
// import dayjs from "dayjs";

import "react-multi-date-picker/styles/layouts/mobile.css"
import dayjs from "dayjs";

class ImageSidebar extends React.Component {
    // props { activeChatId, verified, mainSidebar, handleActiveChat, handleUserSidebar, updateImagesToVerify, handleResetImage, handleImagesToNotate }
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedDate: [dayjs().format('YYYY-MM-DD')],
            categories: {data: ["BLACKLISTED_URL"], errorMessage: '', isValid: true},
        }
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    refresh = () => {
        this.setState({search: ""});
        this.props.loadData();
    };

    render() {
        const allCategories = [
            {label: "BLACKLISTED_URL", value: "BLACKLISTED_URL"},
            {label: "BLOCKED_DEVICE", value: "BLOCKED_DEVICE"},
            {label: "YOUNG_IMAGE", value: "YOUNG_IMAGE"},
            {label: "MISS_MATCH_PHONE_CODE", value: "MISS_MATCH_PHONE_CODE"},
            {label: "SUSPICIOUS_PROFILE_NAME", value: "SUSPICIOUS_PROFILE_NAME"},
            {label: "BLACKLISTED_PHONE_NUMBER", value: "BLACKLISTED_PHONE_NUMBER"},
            {label: "ESCORT_SUSPICIONS", value: "ESCORT_SUSPICIONS"},
            {label: "BLACKLISTED_PHONE_PROVIDER", value: "BLACKLISTED_PHONE_PROVIDER"},
        ];

        const { search, categories, selectedDate } = this.state;
        // const { verified, toVerify, handleSearch, selectedDate, handleSelectedDate } = this.props;
        const { verified, toVerify, handleSearch, handleComplexSearch } = this.props;
// console.log(categories.data?.join(","), selectedDate?.join(","))
        // const min = dayjs().startOf('year').toDate();
        // const max = dayjs().endOf('year').toDate();

       /* const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/>
        ));*/

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup>
                <Input ref={ref} type="text" onClick={onClick} defaultValue={value}/>
            </FormGroup>
        ));

        return (
            <div>
                <div className="d-flex justify-content-between mb-50">
                    <div>
                        <Form className="d-flex mx-auto" onSubmit={(e) => handleSearch(e, search)}>
                            <div className="position-relative">
                                <Input
                                    type="text"
                                    className="search-width"
                                    placeholder="Search verification by user id..."
                                    onChange={this.updateSearchInput}
                                    value={search}
                                />
                                <div className="form-control-position">
                                    <Icon.X size={15} onClick={this.refresh} />
                                </div>
                            </div>
                            <div className="ml-50">
                                <Button size="sm" color="primary" className="rounded" type="submit" title="Search">
                                    <Icon.Search size={20} />
                                </Button>
                            </div>
                        </Form>
                    </div>
                    {/*<div>
                        <DatePicker
                            selectsStart
                            showMonthYearPicker
                            selected={selectedDate}
                            dateFormat="MMMM"
                            minDate={min}
                            maxDate={max}
                            onChange={handleSelectedDate}
                            customInput={<CustomInput />}
                        />
                </div>*/}
                    <div>
                        <strong className="text-primary">{verified}</strong> noted profile(s) / <strong className="text-primary">{toVerify}</strong> profile(s) to note
                        <Button color="primary" className="ml-50 rounded" onClick={this.refresh} size="sm">
                            <Icon.RefreshCcw size={15} />
                        </Button>
                    </div>
                </div>

                <Form className="d-flex mx-auto m-1" onSubmit={(e) => handleComplexSearch(e, categories.data?.join(","), selectedDate?.join(","))}>
                    <div className="position-relative" style={{minWidth: "300px"}}>
                        <FormSelect
                            multi
                            input={categories}
                            label='Choisir les catégories'
                            options={allCategories}
                            handleInput={(data) => this.setState({ categories: {...categories, data} })}
                        />
                    </div>
                    <div className="position-relative ml-50">
                        <DatePicker
                            multiple
                            // render={<CustomInput />}
                            value={selectedDate}
                            // minDate={selectedDate}
                            onChange={(selectedDate) => this.setState({selectedDate})}
                            dateSeparator=","
                            style={{height: "38px"}}
                            format="YYYY-MM-DD"
                            plugins={[<DatePanel />]}
                        />
                    </div>
                    <div className="ml-50">
                        <Button size="sm" color="primary" className="rounded" type="submit" title="Search">
                            <Icon.Search size={20} />
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ImageSidebar;
