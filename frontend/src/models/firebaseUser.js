export default class FirebaseUser {
    constructor(user) {
        this.uid = user.uid;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.displayName = user.displayName;
        this.metadata = { creationTime: user.metadata };
    }
}
