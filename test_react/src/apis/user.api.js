import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getUsers = async () => {
    const { data } = await api.get("/users");
    return data;
};

export const createUser = async (user) => {
    const { data } = await api.post("/users", user);
    return data;
};

export const updateUser = async ({ id, user }) => {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};