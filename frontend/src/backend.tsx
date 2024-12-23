import axios, { isAxiosError } from "axios";

const URL = "http://localhost:8080";

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

// THREAD-RELATED

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
        await axios.patch(`${URL}/api/posts/${post_id}`, { updated_at });
        return response.data.payload.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
