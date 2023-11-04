const express = require("express")

const app=express()

const user=require("../controller/user")

app.post("/register",user.userRegister)
app.post("/login", user.userLogin)

module.exports=app