import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

type EditPostDialogProps = {
    open: boolean;
    newPostTitle: string;
    newPostContent: string;
    handleClose: () => void;
    handleSubmit: () => void;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditPostDialog: React.FC<EditPostDialogProps> = ({
    open,
    newPostTitle,
    newPostContent,
    handleClose,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
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
                    onChange={handleTitleChange}
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
                    onChange={handleContentChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPostDialog;
