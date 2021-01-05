const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    name: String
})

module.exports = mongoose.model('User', UserSchema);