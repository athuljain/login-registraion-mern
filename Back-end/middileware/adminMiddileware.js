const jwt=require('jsonwebtoken')


const checkAdminToken = (req, res, next) => {
    
    const token= req.cookies.token;
   
    console.log('Token in middleware:', token);

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports= checkAdminToken