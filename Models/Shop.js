import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shopSchema = new Schema({
    Name : {
        type : String,
        required : true,
        unique : true   
    },

    Category : {
        type : String,
        required : true
    },
    
    locationFromVerticalRoadInKm : {
        type : Number, 
        required : true    
    },
    
    locationFromHorizontalRoadinKM : {
        type : Number,
        required : true
    },

    shopkeeper : {
        type : Schema.Types.ObjectId,
        ref : 'Shopkeeper'
    },

    deliveryAvailable : {
        type : Boolean,
        required : true
    },

    reviews : {
        type : Number,
        max : 5,
        default : 5
    },
    locationFromUser : {
        type : Number,
        default:0
    }

})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop