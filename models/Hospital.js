const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    hospitalId: {
        type: String, required: true
    }, emailAddress: {
        type: String
    }, name: {
        type: String
    }, phoneNumber: {
        type: String
    }, zip: {
        type: Number
    }, state: {
        type: String
    }, county: {
        type: String
    }, dateOfEntry: {
        type: Date, default: Date.now
    }, hospitalBedCount: {
        type: Number
    }, FipsStateAndCountryCode: {
        type: Number
    },
    availableServices: [{
        type: String, enum: ['emergency', 'blood-bank', 'others']
    }], bloodBank: [{
        type: String
    }]
});

module.exports = mongoose.model('Hospital', HospitalSchema);
