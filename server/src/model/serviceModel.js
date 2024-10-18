const mongoose = require ("mongoose")

const serviceSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Designer name is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.']
    },
  
    address:{
        type:String,
        required:[true,'Address is required.']

    },
    phone:{
        type:String,
        required:[true,'phone is required.']

    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    servicesName:[
        {
            type:String,
            required:[true,'Service is required.']
        }
    ],
    portfolioId:{
        type:mongoose.Types.ObjectId,
        ref:'projects'
    }



},{timestamps:true})

const serviceModel = new mongoose.model('services',serviceSchema)
module.exports= serviceModel;