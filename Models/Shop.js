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
        required : true,
     enum: ["Electronics","Furnitures","Automobiles","Health&Welness","GeneralStore"]
    },
    
    locationFromVerticalRoadInKM : {
        type : Number, 
        required : true    
    },
    
    locationFromHorizontalRoadInKM : {
        type : Number,
        required : true
    },

    shopkeeper : {
        type : Schema.Types.ObjectId,
        ref : 'Shopkeeper'
    },

    oneDayDeliveryAvailable : {
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
    },
    successfulDeliveries : {
        type : Number,
        default : 0
    },
    failedDeliveries : {
        type : Number, 
        default : 0
    }

})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop