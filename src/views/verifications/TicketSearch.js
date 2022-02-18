import React from 'react';
import {Search} from "react-feather";
import {FormGroup, Input} from "reactstrap";

// TODO: Handle tickets search function
/**
 * Search tickets
 * @param props
 * @returns {*}
 * @constructor
 */
const TicketSearch = ({search, setSearch}) => {
    const handleOnChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return (
        <FormGroup className="position-relative has-icon-left mx-1 my-0 w-100">
            <Input
                type="text"
                value={search}
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
