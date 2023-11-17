const jwt=require('jsonwebtoken')

// const checkAdminToken=(req,res,next)=>{
//     const token=req.headers.authorization || req.cookies.token;
//     if(!token){
//         return res.status(401).json({message:"No token Provide"})
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.decoded=decoded;
//         next()
//     }catch(err){
//         return res.status(401).json({message:"Invalid Token"})
//     }
// }

const checkAdminToken = (req, res, next) => {
    // const token = req.header('Authorization');
    const token=req.headers.authorization || req.cookies.token;
    // const token = req.header('Authorization');
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