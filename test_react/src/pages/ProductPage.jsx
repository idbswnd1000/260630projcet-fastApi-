import { useState } from "react";
import useProducts from "../hooks/useProducts";

function ProductPage() {
    const { products, create, update, remove } = useProducts();
    const [selected, setSelected] = useState(null);

    const [form, setForm] = useState({
        product_name: "",
        color: "",
        cost_price: "",
        sale_price: "",
        category_code: ""
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
            product_name: "",
            color: "",
            cost_price: "",
            sale_price: "",
            category_code: ""
        });
    };

    const register = () => {
        create.mutate({
            ...form,
            cost_price: Number(form.cost_price),
            sale_price: Number(form.sale_price)
        });
        clear();
    };

    const modify = () => {
        update.mutate({
            id: selected,
            product: {
                ...form,
                cost_price: Number(form.cost_price),
                sale_price: Number(form.sale_price)
            }
        });
        clear();
    };

    if (products.isLoading) return <h2>Loading...</h2>;

    return (
        <>
            <h2>Product CRUD</h2>

            <input name="product_name" placeholder="상품명" value={form.product_name} onChange={change}/>
            <input name="color" placeholder="색상" value={form.color} onChange={change}/>
            <input name="cost_price" placeholder="원가" value={form.cost_price} onChange={change}/>
            <input name="sale_price" placeholder="판매가" value={form.sale_price} onChange={change}/>
            <input name="category_code" placeholder="카테고리" value={form.category_code} onChange={change}/>

            <br/><br/>

            <button onClick={register}>등록</button>
            <button disabled={!selected} onClick={modify}>수정</button>

            <hr/>

            <table border="1" cellPadding="10" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>상품명</th>
                    <th>색상</th>
                    <th>원가</th>
                    <th>판매가</th>
                    <th>카테고리</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {products.data?.map(product=>(
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.color}</td>
                        <td>{product.cost_price}</td>
                        <td>{product.sale_price}</td>
                        <td>{product.category_code}</td>
                        <td>
                            <button onClick={()=>{
                                setSelected(product.id);
                                setForm({
                                    product_name: product.product_name,
                                    color: product.color,
                                    cost_price: String(product.cost_price),
                                    sale_price: String(product.sale_price),
                                    category_code: product.category_code
                                });
                            }}>선택</button>

                            <button onClick={()=>remove.mutate(product.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ProductPage;