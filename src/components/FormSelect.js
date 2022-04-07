import chroma from "chroma-js"
import Select from 'react-select';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

const FormSelect = ({multi, colored, disabled, options, label, input, requestProcessing, handleInput}) => {
    // Data
    const {data, errorMessage, isValid} = input;

    const handleChange = (selected) => {
        if(!multi) handleInput(selected?.value ? selected.value : '');
        else {
            let handler = [];
            selected && selected.forEach(item => handler.push(item?.value ? item.value : ''));
            handleInput(handler);
        }
    };

    // Build default value
    const defaultValue = useMemo(() => {
        if(!multi) return findIntoData(data, options);
        else {
            const returnedValue = [];
            data.forEach(item => {
                const found = findIntoData(item, options);
                found && returnedValue.push(found)
            });
            return returnedValue;
        }
    }, [data, options, multi]);

    // Custom style in case oed error
    const customStyles = useMemo(() => {
        return isValid ? (colored ? colourStyles : {}) : {
            control: (provided) => ({...provided, border: '1px solid #cad1d7'}),
            singleValue: (provided) => {
                const color = '#cad1d7';
                return {...provided, color}
            }
        };
    }, [isValid, colored]);

    // Render
    return (
        <>
            <Select
                isMulti={multi}
                options={options}
                isClearable={true}
                placeholder={label}
                value={defaultValue}
                styles={customStyles}
                isDisabled={disabled}
                onChange={handleChange}
                isLoading={requestProcessing}
            />
            <small className="text-danger">{!isValid && errorMessage}</small>
        </>
    );
};

// Find into data array
const findIntoData = (needle, dataArray) => {
    return dataArray.find(item => needle?.toString() === item?.value.toString());
};

// Data
const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color)
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? "#ccc"
                : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
            cursor: isDisabled ? "not-allowed" : "default",

            ":active": {
                ...styles[":active"],
                backgroundColor:
                    !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
            }
        }
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color)
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css()
        }
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ":hover": {
            backgroundColor: data.color,
            color: "white"
        }
    })
};

// Prop types to ensure destroyed props data type
FormSelect.propTypes = {
    multi: PropTypes.bool,
    colored: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    requestProcessing: PropTypes.bool,
    input: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    handleInput: PropTypes.func.isRequired,
};

// Prop types to ensure destroyed props data type
FormSelect.defaultProps = {
    multi: false,
    colored: false,
    disabled: false,
    requestProcessing: false
};

export default React.memo(FormSelect);
