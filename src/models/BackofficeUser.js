export default class BackofficeUser {
    constructor(backofficeUser) {
        Object.assign(this, backofficeUser);

        this.id = this.userId || this.entityId;
    }
}
