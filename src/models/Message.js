import dayjs from "dayjs";
import {MEDIA, joinBaseUrlWithParams} from "../utility/urls/backend";

export default class Message {
    constructor(message) {
        Object.assign(this, message);
        this.createdAt = dayjs(message.createdAt);
        this.id = message.messageId;
    }

    getImageUrl() {
        return this.request
            ? this.request.file.preview
            : this.mediaId
                ? joinBaseUrlWithParams(MEDIA.CHATROOMS.GET_ONE, [
                    {param: 'mediaId', value: this.mediaId},
                    {param: 'chatroomId', value: this.caseId},
                ], true)
                : null;
    }
}
