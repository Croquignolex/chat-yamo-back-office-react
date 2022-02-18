import {Modal} from "reactstrap";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import styled from "styled-components";

// Wrapper style
const Wrapper = styled.div`background-image: url(${props => props.src})`;

// Component
const DisplayImage = ({src, className, withWrapper, height, width}) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            {/* Normal image size display */}
            {withWrapper ? (
                <div className={`c-image ${className}`}>
                    <Wrapper src={src} className="c-image-content rounded-top" onClick={toggleModal} />
                </div>
            ) : <img src={src} alt="..." height={height} width={width} className={className} />}
            {/* Large image size display into modal */}
            <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered">
                <img src={src} alt="..."/>
            </Modal>
        </>
    );
};

// Prop types definition
DisplayImage.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    withWrapper: PropTypes.bool,
    src: PropTypes.string.isRequired,
}

// Default props
DisplayImage.defaultProps = {
    width: "38",
    height: "38",
    className: "",
    withWrapper: false,
}

export default DisplayImage;
