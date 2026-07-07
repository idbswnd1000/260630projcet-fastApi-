import { useState } from "react";
import {
    useProductsGetAll,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from "../../../frontend/src/graphql/product/useProduct";

const initialForm = {
    productName: "",
    color: "",
    price: "",
    salePrice: "",
    categoryCode: "",
};

const ProductPage = () => {
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);

    const { data, loading, error } = useProductsGetAll();

    const [createProduct] = useCreateProduct();
    const [updateProduct] = useUpdateProduct();
    const [deleteProduct] = useDeleteProduct();

    const products = data?.productsGetAll || [];

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        const input = {
            productName: form.productName,
            color: form.color,
            price: Number(form.price),
            salePrice: Number(form.salePrice),
            categoryCode: form.categoryCode,
        };

        if (editId) {
            await updateProduct({
                variables: {
                    id: editId,
                    input,
                },
            });

            alert("수정 완료");
        } else {
            await createProduct({
                variables: {
                    input,
                },
            });

            alert("등록 완료");
        }

        setForm(initialForm);
        setEditId(null);
    };

    const handleEdit = (product) => {
        setEditId(product.id);

        setForm({
            productName: product.productName,
            color: product.color,
            price: product.price,
            salePrice: product.salePrice,
            categoryCode: product.categoryCode,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("삭제하시겠습니까?")) return;

        await deleteProduct({
            variables: {
                id,
            },
        });
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error.message}</h2>;

    return (
        <div style={styles.page}>
            <h2>상품 관리</h2>

            <div style={styles.form}>
                <input
                    name="productName"
                    placeholder="상품명"
                    value={form.productName}
                    onChange={handleChange}
                />

                <input
                    name="color"
                    placeholder="색상"
                    value={form.color}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    placeholder="가격"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    name="salePrice"
                    placeholder="판매가"
                    type="number"
                    value={form.salePrice}
                    onChange={handleChange}
                />

                <input
                    name="categoryCode"
                    placeholder="카테고리"
                    value={form.categoryCode}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>
                    {editId ? "수정" : "추가"}
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>상품명</th>
                    <th>색상</th>
                    <th>가격</th>
                    <th>판매가</th>
                    <th>카테고리</th>
                    <th>관리</th>
                </tr>
                </thead>

                <tbody>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.productName}</td>
                        <td>{p.color}</td>
                        <td>{p.price}</td>
                        <td>{p.salePrice}</td>
                        <td>{p.categoryCode}</td>

                        <td>
                            <button onClick={() => handleEdit(p)}>
                                수정
                            </button>

                            <button
                                onClick={() => handleDelete(p.id)}
                                style={{ marginLeft: 5 }}
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
        width: "1100px",
        margin: "30px auto",
    },

    form: {
        display: "flex",
        gap: 10,
        marginBottom: 20,
        flexWrap: "wrap",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
};

export default ProductPage;