import BasicThreadList from "../components/BasicThreadList";
import CategoryList from "../components/CategoryList";
import CreatePostModal from "../components/CreatePostModal";
import Category from "../types/Category";
import User from "../types/User";
import React, { useState } from "react";

type HomeProps = {
    user: User | null;
};

const Home: React.FC<HomeProps> = ({ user }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleCategoryChange = (category: Category | null) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            {user && <h4>{`Welcome, ${user.name}!`}</h4>}
            <br />
            <CategoryList onCategoryChange={handleCategoryChange} />
            {selectedCategory && <h4>{`Selected category: ${selectedCategory.name}`}</h4>}
            <CreatePostModal />
            <BasicThreadList />
        </>
    );
};

export default Home;
