import dayjs from "dayjs";
import {MEDIA, joinBaseUrlWithParams} from "../utility/urls/backend";
import {BACK_OFFICE_USER_ID} from "../configs/AppConfig";

export default class Message {
    constructor(message) {
        Object.assign(this, message);
        this.createdAt = dayjs(message.createdAt);
        this.id = message.messageId;

        if(this.mediaId) this.media = require("../assets/img/unknown-user.png");
    }

    set setMedia(media) {
        this.media = media
    }

    get isBackUser() {
        return this.authorId === BACK_OFFICE_USER_ID;
    }

    get imageSrc() {
        return this.media;
    }

    getImageUrl() {
        return this.request
            ? this.request.file.preview
            : this.mediaId
                ? joinBaseUrlWithParams(MEDIA.CHATROOMS.GET_ONE, [
                    {param: 'mediaId', value: this.mediaId},
                    // TODO: Fix
                    // chatroomId = ${userId}:${backOfficeUserId}!!! should be fixed!!
                    {param: 'chatroomId', value: this.caseId},
                ], true)
                : null;
    }
}
