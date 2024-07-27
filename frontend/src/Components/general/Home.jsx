import React from "react";
import NavBar from "./Navbar";
import CreatePost from "../Posts/Create_post";
import {
    Box,
    useMediaQuery
} from "@mui/material"
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import FriendList from "./FriendsCards";

const Home = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user)

    return (
        <>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined} marginBottom={2}>
                    <UserCard userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    class="mx-4"
                >
                    <CreatePost />
                    <Posts />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <Box m="2rem 0" />
                        <FriendList userId={_id} />
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Home