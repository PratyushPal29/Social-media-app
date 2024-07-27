import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from "../../state/index"

const Posts = ({ isProfile = false, userId }) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const posts = useSelector((state) => state.posts)

    const getPosts = async () => {
        const response = await fetch("http://localhost:3002/posts", {
            method: "GET",
            headers: { "authToken": `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3002/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { "authToken": `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(data)
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    const image = './logo/logo-color.png'

    return (
        <div>
            {posts && posts.map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
            }) => (
                <Post
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={image}
                    userPicturePath={""}
                    likes={likes}
                    comments={comments}
                />
            )
            )}
        </div>
    )
}

export default Posts
