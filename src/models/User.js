import dayjs from "dayjs";

export default class User {
    constructor(user) {
        Object.assign(this, user);

        this.id = this.userId;

        if(this.isDeleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = this.avatar ? this.avatar : require("../assets/img/unknown-user.png");
    }

    set setAvatar(image) {
        this.avatar = image?.compressedPreSignedUrl || image?.originalPreSignedUrl;
    }

    set setImages(images) {
        this.images = images;
    }

    set setLastMessageTime(time) {
        this.lastMessageTime = time;
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

    set setStatus(status) {
        this.deleted = status?.deleted;
        this.blocked = status?.blocked;
    }

    get isDeleted() {
        return this.deleted;
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
