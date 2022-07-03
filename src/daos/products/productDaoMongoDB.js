/* Connection finishing when exititing */
process.on('exit', () => {
    if(mongoose.connection.readyState == 1) {
        mongoose.disconnect()
    }
})

require('dotenv').config()
const mongoose = require('mongoose')
const ContainerMongoDB = require('../../containers/contMongoDB')
const modelProduct = require('../dbModels/product')

/* Mongoose connection */
if(mongoose.connection.readyState == 0) {
    mongoose.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(modelProduct)
    }
}

module.exports = ProductDaoMongoDB