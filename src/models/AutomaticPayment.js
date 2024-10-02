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
        const timestamp = (this.source === "PAYPAL") ? data : data * 1000;

        let myDate = new Date(timestamp);
		return myDate.toLocaleString("en-US", {timeZone: "Africa/Douala"});
    }
}
