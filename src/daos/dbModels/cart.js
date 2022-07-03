const mongoose = require('mongoose')

const schemaCart = new mongoose.Schema({
    id: {type: Number, require: true},
    timestamp: {type: String, require: true, max: 100},
    products: {type: Array, require: true}
}, {versionKey: false})

module.exports = mongoose.model('carts', schemaCart)