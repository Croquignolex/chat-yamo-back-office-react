export default class History {
    constructor(history) {
        Object.assign(this, history);

        this.date = this.createdAt;
    }
}
