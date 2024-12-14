import BasicThreadList from "../components/BasicThreadList";
import User from "../types/User";
import React from "react";

type HomeProps = {
    user: User | null;
};

const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <>
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            {user && <h4>{`Welcome, ${user.name}!`}</h4>}
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
