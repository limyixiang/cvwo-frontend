import CategoryList from "./CategoryList";
import Category from "../types/Category";
import User from "../types/User";
import { createPost } from "../backend";
import React, { useState } from "react";
import { Button, Box, Modal, TextField, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "2px solid #000",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        padding: "16px",
        borderRadius: "8px",
    },
    formControl: {
        marginBottom: "16px",
    },
    buttonContainer: {
        marginTop: "16px",
    },
});

type CreatePostModalProps = {
    user: User | null;
    onPostCreated: () => void;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({ user, onPostCreated }) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCategory(null);
        setTitle("");
        setContent("");
    };

    const handleCategoryChange = (category: Category | null) => {
        setSelectedCategory(category);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        if (!selectedCategory) {
            setSnackbarMessage("Please select a category");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        if (!user) {
            setSnackbarMessage("Please sign in to create a post");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        if (!title.trim()) {
            setSnackbarMessage("Title cannot be empty");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        if (!content.trim()) {
            setSnackbarMessage("Content cannot be empty");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await createPost(
                user.id,
                selectedCategory.id,
                title.trim(),
                content.trim(),
                new Date(),
                new Date(),
            );
            console.log("Post created:", response.data);
            handleCloseModal();
            onPostCreated();
            setSnackbarMessage("Post created successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error creating post:", error);
            setSnackbarMessage("Error creating post");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenModal}>
                Create
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
                <div className={classes.modal}>
                    <h2>Create a new post</h2>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className={classes.formControl}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <CategoryList onCategoryChange={handleCategoryChange} />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        className={classes.formControl}
                        value={content}
                        onChange={handleContentChange}
                    />
                    <Box className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Box>
                </div>
            </Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreatePostModal;
