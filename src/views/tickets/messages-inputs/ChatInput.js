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
        const {activeChatID, activeUser, notifyChanges} = this.props;
        const message = this.state.msg;

        if (message.length === 0) {
            NotificationManager.warning("Message body can not be empty");
            return;
        }

        this.resetMessage();

        const _msg = {
            userId: activeUser.id,
            caseId: activeChatID,
            mediaId: null,
            content: message,
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

    handleMsgWithFileSubmit = (file = null) => {
        const {activeChatID, activeUser, notifyChanges} = this.props;
        const message = this.state.msg;

        if (!file && message.length === 0) {
            NotificationManager.warning("Message body can not be empty");
            return;
        }

        this.toggleMediaInput();
        this.resetMessage();

        const _msg = {
            userId: activeUser.id,
            caseId: activeChatID,
            mediaId: null,
            content: message,
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
            const withMedia = new Message(_msg);
            withMedia.setPlainMedia = file.preview;
            notifyChanges(withMedia);
            // Create media
            createMedia(activeUser.id, file)
                .then((data) => {
                    sendMessage(activeUser.id, message, data.mediaId)
                        .then(() => notifyChanges(new Message({ ..._msg, request: {..._msg.request, loading: false} })))
                        .catch(error => notifyChanges(new Message({ ..._msg, request: {..._msg.request, error, loading: false} })))
                })
                .catch(error => notifyChanges(new Message({ ..._msg, request: {..._msg.request, error, loading: false }})))
        }

    };

    sendPlainMessage = (_msg) => {
        const {activeUser, notifyChanges} = this.props;
        notifyChanges(new Message(_msg));
        // Send request
        sendMessage(activeUser.id, _msg.content)
            .then(() => notifyChanges(new Message({ ..._msg, request: {..._msg.request, loading: false} })))
            .catch(error => notifyChanges(new Message({ ..._msg, request: {..._msg.request, error, loading: false} })))
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
                            type="text"
                            value={msg}
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

export default ChatInput;
