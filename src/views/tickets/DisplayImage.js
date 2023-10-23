import {Modal} from "reactstrap"
import React, {useState} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    background-image: url(${props => props.src})
`;

const DisplayImage = ({src, className = ''}) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <div className={`c-image ${className}`}>
                <Wrapper src={src} className="c-image-content rounded-top"  onClick={toggleModal} />
            </div>

            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered">
                <img src={src} alt="..."/>
            </Modal>
        </>
    );
};

export default DisplayImage;
