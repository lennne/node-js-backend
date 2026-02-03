const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const Token = authHeader && authHeader.split(' ')[1]

    if(!Token){
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided. Please login to continue"
        })
    }

    //decode this token
    try{
        const decodedToken = jwt.verify(Token, process.env.JWT_SECRET_KEY)
        console.log(decodedToken);

        req.userInfo = decodedToken
        console.log("Auth middleware is called")
        next();
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Access denied. No token provided. "
        })
    }
}

module.exports = authMiddleware