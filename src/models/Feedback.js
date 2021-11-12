import dayjs from "dayjs";

export default class Feedback {
    constructor(feedback) {
        Object.assign(this, feedback);
        this.createdAt = dayjs(feedback.createdAt);
        this.id = feedback.caseId;
    }

    set setUser(user) {
        this.user = user
    }
}
