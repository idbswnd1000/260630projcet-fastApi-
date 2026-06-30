import { useState } from "react";
import useEmployees from "../hooks/useEmployees";

function EmployeePage() {
    const { employees, create, update, remove } = useEmployees();
    const [selected, setSelected] = useState(null);

    const [form, setForm] = useState({
        name: "",
        age: "",
        job: "",
        language: "",
        pay: ""
    });

    const change = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const clear = () => {
        setSelected(null);
        setForm({
            name: "",
            age: "",
            job: "",
            language: "",
            pay: ""
        });
    };

    const register = () => {
        create.mutate({
            ...form,
            age: Number(form.age),
            pay: Number(form.pay)
        });
        clear();
    };

    const modify = () => {
        update.mutate({
            id: selected,
            employee: {
                ...form,
                age: Number(form.age),
                pay: Number(form.pay)
            }
        });
        clear();
    };

    if (employees.isLoading) return <h2>Loading...</h2>;

    return (
        <>
            <h2>Employee CRUD</h2>

            <input name="name" placeholder="이름" value={form.name} onChange={change} />
            <input name="age" placeholder="나이" value={form.age} onChange={change} />
            <input name="job" placeholder="직업" value={form.job} onChange={change} />
            <input name="language" placeholder="언어" value={form.language} onChange={change} />
            <input name="pay" placeholder="급여" value={form.pay} onChange={change} />

            <br /><br />

            <button onClick={register}>등록</button>
            <button disabled={!selected} onClick={modify}>수정</button>

            <hr />

            <table border="1" cellPadding="10" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>직업</th>
                    <th>언어</th>
                    <th>급여</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {employees.data?.map(emp => (
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.age}</td>
                        <td>{emp.job}</td>
                        <td>{emp.language}</td>
                        <td>{emp.pay}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setSelected(emp.id);
                                    setForm({
                                        name: emp.name,
                                        age: String(emp.age),
                                        job: emp.job,
                                        language: emp.language,
                                        pay: String(emp.pay)
                                    });
                                }}
                            >
                                선택
                            </button>
                            <button onClick={() => remove.mutate(emp.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default EmployeePage;