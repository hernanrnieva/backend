const express = require('express')
const router = express.Router()
const cartModel = require('../models/carts')
const logInfo = require('../logs/loggers').logInfo
const {sendNewOrderMail} = require('../mailer/config')

/* Create cart */
router.post('/', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.create().then((newId) => { res.json(newId) })
})

/* Add product to cart */
router.post('/:id/products', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.addProduct(req.body.id, req.params.id).then((cart) => { 
        res.redirect('../../../api/home')
    })
})

/* Get products from cart with id */
router.get('/:id/products', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.getProducts(req.params.id).then((products) => { res.json(products) })
})

/* Delete cart by id */
router.delete('/:id', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.deleteById(req.params.id).then((result) => { res.json(result) })
})

/* Delete product with id from cart with id */
router.delete('/:id/products/:idProd', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.deleteProductById(req.params.idProd, req.params.id).then((updatedCart) => { res.json(updatedCart) })
})

/* Buy cart */
router.post('/empty/:id', (req, res) => {
    logInfo(`Accessed - URL: /api/cart${req.url} & METHOD: ${req.method}`)
    cartModel.getProducts(req.params.id).then((products) => {
        sendNewOrderMail(req.session.data, products)
        cartModel.emptyCart(req.params.id).then((updatedCart) =>{
            res.redirect('/api/home')
        })
    })
})

module.exports = router