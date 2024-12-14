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

// THREAD-RELATED

// POST-RELATED

// COMMENT-RELATED
