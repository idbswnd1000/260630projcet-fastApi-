import { useState } from "react";
import useUsers from "../hooks/useUsers";

function UserPage(){

    const {users,create,update,remove}=useUsers();
    const [selected,setSelected]=useState(null);

    const [form,setForm]=useState({
        name:"",
        password:"",
        age:"",
        email:"",
        city:""
    });

    const change=e=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const clear=()=>{
        setSelected(null);
        setForm({
            name:"",
            password:"",
            age:"",
            email:"",
            city:""
        });
    };

    const register=()=>{
        create.mutate({
            ...form,
            age:Number(form.age)
        });
        clear();
    };

    const modify=()=>{
        update.mutate({
            id:selected,
            user:{
                ...form,
                age:Number(form.age)
            }
        });
        clear();
    };

    if(users.isLoading) return <h2>Loading...</h2>;

    return(
        <>
            <h2>User CRUD</h2>

            <input name="name" placeholder="이름" value={form.name} onChange={change}/>
            <input name="password" placeholder="비밀번호" value={form.password} onChange={change}/>
            <input name="age" placeholder="나이" value={form.age} onChange={change}/>
            <input name="email" placeholder="이메일" value={form.email} onChange={change}/>
            <input name="city" placeholder="도시" value={form.city} onChange={change}/>

            <br/><br/>

            <button onClick={register}>등록</button>
            <button disabled={!selected} onClick={modify}>수정</button>

            <hr/>

            <table border="1" cellPadding="10" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>이메일</th>
                    <th>도시</th>
                    <th>관리</th>
                </tr>
                </thead>

                <tbody>
                {users.data?.map(user=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>{user.city}</td>
                        <td>
                            <button onClick={()=>{
                                setSelected(user.id);
                                setForm({
                                    name:user.name,
                                    password:user.password,
                                    age:String(user.age),
                                    email:user.email,
                                    city:user.city
                                });
                            }}>선택</button>

                            <button onClick={()=>remove.mutate(user.id)}>삭제</button>

                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </>
    );
}

export default UserPage;