import MediaInput from "./MediaInput";
import React, {Component} from 'react';
import {Paperclip, Send} from "react-feather";
import Message from "../../../models/Message";
import {Button, FormGroup, Input} from "reactstrap";
import {getUniqueId} from "../../../helpers/helpers";
import {NotificationManager} from "react-notifications";
import {createMedia, sendMessage} from "../../../redux/actions/IndependentActions";

class ChatInput extends Component {
    state = {
        msg: '',
        show: false
    };

    onChangeMsg = (e) => {
        e.preventDefault();
        this.setState({msg: e.target.value});
    };

    handleMsgSubmit = async (file = null) => {
        const {caseId, userId, notifyChanges} = this.props;
        const message = this.state.msg;
        const authorId = "BACK_OFFICE_USER_ID";

        if (!file && message.length === 0) {
            NotificationManager.warning("Vous devez remplir le champ message");
            return;
        }

        // Reset input and hide modal to show outgoing message
        this.toggleMediaInput();
        this.resetMessage();

        const _msg = {
            userId,
            caseId,
            mediaId: file ? "ok" : null,
            content: message,
            messageId: getUniqueId(),
            authorId: authorId,
            createdAt: Date.now(),
            request: {
                loading: true,
                error: null,
                data: null
            }
        };

        notifyChanges(new Message(_msg));

        let mediaId;

        if (file) {
            try {
                const res = await createMedia(userId, authorId, {picture: file});
                if (res && res.mediaId) {
                    mediaId = res.mediaId;
                }
            } catch (e) {
                const responseMessage = new Message({
                    ..._msg,
                    request: {
                        ..._msg.request,
                        loading: false,
                        data: null,
                        error: e.message || "An error occurred"
                    }
                });
                notifyChanges(responseMessage);
                return;
            }
        }
        const data = {feedbackText: message};
        if (mediaId) {
            data.mediaId = mediaId;
        }

        try {
            await sendMessage("BACK_OFFICE_USER_ID", this.props.userId, data);
            const responseMessage = new Message({
                ..._msg,
                mediaId,
                request: {
                    ..._msg.request,
                    loading: false,
                    data: "ok",
                    error: null
                }
            });
            if (mediaId) {
                responseMessage.setMedia = file.preview;
            }
            notifyChanges(responseMessage);
        } catch (e) {
            const responseMessage = new Message({
                ..._msg,
                mediaId,
                request: {
                    ..._msg.request,
                    loading: false,
                    data: null,
                    error: e.message || "An error occurred"
                }
            });
            notifyChanges(responseMessage);
        }
    };

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
                <form
                    className="chat-app-input d-flex align-items-center"
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleMsgSubmit();
                    }}>
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
                        <span className="d-lg-block d-none">Envoyer</span>
                    </Button>
                </form>
                <MediaInput
                    show={show}
                    message={msg}
                    onMsgChange={this.onChangeMsg}
                    onSubmit={this.handleMsgSubmit}
                    onClose={() => this.toggleMediaInput(false)}
                />
            </>
        );
    }
}

export default ChatInput;
