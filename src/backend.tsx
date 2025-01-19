import axios, { isAxiosError } from "axios";

const URL = "http://localhost:8080";
// const URL = "https://cvwo-backend-yixiang-f54bf3fe1878.herokuapp.com";

// USER-RELATED
export const fetchUser = async (username: string) => {
    try {
        const response = await axios.get(`${URL}/api/users/${username}`);
        return response.data.payload.data;
    } catch (error) {
        // if (isAxiosError(error)) {
        //     console.log(error.response?.data.errorCode);
        // }
        if (isAxiosError(error) && error.response && error.response.data.errorCode === 404) {
            throw new Error("User not found");
        }
        throw error;
    }
};

export const fetchUserByID = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/api/users/id/${id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createUser = async (username: string) => {
    try {
        const response = await axios.post(`${URL}/api/users`, { name: username });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// CATEGORY-RELATED
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${URL}/api/categories`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// POST-RELATED
export const createPost = async (
    user_id: number,
    category_id: number,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date,
) => {
    try {
        const response = await axios.post(`${URL}/api/posts`, {
            user_id,
            category_id,
            title,
            content,
            created_at,
            updated_at,
        });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${URL}/api/posts`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPostsByCategory = async (category_id: number) => {
    if (category_id === -1) {
        return fetchPosts();
    }
    try {
        const response = await axios.get(`${URL}/api/posts/category/${category_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPostByID = async (post_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/posts/${post_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePost = async (post_id: number, title: string, content: string, updated_at: Date) => {
    try {
        const response = await axios.patch(`${URL}/api/posts/${post_id}`, { title, content, updated_at });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletePost = async (post_id: number) => {
    try {
        await axios.delete(`${URL}/api/posts/${post_id}`);
        return;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const likePost = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/posts/${post_id}/like`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unlikePost = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/posts/${post_id}/unlike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const dislikePost = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/posts/${post_id}/dislike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const undislikePost = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/posts/${post_id}/undislike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkPostLikedByUser = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/posts/${post_id}/checklike/${user_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkPostDislikedByUser = async (post_id: number, user_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/posts/${post_id}/checkdislike/${user_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// COMMENT-RELATED
export const fetchCommentsByPost = async (post_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/comments/post/${post_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createComment = async (
    user_id: number,
    post_id: number,
    content: string,
    created_at: Date,
    updated_at: Date,
) => {
    try {
        const response = await axios.post(`${URL}/api/comments`, { user_id, post_id, content, created_at, updated_at });
        await axios.patch(`${URL}/api/posts/${post_id}/updatetime`, { updated_at });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateComment = async (comment_id: number, content: string, updated_at: Date) => {
    try {
        const response = await axios.patch(`${URL}/api/comments/${comment_id}`, { content, updated_at });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteComment = async (comment_id: number) => {
    try {
        await axios.delete(`${URL}/api/comments/${comment_id}`);
        return;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const likeComment = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/comments/${comment_id}/like`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unlikeComment = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/comments/${comment_id}/unlike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const dislikeComment = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/comments/${comment_id}/dislike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const undislikeComment = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.patch(`${URL}/api/comments/${comment_id}/undislike`, { user_id });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkCommentLikedByUser = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/comments/${comment_id}/checklike/${user_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkCommentDislikedByUser = async (comment_id: number, user_id: number) => {
    try {
        const response = await axios.get(`${URL}/api/comments/${comment_id}/checkdislike/${user_id}`);
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
