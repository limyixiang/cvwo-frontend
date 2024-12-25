import {
    createComment,
    fetchPostByID,
    fetchUserByID,
    updateComment,
    deleteComment,
    updatePost,
    deletePost,
} from "../backend";
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
    IconButton,
    Menu,
    MenuItem,
    Snackbar,
    Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

type ThreadViewProps = {
    user: User | null;
};

const ThreadView: React.FC<ThreadViewProps> = ({ user }: ThreadViewProps) => {
    const { postID } = useParams<{ postID: string }>();
    const navigate = useNavigate();
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editPostDialogOpen, setEditPostDialogOpen] = useState(false);
    const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

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
            setSnackbarMessage("Please sign in to comment");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        try {
            const user_id = user.id;
            const post_id = parseInt(postID || "0");
            const content = commentText.trim();
            if (!content) {
                setSnackbarMessage("Comment cannot be empty");
                setSnackbarSeverity("warning");
                setSnackbarOpen(true);
                return;
            }
            const created_at = new Date();
            const updated_at = new Date();
            await createComment(user_id, post_id, content, created_at, updated_at);
            setCommentText("");
            hideCommentBox();
            setRefreshComments((prev) => !prev);
            setSnackbarMessage("Comment submitted successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error creating comment:", error);
            setSnackbarMessage("Error creating comment");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
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
        const content = newCommentContent.trim();
        if (content === "") {
            setSnackbarMessage("Comment cannot be empty");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }
        if (selectedComment) {
            try {
                await updateComment(selectedComment.id, content, new Date());
                setRefreshComments((prev) => !prev);
                handleEditDialogClose();
                setSnackbarMessage("Comment updated successfully");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error updating comment:", error);
                setSnackbarMessage("Error updating comment");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleDeleteDialogSubmit = async () => {
        if (selectedComment) {
            try {
                await deleteComment(selectedComment.id);
                setRefreshComments((prev) => !prev);
                handleDeleteDialogClose();
                setSnackbarMessage("Comment deleted successfully");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error deleting comment:", error);
                setSnackbarMessage("Error deleting comment");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditPost = () => {
        if (post) {
            setNewPostTitle(post.title);
            setNewPostContent(post.content);
            setEditPostDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeletePost = () => {
        setDeletePostDialogOpen(true);
        handleMenuClose();
    };

    const handleEditPostDialogClose = () => {
        setEditPostDialogOpen(false);
        setNewPostTitle("");
        setNewPostContent("");
    };

    const handleDeletePostDialogClose = () => {
        setDeletePostDialogOpen(false);
    };

    const handleEditPostDialogSubmit = async () => {
        const title = newPostTitle.trim();
        const content = newPostContent.trim();
        if (title === "" || content === "") {
            setSnackbarMessage("Title and content cannot be empty");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }
        if (post) {
            try {
                await updatePost(post.id, newPostTitle.trim(), newPostContent.trim(), new Date());
                setPost({ ...post, title: newPostTitle.trim(), content: newPostContent.trim() });
                handleEditPostDialogClose();
                setSnackbarMessage("Post updated successfully");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error updating post:", error);
                setSnackbarMessage("Error updating post");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleDeletePostDialogSubmit = async () => {
        if (post) {
            try {
                await deletePost(post.id);
                navigate("/");
                setSnackbarMessage("Post deleted successfully");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error deleting post:", error);
                setSnackbarMessage("Error deleting post");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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

            {/* Post Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            </Menu>

            {/* Edit Post Dialog */}
            <Dialog open={editPostDialogOpen} onClose={handleEditPostDialogClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit-post-title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="edit-post-content"
                        label="Content"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditPostDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditPostDialogSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Post Dialog */}
            <Dialog open={deletePostDialogOpen} onClose={handleDeletePostDialogClose}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeletePostDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeletePostDialogSubmit} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ThreadView;
