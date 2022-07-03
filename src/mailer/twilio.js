const twilio = require('twilio')
const logError = require('../logs/loggers').logError

const accountSid = 'AC4fac3d87bb1d65c1f5e1ce2b575f4cac'
const authToken = 'beccea78504acc9174ab5cb0f557b67e'
const phone = '+19854667675'
const whatsappPhone = 'whatsapp:+14155238886'

const client = twilio(accountSid, authToken)

async function sendSmsConfirmation(userPhone){
    try {
        await client.messages.create({
            body: 'Hi! this is a message from the CoderHouse backend to let you know that your request has been received and is being processed.',
            from: phone,
            to: userPhone
        })
    } catch(e) {
        logError(`Error sending sms message: ${e}`)
    }
}

async function sendWhatsappConfirmation(emailSubject){
    try {
        await client.messages.create({
            body: emailSubject,
            from: whatsappPhone,
            to: 'whatsapp:+5491130901857'
        })
    } catch(e) {
        logError(`Error sending whatsapp message: ${e}`)
    }
}

module.exports = {
    sendSmsConfirmation,
    sendWhatsappConfirmation
}