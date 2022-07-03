const express = require('express')
const router = express.Router()
const productModel = require('../models/products')
const logInfo = require('../logs/loggers').logInfo

// ### Main methods ###
/* Get products */
router.get('/', (req, res) => {
    logInfo(`Accessed - URL: /api/product${req.url} & METHOD: ${req.method}`)
    productModel.getAll(req, res).then((products) => { res.json(products) })
})

/* Get product by id */
router.get('/:id', (req, res) => {
    logInfo(`Accessed - URL: /api/product${req.url} & METHOD: ${req.method}`)
    productModel.getById(req, res).then((pId) => { res.json(pId) })
})

/* Post product */
router.post('/', (req, res) => {
    logInfo(`Accessed - URL: /api/product${req.url} & METHOD: ${req.method}`)
    productModel.save(req, res).then((pId) => res.json(pId))
})

/* Update product by id */
router.put('/:id', (req, res) => {
    logInfo(`Accessed - URL: /api/product${req.url} & METHOD: ${req.method}`)
    productModel.updateById(req, res).then((product) => { res.json(product) })
})

/* Delete product by id */
router.delete('/:id', (req, res) => {
    logInfo(`Accessed - URL: /api/product${req.url} & METHOD: ${req.method}`)
    productModel.deleteById(req, res).then((response) => res.json(response))
})

module.exports = { router: router }