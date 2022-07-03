process.on('exit', () => {
    if(mongoose.connection.readyState == 1) {
        mongoose.disconnect()
    }
})

require('dotenv').config()
const mongoose = require('mongoose')
const ContainerMongoDB = require('../../containers/contMongoDB')
const modelUser = require('../dbModels/user')

/* Mongoose connection */
if(mongoose.connection.readyState == 0) {
    mongoose.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

class UserDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(modelUser)
    }
}

module.exports = UserDaoMongoDB