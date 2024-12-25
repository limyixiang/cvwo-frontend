import { createComment, fetchPostByID, fetchUserByID, updateComment, deleteComment } from "../backend";
import CommentList from "../components/CommentList";
import User from "../types/User";
import Post from "../types/Post";
import Comment from "../types/Comment";

import {
    Button,
    TextField,
    Typography,
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

type ThreadViewProps = {
    user: User | null;
};

const ThreadView: React.FC<ThreadViewProps> = ({ user }: ThreadViewProps) => {
    const { postID } = useParams<{ postID: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [postUserName, setPostUserName] = useState<string>("");
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [refreshComments, setRefreshComments] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [newCommentContent, setNewCommentContent] = useState("");

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostByID(parseInt(postID || "0"));
                const postUser = await fetchUserByID(fetchedPost.user_id);
                setPostUserName(postUser.name);
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

    const handleEditComment = (comment: Comment) => {
        setSelectedComment(comment);
        setNewCommentContent(comment.content);
        setEditDialogOpen(true);
    };

    const handleDeleteComment = (comment: Comment) => {
        setSelectedComment(comment);
        setDeleteDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedComment(null);
        setNewCommentContent("");
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedComment(null);
    };

    const handleEditDialogSubmit = async () => {
        if (selectedComment && newCommentContent.trim() !== "") {
            try {
                await updateComment(selectedComment.id, newCommentContent.trim(), new Date());
                setRefreshComments((prev) => !prev);
                handleEditDialogClose();
            } catch (error) {
                console.error("Error updating comment:", error);
            }
        }
    };

    const handleDeleteDialogSubmit = async () => {
        if (selectedComment) {
            try {
                await deleteComment(selectedComment.id);
                setRefreshComments((prev) => !prev);
                handleDeleteDialogClose();
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
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
                        Thread started by {postUserName} on {new Date(post.created_at).toLocaleString()}
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
            <CommentList
                postID={parseInt(postID || "0")}
                refresh={refreshComments}
                user={user}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
            />
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
                    {"<- Back to threads"}
                </Button>
            </Link>

            {/* Edit Comment Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit-comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditDialogSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Comment Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this comment?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteDialogSubmit} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ThreadView;
