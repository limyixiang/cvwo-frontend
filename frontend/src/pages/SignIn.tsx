import User from "../types/User";
import { fetchUser, createUser } from "../backend";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type SignInProps = {
    setUser: (user: User) => void;
};

const SignIn: React.FC<SignInProps> = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let user: User;
            try {
                user = await fetchUser(username);
                console.log("fetched user: ", user);
            } catch (error) {
                if (error instanceof Error && error.message === "User not found") {
                    user = await createUser(username);
                    console.log("Created user: ", user);
                } else {
                    throw error;
                }
            }
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                    Welcome to CampusConnect! Please sign in with your username below.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} mt={2}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
