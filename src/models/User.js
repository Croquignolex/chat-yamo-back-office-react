export default class User {
    constructor(user) {
        Object.assign(this, user);
        this.id = this.userId;
        console.log(user)
    }

    set profileImage(avatar) {
        this.avatar = avatar
    }

    get username() {
        return this.name;
    }

    get imageSrc() {
        if(this.isDeleted) return require("../assets/img/user-remove.png");

        if(!this.avatar) return require('../assets/img/unknown-user.png');

        return this.avatar;
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

    get isDeleted() {
        return this.name === "chat_yamo_deleted_account";
    }

    get localisation() {
        return `${this.city}, ${this.country}`;
    }
}
