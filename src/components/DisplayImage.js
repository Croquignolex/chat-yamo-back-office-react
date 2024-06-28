import {Modal} from "reactstrap";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import styled from "styled-components";

// Wrapper style
const Wrapper = styled.div`background-image: url(${props => props.src})`;

// Component
const DisplayImage = ({src, className, withWrapper, withModal, withPercentage, height, width}) => { 
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleErrorImage = (e) =>{
        e.target.src = require("../assets/img/no-image.png");
    };

    return (
        <>
            {/* Normal image size display */}
            {withWrapper ? (
                <div className={`c-image ${className}`}>
                    <Wrapper src={src} className="c-image-content rounded-top" onClick={toggleModal} />
                </div>
            ) : (
                withPercentage 
                    ? <img  
                        alt="..."  
                        src={src} 
                        onClick={toggleModal}
                        className="hand-cusor" 
                        style={{ width: "100%" }} 
                        onError={handleErrorImage} 
                    />
                    : <img  
                        alt="..." 
                        src={src} 
                        width={width}
                        height={height}  
                        className={className} 
                        onClick={toggleModal} 
                        onError={handleErrorImage} 
                    />
            )}
            {/* Large image size display into modal */}
            {withModal && (
                <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered">
                    <img src={src} alt="..." onError={handleErrorImage} />
                </Modal>
            )}
        </>
    );
};

// Prop types definition
DisplayImage.propTypes = {
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    width: PropTypes.string,
    height: PropTypes.string,
    withModal: PropTypes.bool,
    className: PropTypes.string,
    withWrapper: PropTypes.bool,
}

// Default props
DisplayImage.defaultProps = {
    src: "",
    width: "40",
    height: "40",
    className: "",
    withModal: true,
    withWrapper: false,
    withPercentage: false
}

export default DisplayImage;
