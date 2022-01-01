const jwt = require("jsonwebtoken")

const tokenVerification = (req, res, next) => {

    const authToken = req.headers.authorization.split(" ")[1]
    
    if(!authToken){
        return res.status(403).json({
            message: "Prohibited. No token provided"
        })
    }

    jwt.verify(authToken, process.env.AUTH_TOKEN_KEY, (err, result) => {
        if(err){
            return res.status(403).json({
                message: "Prohibited. Token is not valid"
            })
        }

        req.user = result
        
        next()
    })
}

module.exports = tokenVerification