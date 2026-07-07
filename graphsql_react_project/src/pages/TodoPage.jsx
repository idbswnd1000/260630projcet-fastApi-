import { useState } from "react";
import {
    useTodosGetAll,
    useCreateTodo,
    useUpdateTodo,
    useDeleteTodo,
} from "../../../frontend/src/graphql/todo/useTodo";

const initialForm = {
    subject: "",
    checked: false,
};

const TodoPage = () => {
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const { data, loading, error } = useTodosGetAll();

    const [createTodo] = useCreateTodo();
    const [updateTodo] = useUpdateTodo();
    const [deleteTodo] = useDeleteTodo();

    const todos = data?.todosGetAll || [];

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.subject) {
            alert("할 일을 입력하세요.");
            return;
        }

        const input = {
            subject: form.subject,
            checked: form.checked,
        };

        if (editId) {
            await updateTodo({
                variables: {
                    id: editId,
                    input,
                },
            });

            alert("수정 완료");
        } else {
            await createTodo({
                variables: {
                    input,
                },
            });

            alert("추가 완료");
        }

        setForm(initialForm);
        setEditId(null);
    };

    const handleEdit = (todo) => {
        setEditId(todo.id);

        setForm({
            subject: todo.subject,
            checked: todo.checked,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("삭제하시겠습니까?")) return;

        await deleteTodo({
            variables: {
                id,
            },
        });

        alert("삭제 완료");
    };

    const handleCancel = () => {
        setForm(initialForm);
        setEditId(null);
    };

    if (loading) return <div style={styles.page}>로딩 중...</div>;
    if (error) return <div style={styles.page}>에러: {error.message}</div>;

    return (
        <div style={styles.page}>
            <h2>할 일 관리</h2>

            <div style={styles.formBox}>
                <input
                    style={styles.input}
                    name="subject"
                    placeholder="할 일"
                    value={form.subject}
                    onChange={handleChange}
                />

                <label style={styles.checkboxLabel}>
                    <input
                        name="checked"
                        type="checkbox"
                        checked={form.checked}
                        onChange={handleChange}
                    />
                    완료 여부
                </label>

                <button style={styles.addBtn} onClick={handleSubmit}>
                    {editId ? "수정 완료" : "추가"}
                </button>

                {editId && (
                    <button style={styles.cancelBtn} onClick={handleCancel}>
                        취소
                    </button>
                )}
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>할 일</th>
                    <th style={styles.th}>완료</th>
                    <th style={styles.th}>관리</th>
                </tr>
                </thead>

                <tbody>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td style={styles.td}>{todo.id}</td>
                        <td style={styles.td}>{todo.subject}</td>
                        <td style={styles.td}>{todo.checked ? "완료" : "미완료"}</td>
                        <td style={styles.td}>
                            <button style={styles.editBtn} onClick={() => handleEdit(todo)}>
                                수정
                            </button>

                            <button
                                style={styles.deleteBtn}
                                onClick={() => handleDelete(todo.id)}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    page: {
        width: "900px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
    },
    formBox: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    addBtn: {
        padding: "8px 14px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#333",
        color: "white",
        cursor: "pointer",
    },
    cancelBtn: {
        padding: "8px 14px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#777",
        color: "white",
        cursor: "pointer",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        border: "1px solid #ddd",
        padding: "10px",
        backgroundColor: "#f2f2f2",
    },
    td: {
        border: "1px solid #ddd",
        padding: "10px",
        textAlign: "center",
    },
    editBtn: {
        marginRight: "6px",
        padding: "6px 10px",
        border: "none",
        backgroundColor: "#1976d2",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
    },
    deleteBtn: {
        padding: "6px 10px",
        border: "none",
        backgroundColor: "#d32f2f",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default TodoPage;