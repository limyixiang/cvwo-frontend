import "../App.css";
import { fetchPostsByCategory, fetchUserByID } from "../backend";
import Post from "../types/Post";
import User from "../types/User";
import Category from "../types/Category";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

type ThreadListProps = {
    refresh: boolean;
    selectedCategory: Category;
};

const ThreadList: React.FC<ThreadListProps> = ({ refresh, selectedCategory }: ThreadListProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<{ [key: number]: User }>({});

    useEffect(() => {
        const getPostsAndUsers = async () => {
            try {
                const fetchedPosts = await fetchPostsByCategory(selectedCategory.id);
                setPosts(fetchedPosts);

                if (fetchedPosts) {
                    const userPromises = fetchedPosts.map((post: Post) => fetchUserByID(post.user_id));
                    const fetchedUsers = await Promise.all(userPromises);

                    const usersMap: { [key: number]: User } = {};
                    fetchedUsers.forEach((user) => {
                        usersMap[user.id] = user;
                    });

                    setUsers(usersMap);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getPostsAndUsers();
    }, [refresh, selectedCategory]);

    return (
        <div style={{ width: "50vw", margin: "auto", textAlign: "center" }}>
            <List>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
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
