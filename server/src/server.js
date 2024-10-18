const app = require('./app');
const connectDB = require('./db');

const PORT = 3000;
app.listen(PORT,async()=>{
    console.log(`server is running on http://localhost:${PORT}`)
    await connectDB();
})

//server error
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})