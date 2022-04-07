import React  from 'react';
import {Input} from "reactstrap";
import PropTypes from 'prop-types';

const FormInput = ({label, type, input, handleInput}) => {
    // Data
    const {errorMessage, isValid, data} = input;
    const inputClass = `${!isValid ? 'is-invalid' : ''}`;

    const handleOnChange = (e) => {
       handleInput(e.target.value);
    };

    // Render
    return (
        <>
            <Input
                type={type}
                defaultValue={data}
                autoComplete="true"
                placeholder={label}
                className={inputClass}
                onChange={handleOnChange}
            />
            {!isValid && <small className="text-danger">{errorMessage}</small>}
        </>
    );
};

// Prop types to ensure destroyed props data type
FormInput.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired
};

FormInput.defaultProps = {
    label: "",
    type: "text",
};

export default React.memo(FormInput);
