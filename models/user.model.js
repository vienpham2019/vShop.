const  mongoose = require('mongoose')
const Schema = mongoose.Schema 

const userSchema = new Schema({
    first_name: {
        type: String, 
        trim: true, 
        required: true 
    },
    last_name: {
        type: String, 
        trim: true,
        required: true 
    },
    email: {
        type: String, 
        trim: true, 
        required: true 
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String ,
        trim: true ,
        required: true
    },
    orders: {
        type: Array
    }, 
    widhlist: {
        type: Array
    },
    addresses: {
        type: Array
    }
})

const User = mongoose.model('User' , userSchema)

module.exports = User