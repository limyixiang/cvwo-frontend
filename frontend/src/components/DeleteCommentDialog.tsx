import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

type DeleteCommentDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
};

const DeleteCommentDialog: React.FC<DeleteCommentDialogProps> = ({ open, handleClose, handleSubmit }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this comment?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCommentDialog;
