import CategoryList, { ALL_CATEGORIES } from "../components/CategoryList";
import CreatePostModal from "../components/CreatePostModal";
import ThreadList from "../components/ThreadList";
import Category from "../types/Category";
import User from "../types/User";
import React, { useState } from "react";
import { Button } from "@mui/material";

type HomeProps = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORIES);
    const [refresh, setRefresh] = useState(false);

    const handleCategoryChange = (category: Category) => {
        setSelectedCategory(category);
    };

    const handlePostCreated = () => {
        setRefresh((prev) => !prev);
    };

    const handleSignOut = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <>
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            {user && <h4>{`Welcome, ${user.name}!`}</h4>}
            <Button variant="outlined" color="secondary" onClick={handleSignOut}>
                Sign Out
            </Button>
            <br />
            <CategoryList onCategoryChange={handleCategoryChange} />
            {selectedCategory && <h4>{`Selected category: ${selectedCategory.name}`}</h4>}
            <CreatePostModal user={user} onPostCreated={handlePostCreated} />
            <ThreadList refresh={refresh} selectedCategory={selectedCategory} />
        </>
    );
};

export default Home;
