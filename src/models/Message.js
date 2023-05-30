import dayjs from "dayjs";

import {REACT_APP_CHAT_BACKOFFICE_USER_ID} from "../configs/AppConfig";

export default class Message {
    constructor(message) {
        Object.assign(this, message);
        this.id = message.messageId;

        if(this.mediaId) {
            this.media = require("../assets/img/unknown-user.png");
        }

        // backofficeUserName
    }

    set setImageMedia(media) {
        this.type = 'image';
        this.media = media;
    }

    set setVideoMedia(media) {
        this.type = 'video';
        this.media = media;
    }

    set seRequest(request) {
        this.request = request;
    }

    set setMedia(image) {
        // const base64ImageString = Buffer.from(image, 'binary').toString('base64');
        // this.media = "data:image/jpg;base64," + base64ImageString;
        this.media = image?.compressedPreSignedUrl || image?.originalPreSignedUrl;
    }

    set setType(type) {
        this.type = type;
    }

    get isBackUser() {
        return this.authorId === REACT_APP_CHAT_BACKOFFICE_USER_ID;
    }

    get backofficeUser() { 
        return this.backofficeUserName?.split(' ').map(word => word[0]).join('').toUpperCase();
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

    get createdDate() {
        return this.createdAt ? dayjs(this.createdAt) : dayjs();
    }
}
