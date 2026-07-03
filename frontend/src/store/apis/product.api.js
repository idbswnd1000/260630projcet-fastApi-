import { rootApi } from "./root.api.js";

export const productAllGetApi = async () => {
    const response = await rootApi.get("/products/");
    return response.data;
};

export const productGetApi = async (id) => {
    const response = await rootApi.get(`/products/${id}/`);
    return response.data;
};

export const productPostApi = async (dataObj) => {
    const response = await rootApi.post("/products/", dataObj);
    return response.data;
};

export const productPutApi = async (dataObj) => {
    const response = await rootApi.put(`/products/${dataObj.id}/`, dataObj);
    return response.data;
};

export const productDeleteApi = async (id) => {
    await rootApi.delete(`/products/${id}/`);
    return id;
};