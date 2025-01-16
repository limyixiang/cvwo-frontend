type Comment = {
    id: number;
    post_id: number;
    user_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    likes: number;
    dislikes: number;
};

export default Comment;
