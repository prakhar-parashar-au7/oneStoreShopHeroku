import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shopkeeperSchema = new Schema ({

    userName : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String||Number,
        required : true
    }
   

})

const Shopkeeper = mongoose.model ('Shopkeeper', shopkeeperSchema)

export default Shopkeeper