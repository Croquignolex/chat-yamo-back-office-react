import dayjs from "dayjs";

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
        return this.authorId === "BACK_OFFICE_USER_ID";
    }

    get imageSrc() {
        return this.media;
    }
}
