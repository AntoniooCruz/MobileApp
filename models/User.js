const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: String
})

module.exports = mongoose.model('User', UserSchema);