import {
    Input,
    Modal,
    Button,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import React from 'react';
import {Send} from "react-feather";
import {useDropzone} from "react-dropzone";

import DisplayImage from "../../../components/DisplayImage";
import DisplayVideo from "../../../components/DisplayVideo";

import "../../../assets/scss/plugins/extensions/dropzone.scss";

const MediaInput = ({ message, files, onMsgChange, onFilesLoad, show, onClose, onSubmit }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpg,image/jpeg,image/png,video/mp4,video/webm",
        onDrop: acceptedFiles => {
            onFilesLoad(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            )
        }
    });

    const thumbs = files.map(file => (
        <div className="dz-thumb" key={file.name}>
            <div className="dz-thumb-inner">
                {['image/jpg', 'image/jpeg', 'image/png'].includes(file.type) && <DisplayImage src={file.preview} withPercentage /> }
                {['video/mp4', 'video/webm', 'video/mpeg'].includes(file.type) && <DisplayVideo src={file.preview} type={file.type} withPercentage />}
            </div>
        </div>
    ));

    const _onSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return(
        <Modal
            isOpen={show}
            toggle={onClose}
            backdrop="static"
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={onClose}>
                Envoyer un message
            </ModalHeader>
            <ModalBody className="">
                <div>
                    <section className="w-100">
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <p className="mx-1 mt-50 text-center text-danger">
                                Drop files or click to upload <br/>
                                Allowed extensions:  JPEG, JPG, PNG, MP4, MPEG, WEBM.
                            </p>
                        </div>
                        <aside className="thumb-container">{thumbs}</aside>
                    </section>
                    <div>
                        <form
                            className="chat-app-input d-flex align-items-center mt-2"
                            onSubmit={_onSubmit}>
                            <Input
                                type="text"
                                value={message}
                                className="message mr-1 ml-50"
                                placeholder="Type your message"
                                onChange={onMsgChange}
                            />
                            <Button color="primary">
                                <Send className="d-lg-none" size={15} />
                                <span className="d-lg-block d-none">Envoyer</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
};

export default MediaInput;
