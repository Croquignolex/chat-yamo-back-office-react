import {joinBaseUrlWithParams, MEDIA} from "../utility/urls/backend";
import {getUserProfileImage} from "../redux/actions/IndependentActions";

export default class User {
    constructor(user) {
        Object.assign(this, user);
        this.id = this.userId;
    }

    get username() {
        return this.name;
    }

    get imageUrl() {
        // this does not work. it seems that the JWT token is missing for the call!
        return joinBaseUrlWithParams(MEDIA.USERS.GET_ONE, [{param: 'userId', value: this.id}], true);
    }

    async imageSrc() {
        // how to make this work??? The JWT is not sent
        const image = await getUserProfileImage(this.id);
        const base64ImageString = Buffer.from(image, 'binary').toString('base64');
        return "data:image/jpg;base64," + base64ImageString;
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
