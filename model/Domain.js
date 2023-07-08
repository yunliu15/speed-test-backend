const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
    domainName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Domain', domainSchema);