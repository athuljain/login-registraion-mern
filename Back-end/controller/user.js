const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')


const schema = require("../model/userModel")

const userRegister = ( async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new schema({ email, password: hashedPassword });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Registration failed');
    }
  });
  
  // Login
  const userLogin=( async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await schema.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email: user.email }, 'secret_key');
        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      res.status(500).send('Login failed');
    }
  });
  module.exports ={
    userRegister,
    userLogin
  }