import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

import React, { useEffect, useState } from "react";
// import React from "react";

type Props = {
    styled: boolean;
};

const BasicCommentList: React.FC<Props> = ({ styled }: Props) => {
    // const comments: Comment[] = [
    //     {
    //         body:
    //             "Any fool can write code that a computer can understand.\n" +
    //             "Good programmers write code that humans can understand.\n" +
    //             " ~ Martin Fowler",
    //         author: "Benedict",
    //         timestamp: new Date(2022, 10, 28, 10, 33, 30),
    //     },
    //     {
    //         body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
    //         author: "Casey",
    //         timestamp: new Date(2022, 11, 1, 11, 11, 11),
    //     },
    //     {
    //         body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
    //         author: "Duuet",
    //         timestamp: new Date(2022, 11, 2, 10, 30, 0),
    //     },
    // ];

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/comments/post/1")
            .then((response) => {
                console.log("Response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data:", data.payload.data);
                setComments(data.payload.data);
            })
            .catch((error) => console.error("Error fetching comments:", error));
    }, []);

    console.log(comments);

    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem comment={comment} styled={styled} key={comment.id} />
            ))}
        </ul>
    );
};

export default BasicCommentList;
