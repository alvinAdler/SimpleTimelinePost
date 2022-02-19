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
        default: [],
        ref: "users"
    },
    posts: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "posts"
    },
    friendRequests: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "users"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel