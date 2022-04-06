import React from 'react';
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import {Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';

const ConfirmModal = ({modal, small, danger, toggleModal, handleModal}) => {
    // Data
    const size = small ? "sm" : "lg";
    const {show, title, body, data} = modal;
    const color = danger ? "danger" : "warning";

    const handleConfirm = () => {
        toggleModal();
        handleModal(data);
    };

    return (
        <Modal isOpen={show} toggle={toggleModal} size={size} className="modal-dialog-centered">
            <ModalHeader toggle={toggleModal} className={`bg-${color}`}>
                {title}
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">{body}</ModalBody>
            <ModalFooter>
                <Button color={color} onClick={handleConfirm}>
                    <Icon.Check size={20} className="mr-50" />
                    Confirmer
                </Button>
            </ModalFooter>
        </Modal>
    );
}

// Prop types to ensure destroyed props data type
ConfirmModal.propTypes = {
    small: PropTypes.bool,
    danger: PropTypes.bool,
    modal: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
};

// Prop types to ensure destroyed props data type
ConfirmModal.defaultProps = {
    small: false,
    danger: false
};

export default React.memo(ConfirmModal);
