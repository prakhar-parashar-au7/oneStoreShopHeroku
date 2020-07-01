import mongoose from 'mongoose'

const schema = mongoose.Schema

const userSchema = new schema ({
    
    userName : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String||Number,
        required : true
    },

    shopkeeperFriends : {
        type : schema.Types.ObjectId,
        ref : 'shopkeeper'
    },

    
    locationFromVerticalRoadInKM : {
        type : Number, 
        required : true    
    },
    
    locationFromHorizontalRoadInKM : {
        type : Number,
        required : true
    },

    orderPending : {
        type : Boolean,
        default : false
    }


})

const User = mongoose.model('User', userSchema)

export default User