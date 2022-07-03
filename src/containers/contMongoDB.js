const mongoose = require('mongoose')
class ContainerMongoDB{
    /* Constructor */
    constructor(model){
        this.model = model
    }

    /* Methods */
    async save(element){
        try{
            await this.model.create(element)
        }catch(e){
            console.log(e)
        }
    }

    async getById(id){
        try{
            const elements = await this.getAll()
            return elements.find(e => e.id == id)
        }catch(e){
            console.log(e)
        }
    }
    
    async getAll(){
        try{
            const elements = await this.model.find({}).lean()
            return elements
        }catch(e){
            console.log(e)
        }
    }

    async updateById(pId, product){
        try{
            let newProduct = await this.model.findOneAndUpdate({id: pId}, product, {returnOriginal: false})
            return newProduct
        }catch(e){
            console.log(e)
        }
    }

    async deleteById(pId){
        try{
            let result = await this.model.deleteOne({id: pId})
            if(result.deletedCount == 0)
                return `Element with id ${pId} could not be deleted`
            else
                return `Element with id ${pId} deleted successfully`
        }catch(e){
            console.log(e)
        }
    }

    async deleteAll(){
        try{
            this.model.deleteMany()
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = ContainerMongoDB