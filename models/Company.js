const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    name: String,
    phone_number: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Company', CompanySchema);