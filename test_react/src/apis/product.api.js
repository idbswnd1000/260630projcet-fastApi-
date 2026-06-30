import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getProducts = async () => {
    const { data } = await api.get("/products");
    return data;
};

export const createProduct = async (product) => {
    const { data } = await api.post("/products", product);
    return data;
};

export const updateProduct = async ({ id, product }) => {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};