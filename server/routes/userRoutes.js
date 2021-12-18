const express = require("express")
const router = express.Router()

const userModel = require("../models/userModel")

router.get("/all", (req, res) => {
    return res.status(200).json({
        message: "Request has been made"
    })
})

router.post("/add", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    userModel.create({username, password}, (err, doc) => {
        if(err){
            return res.status(500).json({
                message: "Failed to create user"
            })
        }

        return res.status(201).json({
            message: `User ${doc.username} has been successfully created`
        })
    })
})

module.exports = router