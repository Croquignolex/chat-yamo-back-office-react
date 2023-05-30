import {Modal} from "reactstrap";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import styled from "styled-components";

// Wrapper style
const Wrapper = styled.div`background-image: url(${props => props.src})`;

// Component
const DisplayVideo = ({src, type, className, withWrapper, withModal, withPercentage, height, width}) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleErrorImage = (e) =>{
        e.target.poster = require("../assets/img/unknown-user.png");
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
                    ? (
                        <>
                            <img className="img-responsive play-button" src={require("../assets/img/play.png")} alt="play" />
                            <video src={src}
                                   onClick={toggleModal}
                                   className="hand-cusor"
                                   style={{ width: "100%" }}
                                   onError={handleErrorImage}
                            >
                            </video>
                        </>

                    )
                    : (
                        <>
                            <img className="img-responsive play-button" src={require("../assets/img/play.png")} alt="play" />
                            <video src={src}
                                   onClick={toggleModal}
                                   className={className}
                                   width={width}
                                   height={height}
                                   onError={handleErrorImage}
                            >
                            </video>
                        </>
                    )
            )}
            {/* Large image size display into modal */}
            {withModal && (
                <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered" size="lg">
                    <video id="background-video" autoPlay loop muted controls preload="auto" onError={handleErrorImage}
                    >
                        <source src={src} type={type} />
                    </video>
                </Modal>
            )}
        </>
    );
};

// Prop types definition
DisplayVideo.propTypes = {
    src: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    withModal: PropTypes.bool,
    className: PropTypes.string,
    withWrapper: PropTypes.bool,
}

// Default props
DisplayVideo.defaultProps = {
    src: "",
    width: "40",
    height: "40",
    className: "",
    withModal: true,
    type: "video/mp4",
    withWrapper: false,
    withPercentage: false
}

export default DisplayVideo;
