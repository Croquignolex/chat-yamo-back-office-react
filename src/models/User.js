export default class User {
    constructor(user) {
        Object.assign(this, user);
    }

    get username() {
        return this.name;
    }

    get imageUrl() {
        // return `${this.id}`;
        return `https://picsum.photos/200`;
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
