const createTransport = require('nodemailer').createTransport
const logInfo = require('../logs/loggers').logInfo
const logError = require('../logs/loggers').logError
const util = require('util')
const {sendSmsConfirmation, sendWhatsappConfirmation} = require('./twilio')

const TEST_MAIL = 'trace.shields94@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: '3y1zFa6Qq1XEU6BqjR'
    }
})

async function sendNewUserMail(user) {
    const config = {
        from: 'NodeJs Server',
        to: TEST_MAIL,
        subject: `New User Registered: ${user.name}`,
        html: `<h1>Further data:</h1>
                <h2><b>Email:</b> ${user.id}</h2>
                <h2><b>Address:</b> ${user.address}</h2>
                <h2><b>Age:</b> ${user.age}</h2>
                <h2><b>Telephone:</b> ${user.phone}</h2>`
    }

    try {
        await transporter.sendMail(config)
    } catch(e) {
        logError(`Error sending new user registration email: ${e}`)
    }
}

async function sendNewOrderMail(user, products) {
    const fProducts = util.inspect(products, true, 2, false)
    const subject = `New Order Received From ${user.name}: ${user.id}`
    const config = {
        from: 'NodeJs Server',
        to: TEST_MAIL,
        subject: subject,
        html: `<h1>Further data:</h1>
                <h2><b>Address:</b> ${user.address}</h2>
                <h2><b>Products:</b> ${fProducts}</h2>`
    }

    sendWhatsappConfirmation(subject)
    sendSmsConfirmation('+' + user.phone)
    try {
        await transporter.sendMail(config)
    } catch(e) {
        logError(`Error sending new user order email: ${e}`)
    }
}
module.exports = {
    sendNewUserMail,
    sendNewOrderMail
}