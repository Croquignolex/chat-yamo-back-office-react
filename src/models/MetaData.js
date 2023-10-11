import dayjs from "dayjs";

export default class MetaData {
    constructor(metadata) {
        Object.assign(this, metadata);

        this.id = metadata.identifier;
        this.oldPhone = metadata.oldPhoneNumber;
        // this.creation = dayjs(metadata.accountCreationDate).format('MMMM D, YYYY at HH:mm');
        this.creation = metadata.accountCreationDate;
    }

    get createdDate() {
        return this.createdAt ? dayjs(this.createdAt) : dayjs();
    }
}
