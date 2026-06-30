import { useState } from "react";

import useEmployees from "./hooks/useEmployees";
import useTodos from "./hooks/useTodos.js";

function App() {
    const {
        employees,
        create,
        update,
        remove
    } = useEmployees();

    const {
        todos,
        create: createTodo,
        update: updateTodo,
        remove: removeTodo
    } = useTodos();

    const [selected, setSelected] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [form, setForm] = useState({
        name: "",
        age: "",
        job: "",
        language: "",
        pay: ""
    });

    const [todoForm, setTodoForm] = useState({
        subject: "",
        checked: false
    });

    const change = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const todoChange = e => {
        const { name, value, type, checked } = e.target;

        setTodoForm({
            ...todoForm,
            [name]: type === "checkbox" ? checked : value
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

    const clearTodo = () => {
        setSelectedTodo(null);
        setTodoForm({
            subject: "",
            checked: false
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

    const addTodo = () => {
        createTodo.mutate(todoForm);
        clearTodo();
    };

    const modifyTodo = () => {
        updateTodo.mutate({
            id: selectedTodo,
            todo: todoForm
        });
        clearTodo();
    };

    const toggleTodo = todo => {
        updateTodo.mutate({
            id: todo.id,
            todo: {
                subject: todo.subject,
                checked: !todo.checked
            }
        });
    };

    if (employees.isLoading || todos.isLoading)
        return <h2>Loading...</h2>;

    return (
        <div style={{ width: 900, margin: "30px auto" }}>
            <h1>React Query CRUD</h1>

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

                            <button onClick={() => remove.mutate(emp.id)}>
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <hr />

            <h2>Todo CRUD</h2>

            <input
                name="subject"
                placeholder="할 일"
                value={todoForm.subject}
                onChange={todoChange}
            />

            <label>
                <input
                    type="checkbox"
                    name="checked"
                    checked={todoForm.checked}
                    onChange={todoChange}
                />
                완료 여부
            </label>

            <br /><br />

            <button onClick={addTodo}>Todo 등록</button>
            <button disabled={!selectedTodo} onClick={modifyTodo}>Todo 수정</button>

            <br /><br />

            <table border="1" cellPadding="10" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>할 일</th>
                    <th>완료 여부</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {todos.data?.map(todo => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.subject}</td>
                        <td>{todo.checked ? "완료" : "미완료"}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setSelectedTodo(todo.id);
                                    setTodoForm({
                                        subject: todo.subject,
                                        checked: todo.checked
                                    });
                                }}
                            >
                                선택
                            </button>

                            <button onClick={() => toggleTodo(todo)}>
                                상태 변경
                            </button>

                            <button onClick={() => removeTodo.mutate(todo.id)}>
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;