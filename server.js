import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from '../backend/config/DBconfig.js'
import authRoutes from "../backend/routes/authRoutes.js"



//configre env
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth',authRoutes)

// rest api
app.get('/',(req,res)=>{
    res.send('<h1>welcome</h1>');
})


//port
const  PORT = process.env.PORT || 2023;

//runing server
app.listen(PORT, ()=>{console.log(`listening on ${PORT}`)})