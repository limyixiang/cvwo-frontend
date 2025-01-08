import Comment from "../types/Comment";
import User from "../types/User";
import { fetchUserByID } from "../backend";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

    return (
        <CommentCard>
            <CardContent>
                <CommentBody variant="body2" color="textPrimary">
                    {comment.content}
                </CommentBody>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Metadata color="textSecondary" gutterBottom>
                        {"Posted by " + commenterName + " on " + new Date(comment.created_at).toLocaleString()}
                    </Metadata>
                    {user && user.id === comment.user_id && (
                        <Box>
                            <IconButton onClick={handleEdit} size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={handleDelete} size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </CommentCard>
    );
};

export default CommentItem;
