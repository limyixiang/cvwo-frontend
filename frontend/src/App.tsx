import BasicThreadView from "./pages/BasicThreadView";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import StyledThreadView from "./pages/StyledThreadView";
import User from "./types/User";
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signin" element={<SignIn setUser={setUser} />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Home user={user} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/thread/1"
                            element={
                                <PrivateRoute>
                                    <BasicThreadView user={user} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/thread/1/styled"
                            element={
                                <PrivateRoute>
                                    <StyledThreadView user={user} />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
