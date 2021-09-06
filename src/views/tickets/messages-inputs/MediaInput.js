import {
    Input,
    Modal,
    Button,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import {Send} from "react-feather";
import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";
import "../../../assets/scss/plugins/extensions/dropzone.scss";

const MediaInput = ({ message, onMsgChange, show, onClose, onSubmit }) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: "image/jpg,image/jpeg",
        onDrop: acceptedFiles => {
            setFiles(
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
                <img src={file.preview} className="dz-img" alt={file.name} />
            </div>
        </div>
    ));

    /*useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [files]
    );*/

    const _onSubmit = (e) => {
        e.preventDefault();
        onSubmit(files.length > 0 ? files[0] : null);
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
                            <p className="mx-1">
                                Téléverser une image içi
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
