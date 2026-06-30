import { useState } from "react";
import useTodos from "../hooks/useTodos";

function TodoPage() {
    const { todos, create, update, remove } = useTodos();
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [todoForm, setTodoForm] = useState({
        subject: "",
        checked: false
    });

    const todoChange = e => {
        const { name, value, type, checked } = e.target;
        setTodoForm({
            ...todoForm,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const clearTodo = () => {
        setSelectedTodo(null);
        setTodoForm({
            subject: "",
            checked: false
        });
    };

    const addTodo = () => {
        create.mutate(todoForm);
        clearTodo();
    };

    const modifyTodo = () => {
        update.mutate({
            id: selectedTodo,
            todo: todoForm
        });
        clearTodo();
    };

    const toggleTodo = todo => {
        update.mutate({
            id: todo.id,
            todo: {
                subject: todo.subject,
                checked: !todo.checked
            }
        });
    };

    if (todos.isLoading) return <h2>Loading...</h2>;

    return (
        <>
            <h2>Todo CRUD</h2>

            <input name="subject" placeholder="할 일" value={todoForm.subject} onChange={todoChange} />

            <label>
                <input type="checkbox" name="checked" checked={todoForm.checked} onChange={todoChange} />
                완료 여부
            </label>

            <br /><br />

            <button onClick={addTodo}>Todo 등록</button>
            <button disabled={!selectedTodo} onClick={modifyTodo}>Todo 수정</button>

            <hr />

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
                {todos.data?.slice().sort((a, b) => a.id - b.id).map(todo => (
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
                            <button onClick={() => toggleTodo(todo)}>상태 변경</button>
                            <button onClick={() => remove.mutate(todo.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default TodoPage;