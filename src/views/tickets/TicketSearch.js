import {Search} from "react-feather";
import React, {useState} from 'react';
import {FormGroup, Input} from "reactstrap";

// TODO: Handle tickets search function
/**
 * Search tickets
 * @param props
 * @returns {*}
 * @constructor
 */
const TicketSearch = (props) => {
    const [value, setValue] = useState();

    const handleOnChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    return (
        <FormGroup className="position-relative has-icon-left mx-1 my-0 w-100">
            <Input
                type="text"
                value={value}
                className="round"
                onChange={handleOnChange}
                placeholder="Search tickets, users..."
            />
            <div className="form-control-position">
                <Search size={15} />
            </div>
        </FormGroup>
    );
};

export default TicketSearch;
