const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors=require('cors');
const authRouter = require('./router/authRouter');
const projectRouter = require('./router/projectRouter');
const productRouter = require('./router/productRouter');
const designerRouter = require('./router/designerRouter');
const orderRouter = require('./router/orderRouter');
const serviceRouter = require('./router/serviceRouter');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(cors({credentials:true,origin:'http://localhost:5173'}));


//router
app.get('/',(req,res)=>{
    res.status(200).send('welcome to the server.')
})
app.use('/auth/user',authRouter)
app.use('/api',projectRouter)
app.use('/api',productRouter)
app.use('/api',designerRouter)
app.use('/api/orders',orderRouter)
app.use('/api/service',serviceRouter)

//router error
app.use((req,res,next)=>{
    res.status(404).send('Page not found!')
})


module.exports=app;