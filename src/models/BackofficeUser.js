export default class BackofficeUser {
    constructor(backofficeUser) {
        Object.assign(this, backofficeUser);

        this.id = this.username;
    }

    get getRoles() {
        let roles = [];
        this.roles.forEach((role) => {
            if(role.toLowerCase() === "writer") roles.push({text: "Writer", color: "primary"});
            else if(role.toLowerCase() === "admin") roles.push({text: "Admin", color: "danger"});
            else roles.push({text: "Unknown", color: "secondary"});
        });
        return roles;
    }
}
