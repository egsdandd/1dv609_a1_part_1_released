class User {
    constructor(userName, email) {
        this.email = email;
        if (this.#getDomainName() !== 'lnu.se') {
            throw new Error('Email must be from lnu.se domain');
        }
        this.userName = userName;
    }
    #getDomainName() {
        const parts = this.email.split('@');
        return parts.length === 2 ? parts[1] : '';
    }

}
export { User };