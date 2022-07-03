class ContainerMemory{
    /* Constructor */
    constructor(){
        this.data = []
    }

    /* Methods */
    async save(product){
        /* Makes a copy of the original object not to disturb it */
        const newProduct = Object.assign({}, product) 
        const newId = this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1
        newProduct["id"] = parseInt(newId) 

        /* Writes */
        this.data.push(newProduct)
        return newProduct
    }

    async getById(id){
        return this.data.find(p => id == p.id)
    }
    
    async getAll(){
        return this.data
    }

    async updateById(pId, product){
        let idx = this.data.findIndex(p => p.id == pId)
        if(idx < 0)
            return `Product with id ${pId} could not be found`
    
        product["id"] = parseInt(pId)
        this.data[idx] = product
        return product
    }

    async deleteById(id){
        const idx = this.data.findIndex(p => p.id == id)
        if(idx < 0)
            return `Product with id ${id} could not be found`

        return this.data.splice(idx, 1)
    }

    async deleteAll(){
        this.data = []
    }
}

module.exports = ContainerMemory