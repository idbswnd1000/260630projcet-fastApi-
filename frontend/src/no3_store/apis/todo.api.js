import axios from "axios";

export const todoAllGetApi = async () => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/todos")
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoGetApi = async (id) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/todos/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://127.0.0.1:8000/todos", dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/todos/${dataObj.id}`, dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoDeleteApi = async (id) => {
    try{
        await axios.delete(`http://127.0.0.1:8000/todos/${id}`)
        return id
    }
    catch(error){
        return error
    }
}