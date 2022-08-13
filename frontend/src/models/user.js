export default class User {
    constructor(
        authUser,
        fName,
        lName,
        dob,
        dCount,
        location,
        allergies,
        infection,
        bmi,
        rbm,
        bloodG,
    ) {
        if (authUser) {
            this.userId = authUser && authUser.uid;
            this.emailAddress = authUser && authUser.email;
            this.firstName = fName;
            this.lastName = lName;
            this.phoneNumber = authUser && authUser.phoneNumber;
            this.dateOfBirth = dob;
            this.bloodDonationCount = dCount;
            this.zip = location && location.zip;
            this.state = location && location.state;
            this.country = location && location.country;
            this.dateOfEntry = new Date(authUser && authUser.metadata.creationTime);
            this.allergies = allergies;
            this.infection = infection;
            this.bmi = bmi;
            this.recentBodyMod = rbm;
            this.bloodGroup = bloodG;
        }
    }
}
