import BasicCommentList from "../components/CommentList";
import User from "../types/User";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

import React, { useState } from "react";

type BasicThreadViewProps = {
    user: User | null;
};

const BasicThreadView: React.FC<BasicThreadViewProps> = ({ user }) => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentText, setCommentText] = useState("");

    const hideCommentBox = () => {
        setIsAddComment(false);
    };

    const showCommentBox = () => {
        setIsAddComment(true);
    };

    const hideButton = () => {
        setIsShowButton(false);
    };

    const showButton = () => {
        setIsShowButton(true);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h3>{"Inspirational Quotes"}</h3>
            <h4>{"Thread started by Aiken"}</h4>
            <BasicCommentList styled={false} />
            <Link to="/">{`<- Back to threads`}</Link>
            <br />
            <br />

            <Typewriter
                onInit={(typewriter) => {
                    hideButton();
                    typewriter
                        .changeDelay(80)
                        .pauseFor(1500)
                        .typeString("It's a little plain isn't it?")
                        .callFunction(showButton)
                        .start();
                }}
            />
            {isShowButton && (
                <Button variant="contained" color="primary" component={Link} to="/thread/1/styled">
                    {"Yes"}
                </Button>
            )}
            <br />
            <Button variant="outlined" color="primary" onClick={showCommentBox}>
                {"Reply"}
            </Button>
            {isAddComment && (
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        placeholder={`Reply as ${user?.name}`}
                        value={commentText}
                        onChange={handleCommentChange}
                    />
                    <br />
                    <Button variant="contained" color="primary" onClick={hideCommentBox}>
                        {"Submit"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BasicThreadView;
