import dayjs from "dayjs";

export default class Souscriptions {
    constructor(souscriptions) {
        Object.assign(this, souscriptions);

        this.type = this.subscriptionType || "Unknow";
    }

    get startDate() {
        return this.subscriptionStart ? dayjs(this.subscriptionStart) : dayjs();
    }

    get endDate() {
        return this.subscriptionEnd ? dayjs(this.subscriptionEnd) : dayjs();
    }
}