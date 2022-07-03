/* Module imports */
const passport = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require ('bcrypt')

/* File imports */
const userDao = require('../daos/index').users
const cartModel = require('../models/carts')
const {sendNewUserMail} = require('../mailer/config')

/* Bcrypt settings */
const saltRounds = 2

/* Configuration */
// Login
passport.use('login', new localStrategy({usernameField: 'email', passReqToCallback: true}, async function(req, username, password, done) {
    const exists = await userDao.getById(username)
    if(!exists)
        return done(null, false)
    
    bcrypt.compare(password, exists.password, (err, result) => {
        if(!result)
            return done(null, false)
            
        req.session.data = (({ name, picture, address, id, phone, cartId }) => ({ name, picture, address, id, phone, cartId }))(exists);
        return done(null, exists)
    })
}))

// Register
passport.use('register', new localStrategy({usernameField: 'email', passReqToCallback: true}, async function(req, username, password, done) {
    // TODO: validate user. Pass it to another module?
    const exists = await userDao.getById(username)
    if(exists)
        return done(null, false)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = req.body
        newUser.picture = '/imgs/' + req.file.filename
        console.log(newUser.picture)
        newUser.password = hash
        newUser.id = username
        cartModel.create().then((cartId) =>{
            newUser.cartId = cartId
            userDao.save(newUser).then(() => {
                req.session.data = (({ name, picture, address, id, phone, cartId }) => ({ name, picture, address, id, phone, cartId }))(newUser);
                sendNewUserMail(newUser)
                return done(null,newUser)
            }).catch((e) => {
                console.log(e)
            })
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async function(user, done) {
    const dsUser = userDao.getById(user.id)
    done(null, dsUser)
})

module.exports = passport