const express = require("express")
const {getFeedPosts, getUserPosts, likePosts} = require("../controllers/posts")
const verifyToken = require("../middleware/auth")

const router = express.Router()

router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

router.patch("/:id/like", verifyToken, likePosts)

module.exports = router