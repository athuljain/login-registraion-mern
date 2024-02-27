  
  const mongoose = require("mongoose")
  
  // Create a Mongoose schema and model for the user
  const userSchema = new mongoose.Schema({
    name:String,
    email: {
         type: String,
         unique: true },
    password: String,
    confirmPassword  : String,
    cart: [
      {
        type: String,
        required: false,
      },
    ],

  });
  
  module.exports = mongoose.model('User', userSchema);





// Create a Mongoose schema and model for the user
// const mongoose = require("mongoose");

// Import the Product model
// require("./productModel");

// Create a Mongoose schema and model for the user
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true
//   },
//   password: String,
//   confirmPassword: String,
//   cart: [{
//     type: mongoose.Schema.Types.ObjectId, // Storing product IDs as ObjectIDs
//     ref: 'Product' // Reference to the Product model
//   }]
// });

// module.exports = mongoose.model('User', userSchema);
