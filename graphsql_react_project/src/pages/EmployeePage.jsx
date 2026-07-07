import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query {
    employeesGetAll {
      id
      name
      email
      job
      pay
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const initialForm = {
    name: "",
    email: "",
    job: "",
    pay: "",
};

const EmployeePage = () => {
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES);

    const [createEmployee] = useMutation(CREATE_EMPLOYEE);
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

    const employees = data?.employeesGetAll || [];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.job || !form.pay) {
            alert("모든 값을 입력해주세요.");
            return;
        }

        const input = {
            name: form.name,
            email: form.email,
            job: form.job,
            pay: Number(form.pay),
        };

        try {
            if (editId) {
                await updateEmployee({
                    variables: {
                        id: editId,
                        input,
                    },
                });

                alert("직원 정보가 수정되었습니다.");
            } else {
                await createEmployee({
                    variables: {
                        input,
                    },
                });

                alert("직원이 추가되었습니다.");
            }

            setForm(initialForm);
            setEditId(null);
            refetch();
        } catch (err) {
            console.error(err);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    const handleEdit = (emp) => {
        setEditId(emp.id);

        setForm({
            name: emp.name,
            email: emp.email,
            job: emp.job,
            pay: emp.pay,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteEmployee({
                variables: {
                    id,
                },
            });

            alert("삭제되었습니다.");
            refetch();
        } catch (err) {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleCancel = () => {
        setForm(initialForm);
        setEditId(null);
    };

    if (loading) {
        return <div style={styles.loading}>로딩 중...</div>;
    }

    if (error) {
        return <div style={styles.loading}>에러 발생: {error.message}</div>;
    }

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>직원 관리</h2>

            <div style={styles.formBox}>
                <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="text"
                    name="job"
                    placeholder="직무"
                    value={form.job}
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="number"
                    name="pay"
                    placeholder="급여"
                    value={form.pay}
                    onChange={handleChange}
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

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>이름</th>
                    <th style={styles.th}>이메일</th>
                    <th style={styles.th}>직무</th>
                    <th style={styles.th}>급여</th>
                    <th style={styles.th}>관리</th>
                </tr>
                </thead>

                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td style={styles.td} colSpan="6">
                            직원 데이터가 없습니다.
                        </td>
                    </tr>
                ) : (
                    employees.map((emp) => (
                        <tr key={emp.id}>
                            <td style={styles.td}>{emp.id}</td>
                            <td style={styles.td}>{emp.name}</td>
                            <td style={styles.td}>{emp.email}</td>
                            <td style={styles.td}>{emp.job}</td>
                            <td style={styles.td}>
                                {Number(emp.pay).toLocaleString()}원
                            </td>
                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => handleEdit(emp)}
                                >
                                    수정
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(emp.id)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))
                )}
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
    title: {
        marginBottom: "20px",
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
        textAlign: "center",
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
    loading: {
        width: "900px",
        margin: "40px auto",
        fontSize: "20px",
    },
};

export default EmployeePage;