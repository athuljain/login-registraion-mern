const express = require('express')
const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app= express()
app.use(express.json())
app.use(cors())


// connect to mongoDb


mongoose
  .connect("mongodb://127.0.0.1:27017/Register", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("data base connect");
  })
  .catch(() => {
    console.log("connection failed");
  });


// user Routes

const userRoute = require('./routes/userRoute')
app.use("/user",userRoute)


  app.listen(5000,()=>{
    console.log('Server is Running on port 5000');
  })