const mongoose = require("mongoose")

const projectSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Title is required.']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true
    },
    location:{
        type:String,
        required:[true,'Location is required.']
    },
    type:{
        type:String
    },
    architect:{
        type:String,
  
    },
    photography:{
        type:String,
        required:[true,'Photography name is required.']
    },
    imageUrls:{
        type:Array,
        required:true
    },
    description:{
        type:String
    }

},{timestamps:true})

const projectModel = new mongoose.model("projects",projectSchema)

module.exports=projectModel;