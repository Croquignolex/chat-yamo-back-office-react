import dayjs from "dayjs";
import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../configs/AppConfig";

export default class Message {
    constructor(message) {
        Object.assign(this, message);
        this.createdAt = dayjs(message.createdAt);
        this.id = message.messageId;

        if(this.mediaId) {
            this.media = require("../assets/img/unknown-user.png");
        }
    }

    set setMedia(media) {
        this.media = media
    }

    get isBackUser() {
        return this.authorId === REACT_APP_CHAT_BACKOFFICE_USER_ID;
    }

    get imageSrc() {
        return this.media;
    }
}
