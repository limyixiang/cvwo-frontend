import Comment from "../types/Comment";
import User from "../types/User";
import {
    fetchUserByID,
    likeComment,
    unlikeComment,
    dislikeComment,
    undislikeComment,
    checkCommentLikedByUser,
    checkCommentDislikedByUser,
} from "../backend";

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
    const [liked, setLiked] = useState<boolean>(false);
    const [disliked, setDisliked] = useState<boolean>(false);
    const [numLikes, setNumLikes] = useState<number>(comment.likes);
    const [numDislikes, setNumDislikes] = useState<number>(comment.dislikes);
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        const checkLiked = async () => {
            if (user) {
                try {
                    const liked = await checkCommentLikedByUser(comment.id, user.id);
                    setLiked(liked);
                } catch (error) {
                    console.error("Error checking if comment is liked by user:", error);
                }
            }
        };

        const checkDisliked = async () => {
            if (user) {
                try {
                    const disliked = await checkCommentDislikedByUser(comment.id, user.id);
                    setDisliked(disliked);
                } catch (error) {
                    console.error("Error checking if comment is disliked by user:", error);
                }
            }
        };

        checkLiked();
        checkDisliked();
    }, [comment.likes, comment.dislikes, user]);

    const handleEdit = () => {
        onEdit(comment);
    };

    const handleDelete = () => {
        onDelete(comment);
    };

    const handleLikeClicked = async () => {
        if (user && !loading) {
            setLoading(true);
            try {
                if (disliked) {
                    await undislikeComment(comment.id, user.id);
                    setDisliked(false);
                    setNumDislikes((prev) => prev - 1);
                }
                if (liked) {
                    await unlikeComment(comment.id, user.id);
                    setLiked(false);
                    setNumLikes((prev) => prev - 1);
                } else {
                    await likeComment(comment.id, user.id);
                    setLiked(true);
                    setNumLikes((prev) => prev + 1);
                }
            } catch (error) {
                console.error("Error liking/unliking comment:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDislikeClicked = async () => {
        if (user && !loading) {
            setLoading(true);
            try {
                if (liked) {
                    await unlikeComment(comment.id, user.id);
                    setLiked(false);
                    setNumLikes((prev) => prev - 1);
                }
                if (disliked) {
                    await undislikeComment(comment.id, user.id);
                    setDisliked(false);
                    setNumDislikes((prev) => prev - 1);
                } else {
                    await dislikeComment(comment.id, user.id);
                    setDisliked(true);
                    setNumDislikes((prev) => prev + 1);
                }
            } catch (error) {
                console.error("Error disliking/undisliking comment:", error);
            } finally {
                setLoading(false);
            }
        }
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
                        {user && user.id === comment.user_id && (
                            <>
                                <IconButton onClick={handleEdit} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={handleDelete} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Box>
                <CommentBody variant="body2" color="textPrimary">
                    {comment.content}
                </CommentBody>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <IconButton
                            onClick={handleLikeClicked}
                            size="small"
                            color={liked ? "primary" : "default"}
                            disabled={loading}
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
                            disabled={loading}
                        >
                            <ThumbDownIcon fontSize="small" />
                        </IconButton>
                        <Box display="inline" ml={0.5}>
                            {numDislikes}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </CommentCard>
    );
};

export default CommentItem;
