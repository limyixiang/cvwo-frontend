import Comment from "../types/Comment";
import { fetchUserByID } from "../backend";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    comment: Comment;
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

const CommentItem: React.FC<Props> = ({ comment }) => {
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

    return (
        <Card className={classes.commentCard}>
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {comment.content}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {"Posted by " + commenterName + " on " + new Date(comment.created_at).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
