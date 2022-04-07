export default class BackofficeUser {
    constructor(backofficeUser) {
        Object.assign(this, backofficeUser);

        this.id = this.entityId;
    }

    get getRoles() {
        let roles = [];
        this.roles.forEach((role) => {
            if(role.toLowerCase() === "admin") roles.push({text: "Admin", color: "danger"});
            else if(role.toLowerCase() === "writer") roles.push({text: "Writer", color: "warning"});
            else if(role.toLowerCase() === "reader") roles.push({text: "Reader", color: "primary"});
            else roles.push({text: "Unknown", color: "secondary"});
        });
        return roles;
    }
}
