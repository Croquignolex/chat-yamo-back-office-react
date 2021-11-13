import dayjs from "dayjs";

import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../configs/AppConfig";

export default class Message {
    constructor(message) {
        Object.assign(this, message);
        this.createdDate = dayjs(message.createdAt);
        this.id = message.messageId;

        if(this.mediaId) {
            this.media = require("../assets/img/unknown-user.png");
        }
    }

    set setPlainMedia(media) {
        this.media = media;
    }

    set setMedia(image) {
        const base64ImageString = Buffer.from(image, 'binary').toString('base64');
        this.media = "data:image/jpg;base64," + base64ImageString;
    }

    get isBackUser() {
        return this.authorId === REACT_APP_CHAT_BACKOFFICE_USER_ID;
    }

    get imageSrc() {
        return this.media;
    }

    get createdFullDate() {
        return this.createdDate.format("DD-MM-YYYY HH:mm:ss");
    }

    get createdTime() {
        return this.createdDate.format("HH:mm");
    }
}
