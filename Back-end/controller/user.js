const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = require("../model/userModel");

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
module.exports = {
  userRegister,
  userLogin,
};
