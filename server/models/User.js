const { boolean } = require('joi');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: String,
    is_admin: {type: boolean, required: true}
})

module.exports = mongoose.model('User', UserSchema);