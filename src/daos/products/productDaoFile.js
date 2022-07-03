const ContainerFile = require('../../containers/contFile')
const URL = './products.txt'
class ProductDaoFile extends ContainerFile{
    constructor(){
        super(URL)
    }
}

module.exports = ProductDaoFile