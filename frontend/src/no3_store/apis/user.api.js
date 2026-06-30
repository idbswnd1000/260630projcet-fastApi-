import axios from "axios";

export const userAllGetApi = async ()=>{
    try{
        const response = await axios.get("http://127.0.0.1:8000/users")
        return response.data
    }catch(error){
        return error
    }
}

export const userLoginApi = async (loginUser) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/users?name=${loginUser.username}`
        );
        const users = response.data;
        if (!users.length) {
            throw new Error(
                "존재하지 않는 사용자입니다."
            );
        }
        const foundUser = users[0];
        if(foundUser.password !== loginUser.password ){
            throw new Error(
                "비밀번호가 일치하지 않습니다."
            );
        }
        return foundUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const userRegisterApi = async (userObj)=>{
    try{
        const response = await axios.get(`http://127.0.0.1:8000/users?name=${userObj.username}`)
        const users = response.data
        if(users.length){
            return Error("이미 존재하는 사용자입니다.")
        }
        return await axios.post(`http://127.0.0.1:8000/users`,userObj)
    }catch(error){
        return error
    }
}



