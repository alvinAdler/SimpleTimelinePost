const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    password: {
        type: String,
        required: true
    },
    friendsList: {
        type: [mongoose.ObjectId],
        required: true,
        default: []
    },
    posts: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "posts"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel