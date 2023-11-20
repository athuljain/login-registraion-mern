const express = require("express")


const jwt= require("jsonwebtoken")
const schema= require('../model/userModel')
const productDatas= require('../model/productModel')


// admin Login

const adminLogin= async(req,res)=>{
    try{
        const email=req.body.email;
        const password= req.body.password
        if(email !== "admin@gmail.com" || password !== "admin123"){
            throw new Error("Invalid Email or Password")
        }
        const token=jwt.sign({email},process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.cookie("token",token)
        res.setHeader("Authorization",token)

        res.json({message:"welcome, Admin",token})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}


const createProduct=async(req,res)=>{
    try{
        await productDatas.insertMany([
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
                brand:req.body.brand  
            }
        ])
        res.status(201).json({message : "Product Create Successfully"})
        console.log("product create successfully");
    }catch(error){
        res.status(500)
        .json({message :"Failed to create Product",error: error.message})
    }
}







module.exports={
    adminLogin,
    createProduct,
}