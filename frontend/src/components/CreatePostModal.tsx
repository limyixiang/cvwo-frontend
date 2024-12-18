import React, { useState } from "react";
import { Button, Box, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "rgba(255, 255, 255, 0.83)",
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

const CreatePostModal: React.FC = () => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        maxRows={4}
                        margin="normal"
                        className={classes.formControl}
                    />
                    <Box className={classes.buttonContainer}>
                        <Button variant="contained" color="primary">
                            Create
                        </Button>
                    </Box>
                </div>
            </Modal>
        </div>
    );
};

export default CreatePostModal;
