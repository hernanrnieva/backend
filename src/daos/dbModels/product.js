const mongoose = require('mongoose')

const schemaProduct = new mongoose.Schema({
    id: {type: Number, require: true},
    name: {type: String, require: true, max: 40},
    description: {type: String, require: true, max: 60},
    code: {type: String, require: true, max: 10},
    thumbnail: {type: String, require: true, max: 2048},
    price: {type: Number, require: true},
    stock: {type: Number, require: true}
}, {versionKey: false})

module.exports = mongoose.model('products', schemaProduct)