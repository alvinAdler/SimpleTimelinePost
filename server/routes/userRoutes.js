const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()

const userModel = require("../models/userModel")
const refreshTokenModel = require("../models/refreshTokenModel")
const postModel = require("../models/postModel")

const tokenVerification = require("../middlewares/tokenVerification")

const pushRefreshToken = async (refreshToken) => {
    const result = await refreshTokenModel.create({refreshToken: refreshToken})
    if(result){
        return true
    }
    return false
}

router.post("/register", async (req, res) => {
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

    const token = jwt.sign({
        _id: fetchedUser._id,
        username: fetchedUser.username
    }, 
    process.env.AUTH_TOKEN_KEY, 
    {expiresIn: "2h"})

    const refreshToken = jwt.sign({
        _id: fetchedUser._id,
        username: fetchedUser.username
    }, process.env.REFRESH_TOKEN_KEY)

    const isPushed = await pushRefreshToken(refreshToken)

    if(isPushed){
        return res.status(200).json({
            message: "Access granted",
            user: fetchedUser.username,
            token: token,
            refreshToken: refreshToken
        })
    }else{
        return res.status(500).json({
            message: "Refresh token failed to be pushed"
        })
    }
})

router.post("/verify", tokenVerification, (req, res) => {
    return res.status(200).json({
        message: "You are verified",
        user: req.user
    })
})

router.get("/all", tokenVerification, async (req, res) => {

    console.log(req.user)
    const allUsers = await userModel.find()

    return res.status(200).json({
        message: "Request has been made",
        users: allUsers
    })
})

router.post("/addPost", tokenVerification, (req, res) => {
    const postTitle = req.body.postTitle
    const postContent = req.body.postContent

    console.log("Req body")
    console.log(req.body)
    console.log(req.body.postTitle)
    console.log(req.body.postContent)

    postModel.create({postTitle: postTitle, postContent: postContent, postOwner: req.user._id}, async (err, doc) => {

        if(err){
            console.log(err)
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

        const result = await userModel.updateOne({_id: req.user._id}, {$push: {posts: doc._id}})

        if(result.acknowledged){
            return res.status(200).json({
                message: "Post has been successfully added",
                doc: doc,
            })
        }
        return res.status(500).json({
            message: "Failed to save post"
        })
        
    })
})

router.get("/getPosts", tokenVerification, async (req, res) => {
    let fetchedPosts = await postModel.find({postOwner: req.user._id})

    if(!fetchedPosts){
        return res.status(500).json({
            message: "Error while fetching data"
        })
    }

    let modifiedPosts = await Promise.all(fetchedPosts.map(async (item) => {
        let user = await userModel.findOne({_id: item.postOwner}, {username: 1})

        return {...item._doc, username: user.username}
    }))

    return res.status(200).json({
        message: "Posts fetched",
        posts: modifiedPosts
    })
})

module.exports = router