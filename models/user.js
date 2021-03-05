const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "id": Number,
    "name": String,
    "surname": String,
    "email": String

    }, {
        versionKey: false
    });

module.exports = mongoose.model('User', userSchema);