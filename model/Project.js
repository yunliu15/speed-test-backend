const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const domainSchema = new Schema({
    domainName: {
        type: String,
        required: true
    }
})

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    domains: [domainSchema]
})


module.exports = mongoose.model('Project', projectSchema);