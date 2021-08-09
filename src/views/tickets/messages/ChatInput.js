import {Send} from "react-feather";
import React, {Component} from 'react';
import {Button, Input} from "reactstrap";
import {createMedia, sendMessage} from "../../../redux/actions/IndependentActions";
import {BACK_OFFICE_USER_ID} from "../../../configs/AppConfig";
import Message from "../../../models/Message";
import {NotificationManager} from "react-notifications";
import {getUniqueId} from "../../../helpers/helpers";

class ChatInput extends Component {
    state = {
        msg: ''
    };

    onChangeMsg = (e) => {
        e.preventDefault();
        this.setState({msg: e.target.value});
    };

    handleMsgSubmit = async (e, file = null) => {
        e.preventDefault();
        const {caseId, userId, notifyChanges} = this.props;
        const message = this.state.msg;

        if (message.length === 0) {
            NotificationManager.warning("Vous devez remplir le champ message");
            return;
        }

        const _msg = {
            userId,
            caseId,
            mediaId: null,
            content: message,
            messageId: getUniqueId(),
            authorId: BACK_OFFICE_USER_ID,
            createdAt: Date.now(),
            request: {
                file,
                loading: true,
                error: null,
                data: null
            }
        };

        notifyChanges(new Message(_msg));

        let mediaId;

        if (file) {
            try {
                const res = await createMedia(caseId);
                if (res && res.mediaId) {
                    mediaId = res.mediaId;
                }
            } catch (e) {
                notifyChanges(new Message({
                    ..._msg,
                    request: {
                        ..._msg.request,
                        loading: false,
                        data: null,
                        error: e || "An error occurred"
                    }
                }));
            }
        }
        const data = {feedbackText: message};
        if (mediaId)
            data.mediaId = mediaId;

        try {
            const res = await sendMessage(BACK_OFFICE_USER_ID, this.props.userId, data);
            notifyChanges(new Message({
                ..._msg,
                request: {
                    ..._msg.request,
                    loading: false,
                    error: null,
                    data: res || true
                }
            }));
        } catch (e) {
            notifyChanges(new Message({
                ..._msg,
                request: {
                    ..._msg.request,
                    loading: false,
                    data: null,
                    error: e || "An error occurred"
                }
            }));
        }
    };

    render() {
        const { msg } = this.state;

        return (
            <form
                className="chat-app-input d-flex align-items-center"
                onSubmit={e => this.handleMsgSubmit(e)}>
                <Input
                    type="text"
                    value={msg}
                    className="message mr-1 ml-50"
                    placeholder="Type your message"
                    onChange={this.onChangeMsg}
                />
                <Button color="primary">
                    <Send className="d-lg-none" size={15} />
                    <span className="d-lg-block d-none">Send</span>
                </Button>
            </form>
        );
    }
}

export default ChatInput;
