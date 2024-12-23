import { createComment, fetchPostByID } from "../backend";
import CommentList from "../components/CommentList";
import User from "../types/User";
import Post from "../types/Post";

import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

type ThreadViewProps = {
    user: User | null;
};

const ThreadView: React.FC<ThreadViewProps> = ({ user }: ThreadViewProps) => {
    const { postID } = useParams<{ postID: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [refreshComments, setRefreshComments] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostByID(parseInt(postID || "0"));
                setPost(fetchedPost);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setLoading(false);
            }
        };

        getPost();
    }, [postID]);

    const hideCommentBox = () => {
        setIsAddComment(false);
    };

    const showCommentBox = () => {
        setIsAddComment(true);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!user) {
            alert("Please sign in to comment");
            return;
        }

        try {
            const user_id = user.id;
            const post_id = parseInt(postID || "0");
            const content = commentText.trim();
            if (!content) {
                alert("Comment cannot be empty");
                return;
            }
            const created_at = new Date();
            const updated_at = new Date();
            await createComment(user_id, post_id, content, created_at, updated_at);
            setCommentText("");
            hideCommentBox();
            setRefreshComments((prev) => !prev);
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ width: "60vw", margin: "auto", textAlign: "center", padding: 2 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "60vw", margin: "auto", textAlign: "center", padding: 2 }}>
            {post && (
                <>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {post.content}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Thread started by {user?.name || "Unknown"} on {new Date(post.created_at).toLocaleString()}
                    </Typography>
                </>
            )}
            <br />
            <Button variant="outlined" color="primary" onClick={showCommentBox} sx={{ marginTop: 2 }}>
                {"Reply"}
            </Button>
            {isAddComment && (
                <Box sx={{ marginTop: 2 }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        placeholder={`Reply as ${user?.name}`}
                        value={commentText}
                        onChange={handleCommentChange}
                        fullWidth
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ marginTop: 2 }}>
                        {"Submit"}
                    </Button>
                </Box>
            )}
            <CommentList postID={parseInt(postID || "0")} refresh={refreshComments} />
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
                    {"<- Back to threads"}
                </Button>
            </Link>
        </Box>
    );
};

export default ThreadView;
