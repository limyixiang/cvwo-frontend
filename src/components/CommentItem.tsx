import Comment from "../types/Comment";
import User from "../types/User";
import { fetchUserByID, likeComment } from "../backend";

import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

type CommentItemProps = {
    comment: Comment;
    user: User | null;
    onEdit: (comment: Comment) => void;
    onDelete: (comment: Comment) => void;
};

const CommentCard = styled(Card)(() => ({
    marginBottom: "1em",
}));

const CommentBody = styled(Typography)(() => ({
    fontSize: 16,
    whiteSpace: "pre-wrap",
    paddingBottom: "1em",
}));

const Metadata = styled(Typography)(() => ({
    fontSize: 14,
}));

const CommentItem: React.FC<CommentItemProps> = ({ comment, user, onEdit, onDelete }: CommentItemProps) => {
    const [commenterName, setCommenterName] = useState<string>("");

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await fetchUserByID(comment.user_id);
                setCommenterName(user.name);
            } catch (error) {
                console.error("Error fetching commenter:", error);
            }
        };

        getUser();
    }, [comment.user_id]);

    const handleEdit = () => {
        onEdit(comment);
    };

    const handleDelete = () => {
        onDelete(comment);
    };

    const handleLike = async () => {
        // to be completed
        console.log(comment.likes);
    };

    const handleDislike = async () => {
        // to be completed
    };

    return (
        <CommentCard>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Metadata color="textSecondary" gutterBottom>
                            {"Posted by " + commenterName + " on " + new Date(comment.created_at).toLocaleString()}
                        </Metadata>
                    </Box>
                    <Box>
                        {user && user.id === comment.user_id ? (
                            <>
                                <IconButton onClick={handleEdit} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={handleDelete} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        ) : (
                            // Empty box to maintain spacing
                            <></>
                        )}
                    </Box>
                </Box>
                <CommentBody variant="body2" color="textPrimary">
                    {comment.content}
                </CommentBody>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <IconButton onClick={handleLike} size="small">
                            <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        <Box display="inline" ml={0.5} mr={0.5}>
                            {comment.likes}
                        </Box>
                        <IconButton onClick={handleDislike} size="small">
                            <ThumbDownIcon fontSize="small" />
                        </IconButton>
                        <Box display="inline" ml={0.5}>
                            {comment.dislikes}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </CommentCard>
    );
};

export default CommentItem;
