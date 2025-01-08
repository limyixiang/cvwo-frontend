import User from "../types/User";
import React from "react";
import { Box, Button, TextField } from "@mui/material";

type CommentFormProps = {
    isAddComment: boolean;
    commentText: string;
    handleCommentBoxClick: () => void;
    handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCommentSubmit: () => void;
    user: User | null;
};

const CommentForm: React.FC<CommentFormProps> = ({
    isAddComment,
    commentText,
    handleCommentBoxClick,
    handleCommentChange,
    handleCommentSubmit,
    user,
}) => {
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleCommentBoxClick} sx={{ marginTop: 2 }}>
                {"Reply"}
            </Button>
            {isAddComment && (
                <Box sx={{ marginTop: 2 }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        placeholder={`Reply as ${user?.name || "user"}`}
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
        </>
    );
};

export default CommentForm;
