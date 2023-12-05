// const jwt = require("jsonwebtoken")

// const userMiddleware=(req,res,next)=>{
//     // Get token from headers
//     const token = req.cookies.token;

//     console.log("Token in UserMiddleware:", token);

//       // Check if token exists
//     if(!token){
//         return res.status(401).json({message:"Unauthorized - No token provided"})
//     }
//     try{
//         // Verify token
//         const decoded= jwt.verify(token,process.env.JWT_SECRET)
//        req.token=token
//         next()  // Proceed to the next middleware or route handler
//     }catch(error){
//         res.status(401),json({message: 'Unauthorized - Invalid token'})
//     }
// }


// module.exports = userMiddleware;


// userMiddileware.js

const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token in userMiddileware", token);

  if (!token) {
    return res.status(401).json({ message: 'Auth failed' });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
    return res.status(401).json({ message: 'Auth failed' });
  }

  req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  next();
};

module.exports = userMiddleware;

