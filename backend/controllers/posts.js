const Post = require("../models/Post")
const User = require("../models/User")

const createPost = async (req, res) => {
    try {
        const { userId, description, picturepath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturepath,
            likes: {},
            comment: [],
        })
        await newPost.save()

        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const likePosts = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        console.log(post)
        const isLiked = post.likes.get(userId)
        console.log("Is Liked",isLiked)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPosts = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true },
        )

        res.status(200).json(updatedPosts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePosts
}