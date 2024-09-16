import dayjs from "dayjs";

export default class AutomaticPayment {
    constructor(automaticPayments) {
        Object.assign(this, automaticPayments);

        this.pack = this.subscriptionPack || "";
        this.currency = this.currency || "";
        this.amount = this.amount || "";
        this.period = this.period || "";
        this.source = this.source || "";
    }

    get startDate() {
        return this.startedAt ? dayjs(this.startedAt) : dayjs();
    }

    get renewingDate() {
        return this.renewingAt ? dayjs(this.renewingAt) : dayjs();
    }
}
