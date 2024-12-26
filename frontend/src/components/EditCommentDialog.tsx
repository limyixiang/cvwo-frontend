import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

type EditCommentDialogProps = {
    open: boolean;
    newCommentContent: string;
    handleClose: () => void;
    handleSubmit: () => void;
    handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditCommentDialog: React.FC<EditCommentDialogProps> = ({
    open,
    newCommentContent,
    handleClose,
    handleSubmit,
    handleContentChange,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
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

export default EditCommentDialog;
