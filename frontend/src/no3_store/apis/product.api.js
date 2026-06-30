import axios from "axios";



export const productAllGetApi = async () => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/products")
        return response.data
    }
    catch(error){
        return error
    }
}


export const productGetApi = async (id) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://127.0.0.1:8000/products",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/products/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productDeleteApi = async (id) => {
    try{
        await axios.delete(`http://127.0.0.1:8000/products/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}