import axios from "axios";



export const employeeAllGetApi = async () => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/employees")
        return response.data
    }
    catch(error){
        return error
    }
}

export const employeeGetApi = async (id) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/employees/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const employeePostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://127.0.0.1:8000/employees",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const employeePutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/employees/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const employeeDeleteApi = async (id) => {
    try{
        await axios.delete(`http://127.0.0.1:8000/employees/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}