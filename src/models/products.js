const productDao = require('../daos/index').products
const logError = require('../logs/loggers').logError

// ### Helper functions ###
const PRODUCT_KEYS = 6
const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS) {
        logError('Object does not have the correct amount of properties')
        throw 'Object does not have the correct amount of properties'
    }

    if(!product.hasOwnProperty('name') ||
       !product.hasOwnProperty('description') ||
       !product.hasOwnProperty('code') ||
       !product.hasOwnProperty('thumbnail') ||
       !product.hasOwnProperty('price') ||
       !product.hasOwnProperty('stock')) {
        logError('Object does not have the correct properties')
        throw 'Object does not have the correct properties'
       }

    return product
}

async function getAll(req, res) {
    try {
        let products = await productDao.getAll()
        if(products.length != 0) 
            return products
        else 
            return 'No products have been loaded yet'
    } catch(e) { return e }
}

async function getById(req, res) {
    try {
        let product = await productDao.getById(req.params.id)
        if(!product) {
            logError(`Product with id ${req.params.id} not found`)
            return `Product with id ${req.params.id} not found`
        }
        else
            return product
    } catch(e) { return e }
}

async function save(req, res) {
    let newProduct
    try {
        newProduct = validateProduct(req.body)

        let data = await productDao.getAll()
        let newId = data.length == 0 ? 1 : data[data.length - 1].id + 1
        newProduct["id"] = newId

        await productDao.save(newProduct, newId)
        return newId
    } catch(e) { return e }
}

async function updateById(req, res) {
    let newProduct
    try {
        newProduct = validateProduct(req.body)
        newProduct = await productDao.updateById(req.params.id, req.body)
        if(!newProduct) {
            logError(`Product with id ${req.params.id} not found`)
            return `Product with id ${req.params.id} not found`
        }
        else
            return newProduct
    } catch(e) { return e }
}

async function deleteById(req, res) {
    try {
        data = await productDao.deleteById(req.params.id)
        return data
    } catch(e) { return e }
}

module.exports = {
    getAll,
    getById,
    save,
    updateById,
    deleteById
}