const jwt = require("jsonwebtoken")

const userMiddleware=(req,res,next)=>{
    // Get token from headers
    const token = req.header("Authorization")

      // Check if token exists
    if(!token){
        return res.status(401).json({message:"Unauthorized - No token provided"})
    }
    try{
        // Verify token
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded; // Set user in request object for further use
        next()  // Proceed to the next middleware or route handler
    }catch(error){
        res.status(401),json({message: 'Unauthorized - Invalid token'})
    }
}


module.exports = userMiddleware;