import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import User from "../types/User";
import { fetchCommentsByPost } from "../backend";

import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type CommentListProps = {
    postID: number;
    refresh: boolean;
    user: User | null;
    onEdit: (comment: Comment) => void;
    onDelete: (comment: Comment) => void;
};

const CommentList: React.FC<CommentListProps> = ({ postID, refresh, user, onEdit, onDelete }: CommentListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        fetchCommentsByPost(postID)
            .then((fetchedComments) => {
                if (fetchedComments != null) {
                    setComments(fetchedComments);
                } else {
                    setComments([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setComments([]);
            });
    }, [postID, refresh]);

    const handleSortOrderChange = (order: "asc" | "desc") => {
        setSortOrder(order);
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortedComments = [...comments].sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    });

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="outlined" onClick={handleMenuOpen} startIcon={<SortIcon />}>
                    Sort
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleSortOrderChange("asc")}>Ascending</MenuItem>
                    <MenuItem onClick={() => handleSortOrderChange("desc")}>Descending</MenuItem>
                </Menu>
            </Box>
            <ul>
                {sortedComments.length > 0 ? (
                    sortedComments.map((comment) => (
                        <CommentItem
                            comment={comment}
                            key={comment.id}
                            user={user}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <li>Be the first to comment!</li>
                )}
            </ul>
        </Box>
    );
};

export default CommentList;
