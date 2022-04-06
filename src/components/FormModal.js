import React from 'react';
import PropTypes from "prop-types";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const FormModal = ({modal, small, children, toggleModal}) => {
    // Data
    const {show, title} = modal;
    const size = small ? "lg" : "xl";

    return (
        <Modal isOpen={show} toggle={toggleModal} size={size}>
            <ModalHeader toggle={toggleModal} className="bg-primary">
                <strong className="text-white">{title}</strong>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
        </Modal>
    );
}

// Prop types to ensure destroyed props data type
FormModal.propTypes = {
    small: PropTypes.bool,
    modal: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    toggleModal: PropTypes.func.isRequired
};

// Prop types to ensure destroyed props data type
FormModal.defaultProps = {
    small: false
};

export default React.memo(FormModal);
