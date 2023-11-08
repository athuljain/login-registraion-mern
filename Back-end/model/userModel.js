  
  const mongoose = require("mongoose")
  
  // Create a Mongoose schema and model for the user
  const userSchema = new mongoose.Schema({
    name:String,
    email: {
         type: String,
         unique: true },
    password: String,
    confirmPassword  : String,

  });
  
  module.exports = mongoose.model('User', userSchema);