require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to Database"))

app.use("/users", userRoutes)

app.listen("5000", () => {
    console.log("Server Started")
})