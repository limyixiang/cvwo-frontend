import User from "../types/User";
import Post from "../types/Post";

import React from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

type PostHeaderProps = {
    post: Post;
    user: User | null;
    postUserName: string;
    anchorEl: HTMLElement | null;
    handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleEditPost: () => void;
    handleDeletePost: () => void;
    handleLikeClicked: () => void;
    handleDislikeClicked: () => void;
    liked: boolean;
    disliked: boolean;
    numLikes: number;
    numDislikes: number;
    loadingLike: boolean;
};

const PostHeader: React.FC<PostHeaderProps> = ({
    post,
    user,
    postUserName,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleEditPost,
    handleDeletePost,
    handleLikeClicked,
    handleDislikeClicked,
    liked,
    disliked,
    numLikes,
    numDislikes,
    loadingLike,
}) => {
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    {post.title}
                </Typography>
                {user && user.id === post.user_id && (
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Box>
            <Typography variant="subtitle1" gutterBottom>
                {post.content}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Thread started by {postUserName} on {new Date(post.created_at).toLocaleString()}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <IconButton
                        onClick={handleLikeClicked}
                        size="small"
                        color={liked ? "primary" : "default"}
                        disabled={loadingLike}
                    >
                        <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Box display="inline" ml={0.5} mr={0.5}>
                        {numLikes}
                    </Box>
                    <IconButton
                        onClick={handleDislikeClicked}
                        size="small"
                        color={disliked ? "primary" : "default"}
                        disabled={loadingLike}
                    >
                        <ThumbDownIcon fontSize="small" />
                    </IconButton>
                    <Box display="inline" ml={0.5}>
                        {numDislikes}
                    </Box>
                </Box>
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            </Menu>
        </>
    );
};

export default PostHeader;
