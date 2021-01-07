const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Company', CompanySchema);