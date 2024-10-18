const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'First name is require.']
    },
    lastname:{
        type:String,
        required:[true,'Last name is require.']
    },
    email:{
        type:String,
        required:[true,'Email is require.']
    },
    address:{
        type:String,
        required:[true,'Address is require.']
    },
    phone:{
        type:String,
        required:[true,'Phone is require.']
    },
    payment:{
        type:String,
        default:'cash on delivery'
    },
    subtotal:{
        type:Number,
        required:[true,'Subtotal is require.']
    },
    total:{
        type:Number,
        required:[true,'Total is require.']
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1 
            }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    status:{
        type:String,
        default:"order-placed"
    }
},{timestamps:true})

const ordersModel = mongoose.model('orders',ordersSchema)
module.exports=ordersModel;