import axios from "axios";

export const userAllGetApi = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/users");
        return response.data;
    } catch (error) {
        return error;
    }
};

export const userLoginApi = async (loginUser) => {
    const { data } = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
            username: loginUser.username,
            password: loginUser.password
        }
    );

    return {
        token: data.access_token,
        username: loginUser.username
    };
};

export const userRegisterApi = async (userObj) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/users", userObj);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || error.message);
    }
};