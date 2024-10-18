const mongoose = require('mongoose')
require('dotenv').config()

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MongoDB_URL)
        console.log('Database is connected.')
    } catch (error) {
        console.log('Database is not connected.',error)
    }
}

module.exports=connectDB;