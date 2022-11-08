import {BACKOFFICE_USERS_ROLES} from "../configs/AppConfig";

export default class BackofficeUser {
    constructor(backofficeUser) {
        Object.assign(this, backofficeUser);

        this.id = this.userId || this.entityId;
    }

    get getRoles() {
        let formattedRoles = [];

        // Search
        this.roles.forEach((role) => {
            const needleRole = BACKOFFICE_USERS_ROLES.find((item) => item.value === role);
            formattedRoles.push(needleRole);
        });

        // In case no role is found
        if(formattedRoles.length === 0) formattedRoles.push({label: "Unknown", className: "secondary"});

        return formattedRoles;
    }
}
