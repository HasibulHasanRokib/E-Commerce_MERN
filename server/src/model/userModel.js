const mongoose = require ("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },

    avatar:{
        type:String,
        default:'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    },
    gender:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userModel = new mongoose.model('users',userSchema)
module.exports= userModel;