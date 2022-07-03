/* Product Dao declarer */
// const ProductDao = require('../daos/products/productDaoFile')
// const ProductDao = require('../daos/products/productDaoMemory')
const ProductDao = require('../daos/products/productDaoMongoDB')
const products = new ProductDao()

/* Cart Dao declarer */
// const cartDao = require('../daos/carts/cartDaoFile')
// const cartDao = require('../daos/carts/cartDaoMemory')
const CartDao = require('../daos/carts/cartDaoMongoDB')
const carts = new CartDao()

/* User Dao Declarer */
const UserDao = require('../daos/users/userDaoMongoDB')
const users = new UserDao()

module.exports = {carts: carts, products: products, users: users}