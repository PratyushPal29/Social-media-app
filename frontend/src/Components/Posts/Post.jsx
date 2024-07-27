import React, { useState } from 'react'
import { Typography, Box, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import Friend from './Friend_Post';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from "../../state/index"

const Post = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user._id)
    const token = useSelector((state) => state.token)
    // const isLiked = Boolean(likes[userId]);
    // const likeCount = Object.keys(likes).length;
    const isLiked = likes && likes[userId] !== undefined;
    const likeCount = likes ? Object.keys(likes).filter(key => key !== 'userId').length : 0;

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3002/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    "authToken": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId }),
            });
            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div class="my-4">
            <Friend 
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={""}
            />
            <Card sx={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "20px", border: "2px solid black", marginBottom: "2rem" }}>
                <CardMedia
                    component="img"
                    image='./logo/logo-color.png'
                    alt="Group Image"
                    sx={{maxHeight: "30rem"}}
                />
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <CardContent>
                        <Typography
                            variant='h6'
                            color="text.primary"
                        >
                            {description}
                        </Typography>
                    </CardContent>
                    <Box display="flex" alignItems="center" marginBottom={4} >
                        <Stack direction="row" spacing={1} >
                            <Button>
                                <IconButton onClick={handleLike}>
                                    {isLiked ? (
                                        <FavoriteOutlined sx={{ color: "black" }} />
                                    ) : (
                                        <FavoriteBorderOutlined sx={{ color: "black" }} />
                                    )}
                                </IconButton>
                                <Typography sx={{color: "black"}}>{likeCount}</Typography>
                            </Button>
                            <Button>
                                <ChatBubbleOutlineOutlined sx={{ color: "black" }} />
                            </Button>
                            <Button>
                                <ShareOutlined sx={{ color: "black" }} />
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Card>

        </div>
    )
}

export default Post
