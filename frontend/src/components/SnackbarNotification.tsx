import React from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarNotificationProps = {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    handleClose: () => void;
};

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({ open, message, severity, handleClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
