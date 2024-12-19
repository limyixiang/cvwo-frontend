import "../App.css";
import { fetchPostsByCategory, fetchUserByID } from "../backend";
import Post from "../types/Post";
import User from "../types/User";
import Category from "../types/Category";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type BasicThreadListProps = {
    refresh: boolean;
    selectedCategory: Category;
};

const BasicThreadList: React.FC<BasicThreadListProps> = ({ refresh, selectedCategory }) => {
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
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <ul>
                <li>
                    <Link to="/thread/1">{"Inspirational Quotes"}</Link>
                    {" by Aiken"}
                </li>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/thread/${post.id}`}>{post.title}</Link>
                            {" by "}
                            {users[post.user_id]?.name || "Unknown"}
                        </li>
                    ))
                ) : (
                    <li>No threads for now, be the first to start a thread!</li>
                )}
            </ul>
        </div>
    );
};

export default BasicThreadList;
