const jwt = require('jsonwebtoken');


 const jwtAuthMiddleware = (req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token)
    {
        return res.status(401).json({message:'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'});
    }
};

const jwtGenerateToken=(userData)=>
{
    return  jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware,jwtGenerateToken};