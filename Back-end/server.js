const express = require('express')
const mongoose= require('mongoose')
// const bcrypt=require('bcrypt')
// const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app= express()

app.use(express.json())
app.use(cors())


// connect to mongoDb


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("data base connect");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(cookieParser())
//admin routes

const adminRoute=require('./routes/adminRoute')
app.use("/admin",adminRoute)


// user Routes

const userRoute = require('./routes/userRoute')

app.use("/user",userRoute)


  app.listen(5000,()=>{
    console.log('Server is Running on port 5000');
  })