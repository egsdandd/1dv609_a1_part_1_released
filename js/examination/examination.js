class User {
    constructor(userName, email) {
        if (email.getDomainName() !== 'lnu.se') {
            throw new Error('Email must be from lnu.se domain');
        }
        this.userName = userName;
        this.email = email;
    }
}
export { User };

