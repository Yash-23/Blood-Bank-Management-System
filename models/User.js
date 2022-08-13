const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String, required: true
    }, emailAddress: {
        type: String, required: true
    }, firstName: {
        type: String, required: true
    }, lastName: {
        type: String, required: true
    }, phoneNumber: {
        type: String
    }, dateOfBirth: {
        type: Date, default: new Date('December 31, 1999 23:59:59')
    }, bloodDonationCount: {
        type: Number
    }, zip: {
        type: Number
    }, state: {
        type: String
    }, country: {
        type: String
    }, dateOfEntry: {
        type: Date, default: Date.now
    }, allergies: {
        type: String
    }, infection: {
        type: String
    }, bmi: {
        type: Number
    }, recentBodyMod: {
        type: Boolean
    }, bloodGroup: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
