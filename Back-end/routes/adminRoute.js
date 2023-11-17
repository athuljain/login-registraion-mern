const express = require('express')
const bodyparser = require('body-parser')
const app=express()

const admin = require('../controller/admin')
const checkAdminToken= require('../middileware/adminMiddileware')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.post("/login",admin.adminLogin)
app.post("/products",checkAdminToken,admin.createProduct)



module.exports = app;