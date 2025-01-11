import "../App.css";
import { fetchPostsByCategory, fetchUserByID } from "../backend";
import Post from "../types/Post";
import User from "../types/User";
import Category from "../types/Category";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Menu,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type ThreadListProps = {
    refresh: boolean;
    selectedCategory: Category;
};

const ThreadList: React.FC<ThreadListProps> = ({ refresh, selectedCategory }: ThreadListProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<{ [key: number]: User }>({});
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [selectedCategory, refresh]);

    useEffect(() => {
        const getPostsAndUsers = async () => {
            try {
                const fetchedPosts = await fetchPostsByCategory(selectedCategory.id);
                if (fetchedPosts) {
                    setPosts(fetchedPosts);
                    const userPromises = fetchedPosts.map((post: Post) => fetchUserByID(post.user_id));
                    const fetchedUsers = await Promise.all(userPromises);

                    const usersMap: { [key: number]: User } = {};
                    fetchedUsers.forEach((user) => {
                        usersMap[user.id] = user;
                    });

                    setUsers(usersMap);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                console.log("done loading");
                setLoading(false);
            }
        };

        getPostsAndUsers();
    }, [refresh, selectedCategory, setLoading]);

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

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        } else {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
    });

    return loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
        </Box>
    ) : (
        <div>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="outlined" onClick={handleMenuOpen} startIcon={<SortIcon />}>
                    Sort
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleSortOrderChange("asc")}>Ascending</MenuItem>
                    <MenuItem onClick={() => handleSortOrderChange("desc")}>Descending</MenuItem>
                </Menu>
            </Box>
            <List>
                {sortedPosts && sortedPosts.length > 0 ? (
                    sortedPosts.map((post) => (
                        <ListItem key={post.id}>
                            <Card style={{ width: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6">
                                        <Link to={`/thread/${post.id}`}>{post.title}</Link>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        by {users[post.user_id]?.name || "Unknown"}
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Typography variant="body2" color="textSecondary">
                                            Last updated: {new Date(post.updated_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No threads for now, be the first to start a thread!" />
                    </ListItem>
                )}
            </List>
        </div>
    );
};

export default ThreadList;
