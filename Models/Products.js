import mongoose from 'mongoose'

const schema = mongoose.Schema

const productSchema = new schema({

    Name : {
        type : String,
        required : true
    },

    priceInInr : {
        type : Number,
        required : true
    },

    features : {
        type : Array,
        required : true
    },

    piecesAvailable : {
        type : Number,
        required : true,
    },

    shop : {
        type : schema.Types.ObjectId,
        ref : 'Shop'
    },

    Category : {
        type : String,
        default : ""      
    },

    currentBookings : {
        type : Number,
        default : 0
    }

})

    const Products = mongoose.model('Products', productSchema)

    export default Products
    




