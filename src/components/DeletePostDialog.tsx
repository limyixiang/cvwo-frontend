import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

type DeletePostDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
};

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({ open, handleClose, handleSubmit }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
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

export default DeletePostDialog;
