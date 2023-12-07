const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.cookies.token;

  console.log("Token in UserMiddleware:", token);

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });
    console.log("Decoded Token:", decoded);
    req.token = token;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in userMiddleware:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = userMiddleware;

// const app = require("express");
// const jwt = require("jsonwebtoken");

// const cookieParser = require("cookie-parser");

// const checkUserToken = (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("token in UserMiddleware",token);
//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }
//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = token;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };
// module.exports = checkUserToken;
