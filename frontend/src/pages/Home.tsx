import CategoryList, { ALL_CATEGORIES } from "../components/CategoryList";
import CreatePostModal from "../components/CreatePostModal";
import ThreadList from "../components/ThreadList";
import Category from "../types/Category";
import User from "../types/User";
import React, { useState } from "react";
import { Button, Container, Box, Typography, AppBar, Toolbar } from "@mui/material";

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
        <Container maxWidth="md">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        CampusConnect
                    </Typography>
                    {user && (
                        <Button color="inherit" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <CategoryList onCategoryChange={handleCategoryChange} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                    {user && (
                        <Typography variant="h5" gutterBottom>
                            {`Welcome, ${user.name}!`}
                        </Typography>
                    )}
                    <CreatePostModal user={user} onPostCreated={handlePostCreated} />
                </Box>
                <ThreadList refresh={refresh} selectedCategory={selectedCategory} />
            </Box>
        </Container>
    );
};

export default Home;
