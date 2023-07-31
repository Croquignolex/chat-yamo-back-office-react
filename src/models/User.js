import dayjs from "dayjs";

export default class User {
    constructor(user) {
        Object.assign(this, user);

        this.id = this.userId;

        this.deleted = (this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID");

        if(this.deleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setAvatar(image) {
        const url = (
            image?.compressedPreSignedUrl ||
            image?.originalPreSignedUrl ||
            image?.compressedUrl ||
            image?.originalUrl
        );

        if(url) this.avatar = url;
    }

    set setImages(images) {
        this.images = images;
    }

    set setLastMessageTime(time) {
        this.lastMessageTime = time;
    }

    set setPendingMessage(flag) {
        this.pendingMessage = flag;
    }

    get isPendingMessage() {
        return this.pendingMessage;
    }

    set setId(id) {
        this.id = id;
    }

    get username() {
        return this.name;
    }

    get imageSrc() {
        return this.avatar;
    }

    set setCertified(identify) {
        this.certified = identify?.identityVerified;
    }

    set setStatus(status) {
        this.deleted = status?.deleted || this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID";
        this.blocked = status?.blocked;

        if(this.deleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setForceStatus(status) {
        this.deleted = this.name === "chat_yamo_deleted_account" || this.id === "EMPTY_USER_ID";
        this.blocked = status?.blocked;

        this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setSuspiciousState(state) {
        this.blacklisted = !!state;
    }

    get isCertified() {
        return this.certified;
    }

    get isDeleted() {
        return this.deleted;
    }

    get isBlacklisted() {
        return this.blacklisted;
    }

    get isBlocked() {
        return this.blocked;
    }

    get isNotFound() {
        return this.notFound;
    }

    get localisation() {
        return this.isDeleted ? "" : `${this.city}, ${this.country}`;
    }

    get subscriptionEndDate() {
        return this.subscriptionEnd && dayjs(this.subscriptionEnd).format('LL');
    }

    get isSubscriptionAvailable() {
        return this.subscriptionEnd && dayjs().isAfter(dayjs(this.subscriptionEnd));
    }
}
