const ContainerFile = require('../../containers/contFile')
const URL = './carts.txt'
class CartDaoFile extends ContainerFile{
    constructor(){
        super(URL)
    }
}

module.exports = CartDaoFile
