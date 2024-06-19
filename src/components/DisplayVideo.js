import {Modal} from "reactstrap";
import PropTypes from "prop-types";
import React, {useState} from 'react';
import styled from "styled-components";

// Wrapper style
const Wrapper = styled.div`background-image: url(${props => props.src})`;
const errorImage = require("../assets/img/unsupported-video.png");
const defaultThumbnail = require("../assets/img/video-icon.png");

// Component
const DisplayVideo = ({src, type, className, withWrapper, withModal, withPercentage, objSrc, height, width}) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleErrorImage = (e) =>{
        e.target.poster = errorImage;
    };

    return (
        <>
            {/* Normal image size display */}
            {withWrapper ? (
                <div className={`c-image ${className}`}>
                    <Wrapper src={defaultThumbnail} className="c-image-content rounded-top" onClick={toggleModal} />
                </div>
            ) : (
                withPercentage
                    ? <img
                        alt="..."
                        src={defaultThumbnail}
                        onClick={toggleModal}
                        className="hand-cusor"
                        style={{ width: "100%" }}
                    />
                    : <img
                        alt="..."
                        src={defaultThumbnail}
                        width={width}
                        height={height}
                        className={className}
                        onClick={toggleModal}
                    />
            )}
            {/* Large image size display into modal */}
            {withModal && (
                <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered" size="lg">
                    {/*<video autoPlay loop muted style={{pointerEvents: 'none'}} preload="auto" onError={handleErrorImage}>*/}
                    <video autoPlay loop muted controls preload="auto" controlsList="nofullscreen" onError={handleErrorImage}>
                        {objSrc ? (
                            type ? (
                                <>
                                    <source src={src?.enhancedPreSignedUrl} type={type} />
                                    <source src={src?.compressedPreSignedUrl} type={type} />
                                    <source src={src?.originalPreSignedUrl} type={type} />
                                    <source src={src?.compressedUrl} type={type} />
                                    <source src={src?.originalUrl} type={type} />
                                </>
                            ) : (
                                <>
                                    <source src={src?.enhancedPreSignedUrl} />
                                    <source src={src?.compressedPreSignedUrl} />
                                    <source src={src?.originalPreSignedUrl} />
                                    <source src={src?.compressedUrl} />
                                    <source src={src?.originalUrl} />
                                </>
                            )
                        ) : (
                            type
                                ? <source src={src} type={type} />
                                : <source src={src} />
                        )}
                    </video>
                </Modal>
            )}
        </>
    );
};

// Prop types definition
DisplayVideo.propTypes = {
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
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
    withWrapper: false,
    withPercentage: false,
    objSrc: false,
}

export default DisplayVideo;
