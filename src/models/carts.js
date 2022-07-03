const cartDao = require('../daos/index').carts
const productModel = require('../daos/index').products
const logError = require('../logs/loggers').logError

async function create() {
    let newId = 1
    try {
        let existingCarts = await cartDao.getAll()
        if(existingCarts.length > 0)
            newId = existingCarts[existingCarts.length - 1].id + 1

        const newCart = {
            id: newId,
            timestamp: new Date().toLocaleString(),
            products: []
        }

        await cartDao.save(newCart, newId)
        return newId
    } catch(e) { return e }
}

async function addProduct(pId, cId) {
    try {
        let product = await productModel.getById(pId)
        if(!product) {
            logError(`Product with id ${pId} not found`)
            return `Product with id ${pId} not found`
        }

        let cart = await cartDao.getById(cId)
        if(!cart){
            logError(`Cart with id ${cId} not found`)
            return `Cart with id ${cId} not found`
        }

        let products = cart.products
        products.push(product)

        let newCart = cartDao.updateById(cId, cart)
        if(!newCart) {
            logError(`Error updating cart ${cId}`)
            return `Error updating cart ${cId}`
        }

        return cart
    } catch(e) { return e }
}

async function getProducts(cId) {
    try {
        let cart = await cartDao.getById(cId)
        if(!cart) {
            logError(`Cart with id ${cId} not found`)
            return `Cart with id ${cId} not found`
        }
        
        return cart.products
    } catch(e) { return e }
}

async function deleteById(cId) {
    try {
        result = await cartDao.deleteById(cId)

        return result
    } catch(e) { return e }
}

async function deleteProductById(pId, cId) {
    try {
        let cart = await cartDao.getById(cId)
        if(!cart) {
            logError(`Cart with id ${cId} not found`)
            return `Cart with id ${cId} not found`
        }

        const idx = cart.products.findIndex(p => p.id == pId)
        if(idx < 0) {
            logError (`Product with id ${pId} could not be found in cart with id ${cId}`)
            return `Product with id ${pId} could not be found in cart with id ${cId}`
        }

        cart.products.splice(idx, 1)
        let updatedCart = await cartDao.updateById(cId, cart)
        if(!updatedCart) {
            logError(`Error deleting product ${pId} from cart ${cId}`)
            return `Error deleting product ${pId} from cart ${cId}`
        }

        return updatedCart
    } catch(e) { return e }
}

async function emptyCart(cId) {
    try {
        let cart = await cartDao.getById(cId)
        if(!cart) {
            logError(`Cart with id ${cId} not found`)
            return `Cart with id ${cId} not found`
        }
        
        cart.products = []

        let newCart = cartDao.updateById(cId, cart)
        if(!newCart) {
            logError(`Error updating cart ${cId}`)
            return `Error updating cart ${cId}`
        }

        return cart
    } catch(e) { return e }
}

module.exports = {
    create,
    addProduct,
    getProducts,
    deleteById,
    deleteProductById,
    emptyCart
}