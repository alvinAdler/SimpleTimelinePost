require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")

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

app.listen("5000", () => {
    console.log("Server Started")
})