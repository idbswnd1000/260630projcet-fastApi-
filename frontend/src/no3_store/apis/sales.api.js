import axios from "axios";


export const salesAllGetApi = async () => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/sales")
        return response.data
    }
    catch(error){
        return error
    }
}


export const salesGetApi = async (id) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/sales/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://127.0.0.1:8000/sales",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/sales/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesDeleteApi = async (id) => {
    try{
        await axios.delete(`http://127.0.0.1:8000/sales/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}