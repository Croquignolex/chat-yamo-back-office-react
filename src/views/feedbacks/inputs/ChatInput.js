import {connect} from "react-redux";
import React, {Component} from 'react';
import {Paperclip, Send} from "react-feather";
import {Button, FormGroup, Input} from "reactstrap";
import {NotificationManager} from "react-notifications";

import MediaInput from "./MediaInput";
import Message from "../../../models/Message";
import {getUniqueId} from "../../../helpers/helpers";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../../../configs/AppConfig";
import {createMedia, sendMessage} from "../../../redux/actions/IndependentActions";

class ChatInput extends Component {
    // props { activeChatID, activeUser, notifyChanges }
    state = {
        msg: '',
        show: false
    };

    onChangeMsg = (e) => {
        e.preventDefault();
        this.setState({msg: e.target.value});
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

        this.sendPlainMessage(_msg)
    };

    handleMsgWithFileSubmit = (files = null) => {
        console.log({files})
        /*const {activeChatID, activeUser, notifyChanges, backOfficeUserName} = this.props;
        const message = this.state.msg;

        if (!file && message.length === 0) {
            NotificationManager.warning("Message body can not be empty", null, 500);
            return;
        }

        this.toggleMediaInput();
        this.resetMessage();

        const _msg = {
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

        if(!file) this.sendPlainMessage(_msg);
        else {
            // Update
            const messageWithMedia = new Message(_msg);
            messageWithMedia.setPlainMedia = file.preview;
            notifyChanges(messageWithMedia);
            // Create media
            createMedia(activeUser.id, file)
                .then((data) => {
                    sendMessage(activeUser.id, message, backOfficeUserName, activeUser.name, data.mediaId)
                        .then(() => {
                            messageWithMedia.seRequest = {..._msg.request, loading: false};
                            notifyChanges(messageWithMedia);
                        })
                        .catch(error => {
                            messageWithMedia.seRequest = {..._msg.request, error, loading: false};
                            notifyChanges(messageWithMedia);
                        });
                })
                .catch(error => {
                    messageWithMedia.seRequest = {..._msg.request, error, loading: false};
                    notifyChanges(messageWithMedia);
                });
        }*/

    };

    sendPlainMessage = (_msg) => {
        const {activeUser, notifyChanges, backOfficeUserName} = this.props;
        const plainMessage = new Message(_msg);

        notifyChanges(plainMessage);
        // Send request
        sendMessage(activeUser.id, _msg.content, backOfficeUserName, activeUser.name)
            .then(() => {
                //
                plainMessage.seRequest = {..._msg.request, loading: false};
                notifyChanges(plainMessage);
            })
            .catch(error => {
                plainMessage.seRequest = {..._msg.request, error, loading: false};
                notifyChanges(plainMessage);
            });
    }

    toggleMediaInput = (show) => {
        this.setState({show});
    };

    resetMessage = () => {
        this.setState({msg: ''});
    };

    render() {
        const { show, msg } = this.state;

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
                    onMsgChange={this.onChangeMsg}
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
