const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Domain = require('./Domain'); 

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    domains: [Domain.schema]
})

module.exports = mongoose.model('Project', projectSchema);