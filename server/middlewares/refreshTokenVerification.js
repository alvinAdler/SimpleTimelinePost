const jwt = require("jsonwebtoken")

const refreshTokenVerification = (req, res, next) => {
    const refreshToken = req.headers.refreshtoken.split(" ")[1]

    if(!refreshToken){
        return res.status(403).json({
            message: "Prohibited. No refresh token provided"
        })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, result) => {
        if(err){
            return res.status(403).json({
                message: "Prohibited. Refresh token is not valid"
            })
        }

        req.user = result
        req.refreshToken = refreshToken

        next()
    })
}

module.exports = refreshTokenVerification