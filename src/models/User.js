import React from "react";

export default class User {
    constructor(user) {
        Object.assign(this, user);
        this.id = this.userId;

        if(this.isDeleted) this.avatar = require("../assets/img/user-remove.png");
        else this.avatar = require("../assets/img/unknown-user.png");
    }

    set setAvatar(avatar) {
        this.avatar = avatar
    }

    get username() {
        return this.name;
    }

    get imageSrc() {
        return this.avatar;
    }

    get isDeleted() {
        return this.name === "chat_yamo_deleted_account";
    }

    get localisation() {
        return `${this.city}, ${this.country}`;
    }

    getStatus() {
        switch (this.status) {
            case "do not disturb":
                return "avatar-status-busy";
            case "away":
                return "avatar-status-away";
            case "offline":
                return "avatar-status-offline";
            default:
                return "avatar-status-online";
        }
    }
}
