import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors';
import bodyParser from 'body-parser';
import videoroutes from './Routes/video.js';
import userroutes from "./Routes/User.js"
import path from 'path'
import commentroutes from './Routes/comment.js';
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))
app.get('/', (req,res)=>{
    res.send("Your tube is working")
})
app.use('/user',userroutes)
app.use(bodyParser.json())
app.use('/video',videoroutes)
app.use('/comment',commentroutes)
const port= process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb Database connected")
}).catch((error)=>{
    console.log(error)
})