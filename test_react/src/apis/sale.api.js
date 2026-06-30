import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getSales = async () => {
    const { data } = await api.get("/sales");
    return data;
};

export const createSale = async (sale) => {
    const { data } = await api.post("/sales", sale);
    return data;
};

export const updateSale = async ({ id, sale }) => {
    const { data } = await api.put(`/sales/${id}`, sale);
    return data;
};

export const deleteSale = async (id) => {
    const { data } = await api.delete(`/sales/${id}`);
    return data;
};