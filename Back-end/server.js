const express = require('express')
const mongoose= require('mongoose')

const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app= express()

app.use(express.json())



// app.use(cors({
//   origin: 'http://localhost:3000',  // Replace with your front-end URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// Custom CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your front-end URL
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(cookieParser())


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


//admin routes

const adminRoute=require('./routes/adminRoute')
app.use("/admin",adminRoute)


// user Routes

const userRoute = require('./routes/userRoute')

app.use("/user",userRoute)


  app.listen(5000,()=>{
    console.log('Server is Running on port 5000');
  })