// import React, {forwardRef} from "react";
import React, {forwardRef} from "react";
import * as Icon from "react-feather";
import {Button, Input, Form, FormGroup, Label} from "reactstrap";
import FormSelect from "../../components/FormSelect";
// import DatePicker from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel"
// import Select from 'react-select';
// import DatePicker from "react-datepicker";
// import dayjs from "dayjs";

// import "react-multi-date-picker/styles/layouts/mobile.css"
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import {NotificationManager} from "react-notifications";

class ImageSidebar extends React.Component {
    // props { activeChatId, verified, mainSidebar, handleActiveChat, handleUserSidebar, updateImagesToVerify, handleResetImage, handleImagesToNotate }
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedDate: [dayjs().format('YYYY-MM-DD')],
            categories: {data: ["BLACKLISTED_URL"], errorMessage: '', isValid: true},

            selectedStartDate: new Date(),
            startDate: dayjs().format("YYYY-MM-DD"),
            selectedEndDate: new Date(),
            endDate: dayjs().format("YYYY-MM-DD"),
        }
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    refresh = () => {
        this.setState({
            search: "",
            // selectedDate: [dayjs().format('YYYY-MM-DD')],
            selectedStartDate: new Date(),
            startDate: dayjs().format("YYYY-MM-DD"),
            selectedEndDate: new Date(),
            endDate: dayjs().format("YYYY-MM-DD"),
            categories: {data: ["BLACKLISTED_URL"], errorMessage: '', isValid: true}
        });
        // this.setState({search: ""});
        this.props.loadData("BLACKLISTED_URL", dayjs().format("YYYY-MM-DD"));
    };

    handleSelectedStartDate = (selectedStartDate) => {
        const startDate = dayjs(selectedStartDate).format("YYYY-MM-DD");
        this.setState({selectedStartDate, startDate});
    };

    handleSelectedEndDate = (selectedEndDate) => {
        const endDate = dayjs(selectedEndDate).format("YYYY-MM-DD");
        this.setState({selectedEndDate, endDate});
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

        const { search, categories, selectedDate, selectedStartDate, selectedEndDate, startDate, endDate } = this.state;
        // const { verified, toVerify, handleSearch, selectedDate, handleSelectedDate } = this.props;
        const { verified, toVerify, handleSearch, handleComplexSearch } = this.props;
// console.log(categories.data?.join(","), selectedDate?.join(","))
        // const min = dayjs().startOf('year').toDate();
        // const max = dayjs().endOf('year').toDate();

       /* const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/>
        ));*/

        const now = new Date();
        const sixMonthEarlier = dayjs().subtract(6, 'month').toDate();
        const twoYearLater = dayjs().add(2, 'year').toDate();

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <FormGroup>
                <Input readOnly ref={ref} type="text" onClick={onClick} defaultValue={value}/>
            </FormGroup>
        ));

        return (
            <div>
                <div className="d-flex justify-content-between mb-50">
                    <div>
                        <Form className="d-flex mx-auto" onSubmit={(e) => {
                            e.preventDefault();
                            if(search && (search !== "")) {
                                this.setState({
                                    // search: "",
                                    // selectedDate: [dayjs().format('YYYY-MM-DD')],
                                    selectedStartDate: null,
                                    startDate: "",
                                    selectedEndDate: null,
                                    endDate: "",
                                    categories: {data: [], errorMessage: '', isValid: true}
                                });
                                // this.setState({selectedDate: [], categories: {data: [], errorMessage: '', isValid: true}})
                                handleSearch(search);
                            } else NotificationManager.warning(`Please fill user id`);
                        }}>
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

                <Form className="d-flex mx-auto m-1" onSubmit={(e) => {
                    e.preventDefault();
                    const cats = categories.data?.join(",") || "";
                    let dates = "";
                    if(startDate === endDate) {
                        dates = startDate;
                    } else {
                        if(selectedEndDate && selectedStartDate) {
                            const datesArray = [
                                ...Array(2 + dayjs(selectedEndDate)
                                    .diff(dayjs(selectedStartDate), 'days'))
                                    .keys()
                            ].map(
                                n => dayjs(selectedStartDate).add(n, 'days')
                                    .format("YYYY-MM-DD")
                            );
                            dates = datesArray?.join(",") || "";
                            // console.log({categories, datesArray, dates})
                        }
                    }
                    console.log({cats, dates})
                    // categories && (categories !== "") && (categories !== this.state.categories) ||
                    // dates && (dates !== "") && (dates !== this.state.dates)

                    if(cats && (cats !== "") && dates && (dates !== "")) {
                        this.setState({
                            search: "",
                            // selectedDate: [dayjs().format('YYYY-MM-DD')],
                            // selectedStartDate: null,
                            // startDate: "",
                            // selectedEndDate: null,
                            // endDate: "",
                            // categories: {data: [], errorMessage: '', isValid: true}
                        });
                        // console.log({categories, dates})
                        // const dates = selectedDate?.join(",");
                        handleComplexSearch(cats, dates)
                    } else NotificationManager.warning(`Please fill all required search fields`);
                }}>
                    <div className="w-25">
                        <Label>Choose categories</Label>
                        <FormSelect
                            multi
                            input={categories}
                            label='Choisir les catégories'
                            options={allCategories}
                            handleInput={(data) => this.setState({ categories: {...categories, data} })}
                        />
                    </div>
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
                        {/*<DatePicker
                            multiple
                            // render={<CustomInput />}
                            value={selectedDate}
                            // minDate={selectedDate}
                            onChange={(selectedDate) => this.setState({selectedDate})}
                            dateSeparator=","
                            style={{height: "38px"}}
                            format="YYYY-MM-DD"
                            plugins={[<DatePanel />]}
                        />*/}
                    </>
                    <div className="ml-1">
                        <Button size="sm" color="primary" className="rounded mt-2" type="submit" title="Search">
                            <Icon.Search size={20} />
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ImageSidebar;
