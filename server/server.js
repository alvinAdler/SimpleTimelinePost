require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const path = require("path")

const userRoutes = require("./routes/userRoutes")
const refreshTokenVerification = require("./middlewares/refreshTokenVerification")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to Database"))

app.use("/users", userRoutes)

app.get("/refreshToken", refreshTokenVerification, (req, res) => {
    const authToken = jwt.sign({
        _id: req.user._id,
        username: req.user.username
    },
    process.env.AUTH_TOKEN_KEY,
    {expiresIn: "30m"})

    return res.status(200).json({
        message: "Token refreshed",
        refreshToken: req.refreshToken,
        authToken: authToken
    })
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(process.env.PORT, () => {
    console.log("Server Started")
})