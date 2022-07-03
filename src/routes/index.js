/* Module imports */
const express = require('express')
const router = express.Router()

/* File imports */
const passport = require('../passport/passport')
const productRouter = require('./products').router
const cartRouter = require('./carts')
const productModel = require('../models/products')
const cartModel = require('../models/carts')
const { logInfo, logWarn, logError } = require('../logs/loggers')
const upload = require('../multer/multer')

/* Router redirects */
router.use('/products', productRouter)
router.use('/cart', cartRouter)

/* Routes */
router.get('/register', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    res.render('layouts/register')
})

router.post('/register', upload.single('picture'), passport.authenticate('register', {
    failureRedirect: '/api/register-fail',
    successRedirect: '/api/home'
}))

router.get('/register-fail', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    res.render('layouts/register-fail')
})

router.get('/login', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    res.render('layouts/login')
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/login-fail',
    successRedirect: '/api/home'
}), (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
})

router.get('/login-fail', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    res.render('layouts/login-fail')
})

router.get('/home', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    if(req.session.data) {
        // if(req.session.data.picture == '') {
        //     userModel.updatePicture(req.session.data, )

        // }
        productModel.getAll().then((products) => {
            cartModel.getProducts(req.session.data.cartId).then((cartProducts) =>{
                res.render('layouts/home', {products: products, user: req.session.data, cartProducts: cartProducts})
            })
        })
    }

    else {
        logWarn(`Accessed /api${req.url} without active session`)
        res.redirect('/api/login')
    }
})

router.get('/logout', (req, res) => {
    logInfo(`Accessed - URL: /api${req.url} & METHOD: ${req.method}`)
    const user = req.session.data.name
    req.session.destroy((e) => {
        if(e) 
            res.json(e)
        else
            res.render('layouts/goodbye', {username: user})
    })
})

module.exports = router