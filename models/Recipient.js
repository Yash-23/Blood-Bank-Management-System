const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }, requirementStatus: {
        type: String
    }, hospital: {
        type: Schema.Types.ObjectId, ref: 'Hospital'
    }
});

module.exports = mongoose.model('Recipient', RecipientSchema);
