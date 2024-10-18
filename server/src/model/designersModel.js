const mongoose = require ("mongoose")

const designerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Designer name is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.']
    },
    description:{
        type:String,
        required:[true,'Description is required.']
    },
    address:{
        type:String,
        required:[true,'Address is required.']

    },
    avatar:{
        type:String,
    },
    gender:{
        type:String,
        required:[true,'Gender is required.']

    },

    status:{
        type:String,
        default:"available"
    },
    fbLink:{
        type:String, 
    },
    twitterLink:{
        type:String, 
    },
    instagramLink:{
        type:String, 
    },
    youtubeLink:{
        type:String, 
    }

},{timestamps:true})

const designerModel = new mongoose.model('designers',designerSchema)
module.exports= designerModel;