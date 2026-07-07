import { useState } from "react";
import {
    useUsersGetAll,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useLogin,
} from "../../../frontend/src/graphql/user/useUser";

const initialUserForm = {
    username: "",
    password: "",
    age: "",
    email: "",
    city: "",
};

const initialLoginForm = {
    username: "",
    password: "",
};

const UserPage = () => {
    const [userForm, setUserForm] = useState(initialUserForm);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [editId, setEditId] = useState(null);

    const { data, loading, error } = useUsersGetAll();

    const [createUser] = useCreateUser();
    const [updateUser] = useUpdateUser();
    const [deleteUser] = useDeleteUser();
    const [login] = useLogin();

    const users = data?.usersGetAll || [];

    const handleUserChange = (e) => {
        const { name, value } = e.target;

        setUserForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        if (!loginForm.username || !loginForm.password) {
            alert("아이디와 비밀번호를 입력하세요.");
            return;
        }

        try {
            const result = await login({
                variables: {
                    input: {
                        username: loginForm.username,
                        password: loginForm.password,
                    },
                },
            });

            const token = result.data.login.accessToken;

            localStorage.setItem("access_token", token);

            alert("로그인 성공");
            setLoginForm(initialLoginForm);
        } catch (err) {
            console.error(err);
            alert("로그인 실패");
        }
    };

    const handleSubmit = async () => {
        if (
            !userForm.username ||
            !userForm.password ||
            !userForm.age ||
            !userForm.email ||
            !userForm.city
        ) {
            alert("모든 값을 입력하세요.");
            return;
        }

        const input = {
            username: userForm.username,
            password: userForm.password,
            age: Number(userForm.age),
            email: userForm.email,
            city: userForm.city,
        };

        try {
            if (editId) {
                await updateUser({
                    variables: {
                        id: editId,
                        input,
                    },
                });

                alert("회원 수정 완료");
            } else {
                await createUser({
                    variables: {
                        input,
                    },
                });

                alert("회원 등록 완료");
            }

            setUserForm(initialUserForm);
            setEditId(null);
        } catch (err) {
            console.error(err);
            alert("처리 실패");
        }
    };

    const handleEdit = (user) => {
        setEditId(user.id);

        setUserForm({
            username: user.username,
            password: "",
            age: user.age,
            email: user.email,
            city: user.city,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteUser({
                variables: {
                    id,
                },
            });

            alert("삭제 완료");
        } catch (err) {
            console.error(err);
            alert("삭제 실패");
        }
    };

    const handleCancel = () => {
        setUserForm(initialUserForm);
        setEditId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        alert("로그아웃 완료");
    };

    if (loading) return <div style={styles.page}>로딩 중...</div>;
    if (error) return <div style={styles.page}>에러: {error.message}</div>;

    return (
        <div style={styles.page}>
            <h2>회원 관리</h2>

            <section style={styles.section}>
                <h3>로그인</h3>

                <div style={styles.formBox}>
                    <input
                        style={styles.input}
                        name="username"
                        placeholder="아이디"
                        value={loginForm.username}
                        onChange={handleLoginChange}
                    />

                    <input
                        style={styles.input}
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                    />

                    <button style={styles.loginBtn} onClick={handleLogin}>
                        로그인
                    </button>

                    <button style={styles.cancelBtn} onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </section>

            <section style={styles.section}>
                <h3>{editId ? "회원 수정" : "회원 등록"}</h3>

                <div style={styles.formBox}>
                    <input
                        style={styles.input}
                        name="username"
                        placeholder="아이디"
                        value={userForm.username}
                        onChange={handleUserChange}
                    />

                    <input
                        style={styles.input}
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={userForm.password}
                        onChange={handleUserChange}
                    />

                    <input
                        style={styles.input}
                        name="age"
                        type="number"
                        placeholder="나이"
                        value={userForm.age}
                        onChange={handleUserChange}
                    />

                    <input
                        style={styles.input}
                        name="email"
                        placeholder="이메일"
                        value={userForm.email}
                        onChange={handleUserChange}
                    />

                    <input
                        style={styles.input}
                        name="city"
                        placeholder="도시"
                        value={userForm.city}
                        onChange={handleUserChange}
                    />

                    <button style={styles.addBtn} onClick={handleSubmit}>
                        {editId ? "수정 완료" : "추가"}
                    </button>

                    {editId && (
                        <button style={styles.cancelBtn} onClick={handleCancel}>
                            취소
                        </button>
                    )}
                </div>
            </section>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>아이디</th>
                    <th style={styles.th}>나이</th>
                    <th style={styles.th}>이메일</th>
                    <th style={styles.th}>도시</th>
                    <th style={styles.th}>관리</th>
                </tr>
                </thead>

                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td style={styles.td}>{user.id}</td>
                        <td style={styles.td}>{user.username}</td>
                        <td style={styles.td}>{user.age}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>{user.city}</td>
                        <td style={styles.td}>
                            <button style={styles.editBtn} onClick={() => handleEdit(user)}>
                                수정
                            </button>

                            <button
                                style={styles.deleteBtn}
                                onClick={() => handleDelete(user.id)}
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
        width: "1000px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
    },
    section: {
        marginBottom: "30px",
    },
    formBox: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        flexWrap: "wrap",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    addBtn: {
        padding: "8px 14px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#333",
        color: "white",
        cursor: "pointer",
    },
    loginBtn: {
        padding: "8px 14px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#2e7d32",
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

export default UserPage;