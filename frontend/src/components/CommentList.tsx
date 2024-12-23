import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import { fetchCommentsByPost } from "../backend";

import React, { useEffect, useState } from "react";

type CommentListProps = {
    postID: number;
    refresh: boolean;
};

const CommentList: React.FC<CommentListProps> = ({ postID, refresh }: CommentListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetchCommentsByPost(postID)
            .then((fetchedComments) => setComments(fetchedComments))
            .catch((error) => console.error("Error fetching comments:", error));
    }, [postID, refresh]);

    return (
        <ul>
            {comments
                ? comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
                : "Be the first to comment!"}
        </ul>
    );
};

export default CommentList;
