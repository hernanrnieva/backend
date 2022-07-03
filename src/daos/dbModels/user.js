const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    id: {type: String, require: true, max: 100},
    password: {type: String, require: true},
    name: {type: String, require: true},
    age: {type: Number, require: true},
    address: {type: String, require: true},
    phone: {type: String, require: true},
    picture: {type: String, require: true},
    cartId: {type: Number, require: true}
}, {versionKey: false})

module.exports = mongoose.model('users', schemaUser)