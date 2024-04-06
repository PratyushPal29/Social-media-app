const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        like: {
            type: Map,
            of: Boolean,
        },
        comment: {
            types: Array,
            default: [],
        }
    }, {timestamps: true}
)

const Post = mongoose.model("Post", PostSchema)

module.exports = Post