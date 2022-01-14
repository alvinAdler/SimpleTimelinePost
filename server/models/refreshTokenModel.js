const mongoose = require("mongoose")
const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true
    }
})

const refreshTokenModel = mongoose.model("refreshTokens", refreshTokenSchema)

module.exports = refreshTokenModel