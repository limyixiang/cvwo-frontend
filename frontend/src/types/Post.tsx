type Post = {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
};

export default Post;
