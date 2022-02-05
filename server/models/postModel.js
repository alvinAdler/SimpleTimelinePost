const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    postOwner: {
        type: mongoose.ObjectId,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel