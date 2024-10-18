const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String, 
        trim:true,
        required:[true,'Product name is required.']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true,
        required:[true,'Product description is required.']
    },
    brand:{
        type:String
    },
    regularPrice:{
        type:Number,
        trim:true,
        required:[true,'Product price is required.'],
        
      
    },
    discountPercentage:{
        type:Number,
        default:0
    },

    sold:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        trim:true,
        required:[true,'Product quantity is required.'],
    },
 
    category:{
        type:String,
        required:[true,'Product category is required.']
    },
    imageUrls:{
        type:Array,
        required:true
    }
 
},{timestamps:true})

const productModel = mongoose.model('products',productSchema)

module.exports=productModel;