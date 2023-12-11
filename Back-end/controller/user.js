const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = require("../model/userModel");
const productDatas = require("../model/productModel");


const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await schema.findOne({ email }); // Check if user already exists
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new schema({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};

// Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await schema.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET,{
        expiresIn:"1hr"
      });

      // res.cookie("token",token,{httpOnly : true, secure:false})
      res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 });

      res.setHeader("Authorization", `Bearer ${token}`);

      res.status(200).json({message :"welcome user", token });
      // res.json({message : "welcome User"})
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};

const userGetProducts = async (req, res) => {
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


// user can get specific product details

const specificProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const specificProduct = await productDatas.findById(req.params.id);

    if (specificProduct) {
      return res
        .status(200)
        .json({ message: "Specific Product :", specificProduct });
    }
    return res.status(404).json({ error: "product not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};






module.exports = {
  userRegister,
  userLogin,
  userGetProducts,
  specificProduct,
};
