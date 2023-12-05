const express = require("express");

const jwt = require("jsonwebtoken");
const schema = require("../model/userModel");
const productDatas = require("../model/productModel");

// admin Login

const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email !== "admin@gmail.com" || password !== "admin123") {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.setHeader("Authorization", token);

    res.json({ message: "welcome, Admin", token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    await productDatas.insertMany([
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        brand: req.body.brand,
      },
    ]);
    res.status(200).json({ message: "Product Create Successfully" });
    console.log("product create successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create Product", error: error.message });
  }
};

// find all product details

const getProducts = async (req, res) => {
  try {
    const allProducts = await productDatas.find();
    res.status(200).json({ message: "All Product List", allProducts });
  } catch (error) {
    res
      .status(404)
      .json({ message: "All Product List Not Found: ", error: error.message });
    console.log(error);
  }
};

// update Product

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, description, price, image, category, brand } = req.body;

    const updatedProduct = await productDatas.findOneAndUpdate(
      { _id: id },
      { title, description, price, image, category, brand },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete Product

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);

  try {
    const deleteProduct = await productDatas.deleteOne({ _id: id });
    console.log(deleteProduct);
    if (deleteProduct) {
      res
        .status(200)
        .json({ message: "product Deleted", product: deleteProduct });
      return;
    }
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Sever Error", error: error.message });
  }
};

module.exports = {
  adminLogin,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
