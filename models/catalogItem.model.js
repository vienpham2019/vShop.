const  mongoose = require('mongoose')
const Schema = mongoose.Schema 

const CatalogSchema = new Schema({
    title: {
        type: String, 
        trim: true, 
        required: true
    }, 
    current_price: {
        type: Number, 
        required: true
    },
    sale_price: {
        type: Number, 
        required: true
    },  
    sizes: {
        type: Array
    }, 
    is_New: {
        type: Boolean, 
        required: true
    },
    isSale: {
        type: Boolean, 
        required: true
    },
    colors: {
        type: Array , 
        required: true
    }, 
    img: {
        type: String, 
        required: true 
    },
    category: {
        type: String,
        trim: true,  
        required: true
    }, 
    season: {
        type: String,
        trim: true
    },   
    brand: {
        type: String,
        trim: true, 
        required: true
    }, 
    reviews: {
        type: Array, 
        required: true
    }
})

const menCatalog = mongoose.model('Men' , CatalogSchema)
const womenCatalog = mongoose.model('Women' , CatalogSchema)

module.exports = {
    menCatalog ,
    womenCatalog
}