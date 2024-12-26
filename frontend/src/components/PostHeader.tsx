import User from "../types/User";
import Post from "../types/Post";

import React from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type PostHeaderProps = {
    post: Post;
    user: User | null;
    postUserName: string;
    anchorEl: HTMLElement | null;
    handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleEditPost: () => void;
    handleDeletePost: () => void;
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
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            </Menu>
        </>
    );
};

export default PostHeader;
