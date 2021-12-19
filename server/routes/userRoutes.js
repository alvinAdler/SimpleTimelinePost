const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

const userModel = require("../models/userModel")

router.get("/all", (req, res) => {
    return res.status(200).json({
        message: "Request has been made"
    })
})

router.post("/add", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const result = await userModel.findOne({username: username})

    if(result){
        return res.status(400).json({
            message: "User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    userModel.create({username, password: hashedPassword}, (err, doc) => {
        if(err){
            return res.status(500).json({
                message: "Failed to create user."
            })
        }

        return res.status(201).json({
            message: `User ${doc.username} has been successfully created`
        })
    })
})

router.post("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const fetchedUser = await userModel.findOne({username: username})

    if(!fetchedUser){
        return res.status(400).json({
            message: "Username does not exist. Please recheck your login credentials."
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, fetchedUser.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message: "Password does not match. Please recheck your password."
        })
    }

    return res.status(200).json({
        message: "Access granted."
    })
})

module.exports = router