import dayjs from "dayjs";

export default class Feedback {
    constructor(feedback) {
        Object.assign(this, feedback);

        this.id = feedback.caseId;
    }

    set setUser(user) {
        this.user = user
    }

    get createdDate() {
        return this.createdAt ? dayjs(this.createdAt) : dayjs();
    }
}
