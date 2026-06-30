import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }

});

export const getEmployees = async () => {
    const {data} = await api.get("/employees");
    return data;
};

export const createEmployee = async (employee) => {
    const {data} = await api.post(
        "/employees",
        employee
    );
    return data;
};

export const updateEmployee = async ({id, employee}) => {
    const {data} = await api.put(
        `/employees/${id}`,
        employee
    );
    return data;
};

export const deleteEmployee = async (id) => {
    const {data} = await api.delete(
        `/employees/${id}`
    );
    return data;
};