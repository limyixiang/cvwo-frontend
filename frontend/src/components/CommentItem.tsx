import Comment from "../types/Comment";
import User from "../types/User";
import { fetchUserByID } from "../backend";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

type CommentItemProps = {
    comment: Comment;
    user: User | null;
    onEdit: (comment: Comment) => void;
    onDelete: (comment: Comment) => void;
};
const useStyles = makeStyles(() => ({
    commentBody: {
        fontSize: 16,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<CommentItemProps> = ({ comment, user, onEdit, onDelete }: CommentItemProps) => {
    const classes = useStyles();
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
        <Card className={classes.commentCard}>
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {comment.content}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                        {"Posted by " + commenterName + " on " + new Date(comment.created_at).toLocaleString()}
                    </Typography>
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
        </Card>
    );
};

export default CommentItem;
