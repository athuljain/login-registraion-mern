const express = require("express");

const app = express();

const user = require("../controller/user");
const bodyParser = require("body-parser");

const checkUserToken = require('../middileware/userMiddileware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", user.userRegister);
app.post("/login", checkUserToken, user.userLogin);

module.exports = app;
