import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../state/index";
import FlexBetween from "../Themes/FlexBetween";

const FriendCard = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

    const addFriend = async () => {
        try {
            const response = await fetch(
                `http://localhost:3002/user/${_id}/${friendId}`,
                {
                    method: "PATCH",
                    headers: {
                        "authToken": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                {/* <UserImage image={userPicturePath} size="55px" /> */}
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={addFriend}
                sx={{ p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined />
                ) : (
                    <PersonAddOutlined />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default FriendCard;