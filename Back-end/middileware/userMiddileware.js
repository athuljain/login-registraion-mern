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


