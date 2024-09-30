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
        return this.startedAt ? dayjs(this.timestamp(this.startedAt)) : null;
    }

    get renewingDate() {
        return this.renewingAt ? dayjs(this.timestamp(this.renewingAt)) : null;
    }
	
	timestamp(data) {
        let myDate = new Date(data * 1000);
		return myDate.toLocaleString("en-US", {timeZone: "Africa/Douala"});
    }
}
