import {connect} from "react-redux";
import React, {Component} from 'react';
import {Paperclip, Send} from "react-feather";
import {Button, FormGroup, Input} from "reactstrap";
import {NotificationManager} from "react-notifications";

import MediaInput from "./MediaInput";
import Message from "../../../models/Message";
import {getUniqueId} from "../../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../../configs/AppConfig";
import {createMedia, createVideoMedia, sendMessage} from "../../../redux/actions/IndependentActions";

class ChatInput extends Component {
    // props { activeChatID, activeUser, notifyChanges }
    state = {
        msg: '',
        files: [],
        show: false
    };

    onChangeMsg = (e) => {
        e.preventDefault();
        this.setState({msg: e.target.value});
    };

    onFilesLoad = (files) => {
        this.setState({files});
    };

    toggleMediaInput = (show) => {
        this.setState({show});
    };

    resetMessage = () => {
        this.setState({msg: '', files: []});
    };

    handleMsgSubmit = async (e) => {
        e.preventDefault();
        const {activeChatID, activeUser, backOfficeUserName} = this.props;
        const message = this.state.msg;

        if (message.length === 0) {
            NotificationManager.warning("Message body can not be empty", null, 500);
            return;
        }

        this.resetMessage();

        const _msg = {
            activeUser: activeUser,
            userId: activeUser.id,
            caseId: activeChatID,
            mediaId: null,
            content: message,
            backofficeUserName: backOfficeUserName,
            messageId: getUniqueId(),
            authorId: REACT_APP_CHAT_BACKOFFICE_USER_ID,
            createdAt: Date.now(),
            request: {
                loading: true,
                error: null,
                data: message
            }
        };

        this.buildMessage(new Message(_msg))
    };

    handleMsgWithFileSubmit = async () => {
        const {activeChatID, activeUser, backOfficeUserName} = this.props;
        const message = this.state.msg;
        const files = this.state.files;

        if (files.length === 0 && message.length === 0) {
            NotificationManager.warning("Message body can not be empty", null, 500);
            return;
        }

        this.toggleMediaInput();
        this.resetMessage();

        const _msg = {
            activeUser: activeUser,
            userId: activeUser.id,
            caseId: activeChatID,
            mediaId: null,
            content: message,
            backofficeUserName: backOfficeUserName,
            messageId: getUniqueId(),
            authorId: REACT_APP_CHAT_BACKOFFICE_USER_ID,
            createdAt: Date.now(),
            request: {
                loading: true,
                error: null,
                data: message
            }
        };

        const messageObj = new Message(_msg);
        const realActiveUser = messageObj.activeUser;

        if(files.length === 0) this.buildMessage(messageObj)
        else {
            await this.buildMedia(files[0], messageObj);

            files.shift();

            for(const file of files) {
                const _msg = {
                    activeUser: realActiveUser,
                    userId: realActiveUser.id,
                    caseId: activeChatID,
                    mediaId: null,
                    content: "",
                    backofficeUserName: backOfficeUserName,
                    messageId: getUniqueId(),
                    authorId: REACT_APP_CHAT_BACKOFFICE_USER_ID,
                    createdAt: Date.now(),
                    request: {
                        loading: true,
                        error: null,
                        data: message
                    }
                };

                const messageObj = new Message(_msg);
                await this.buildMedia(file, messageObj);
            }
        }
    };

    buildMedia = (file, message) => {
        const {notifyChanges} = this.props;
        const activeUser = message.activeUser;

        if(['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
            message.setImageMedia = file.preview;
            notifyChanges(message);
            // Create media
            createMedia(activeUser.id, file)
                .then((data) => {
                    this.buildMessage(message, data.mediaId);
                })
                .catch(error => {
                    message.seRequest = {...message.request, error, loading: false};
                    notifyChanges(message);
                });
        } else if (['video/mp4', 'video/webm', 'video/x-msvideo'].includes(file.type)) {
            message.setVideoMedia = file.preview;
            notifyChanges(message);
            // Create media
            createVideoMedia(activeUser.id, file)
                .then((data) => {
                    this.buildMessage(message, null, data.mediaId);
                })
                .catch(error => {
                    message.seRequest = {...message.request, error, loading: false};
                    notifyChanges(message);
                });
        }
    }

    buildMessage = (message, mediaId = null, videoId = null) => {
        const {notifyChanges, backOfficeUserName} = this.props;
        const activeUser = message.activeUser;
        notifyChanges(message);

        // Send request
        sendMessage(activeUser.id, message.content, backOfficeUserName, activeUser.name, mediaId, videoId)
            .then(() => {
                message.seRequest = {...message.request, loading: false};
                notifyChanges(message);
            })
            .catch(error => {
                message.seRequest = {...message.request, error, loading: false};
                notifyChanges(message);
            });
    }

    render() {
        const { show, msg, files } = this.state;

        return (
            <>
                <form className="chat-app-input d-flex align-items-center" onSubmit={this.handleMsgSubmit}>
                    <FormGroup className="position-relative has-icon-left mr-1 ml-50 w-100 mb-0">
                        <Input
                            value={msg}
                            type="textarea"
                            className="message"
                            placeholder="Type your message"
                            onChange={this.onChangeMsg}
                        />
                        <div
                            onClick={() => this.toggleMediaInput(true)}
                            className="form-control-position cursor-pointer">
                            <Paperclip size={15} />
                        </div>
                    </FormGroup>
                    <Button color="primary">
                        <Send className="d-lg-none" size={15} />
                        <span className="d-lg-block d-none">Send</span>
                    </Button>
                </form>
                <MediaInput
                    show={show}
                    message={msg}
                    files={files}
                    onMsgChange={this.onChangeMsg}
                    onFilesLoad={this.onFilesLoad}
                    onSubmit={this.handleMsgWithFileSubmit}
                    onClose={() => this.toggleMediaInput(false)}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        backOfficeUserName: state.authUser?.data?.firstName + " " + state.authUser?.data?.lastName,
    }
};

export default connect(mapStateToProps)(ChatInput)
