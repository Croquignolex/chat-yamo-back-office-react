export default class BackofficeUser {
    constructor(backofficeUser) {
        Object.assign(this, backofficeUser);

        this.id = this.userId || this.entityId;
    }

    get getRoles() {
        let roles = [];
        this.roles.forEach((role) => {
            if(role.toLowerCase() === "admin") roles.push({text: "Admin", color: "light-danger"});
            else if(role.toLowerCase() === "writer") roles.push({text: "Writer", color: "light-warning"});
            else if(role.toLowerCase() === "reader") roles.push({text: "Reader", color: "light-primary"});
            else roles.push({text: "Unknown", color: "secondary"});
        });
        return roles;
    }
}
