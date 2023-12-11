const express = require("express");

const app = express();

const user = require("../controller/user");
const bodyParser = require("body-parser");

const userMiddleware = require('../middileware/userMiddileware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", user.userRegister);
app.post("/login",  user.userLogin);
app.get("/getProducts",user.userGetProducts)
app.get("/products/:id", user.specificProduct);
 app.get("/products/category/:category",  user.getCategoryWise);
app.post("/products/cart/:id",  user.addToCart);

module.exports = app;
