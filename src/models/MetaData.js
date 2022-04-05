import dayjs from "dayjs";

export default class MetaData {
    constructor(metadata) {
        Object.assign(this, metadata);

        this.id = metadata.identifier;
        this.oldPhone = metadata.oldPhoneNumber;
    }

    get createdDate() {
        return this.createdAt ? dayjs(this.createdAt) : dayjs();
    }
}
