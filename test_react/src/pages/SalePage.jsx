import { useState } from "react";
import useSales from "../hooks/useSales";

function SalePage() {

    const { sales, create, update, remove } = useSales();
    const [selected, setSelected] = useState(null);

    const [form, setForm] = useState({
        date:"",
        product_code:"",
        customer_code:"",
        promotion_code:"",
        channel_code:"",
        quantity:""
    });

    const change=e=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const clear=()=>{
        setSelected(null);
        setForm({
            date:"",
            product_code:"",
            customer_code:"",
            promotion_code:"",
            channel_code:"",
            quantity:""
        });
    };

    const register=()=>{
        create.mutate({
            ...form,
            product_code:Number(form.product_code),
            customer_code:Number(form.customer_code),
            promotion_code:Number(form.promotion_code),
            channel_code:Number(form.channel_code),
            quantity:Number(form.quantity)
        });
        clear();
    };

    const modify=()=>{
        update.mutate({
            id:selected,
            sale:{
                ...form,
                product_code:Number(form.product_code),
                customer_code:Number(form.customer_code),
                promotion_code:Number(form.promotion_code),
                channel_code:Number(form.channel_code),
                quantity:Number(form.quantity)
            }
        });
        clear();
    };

    if(sales.isLoading) return <h2>Loading...</h2>;

    return(
        <>
            <h2>Sales CRUD</h2>

            <input name="date" placeholder="날짜" value={form.date} onChange={change}/>
            <input name="product_code" placeholder="상품코드" value={form.product_code} onChange={change}/>
            <input name="customer_code" placeholder="고객코드" value={form.customer_code} onChange={change}/>
            <input name="promotion_code" placeholder="프로모션코드" value={form.promotion_code} onChange={change}/>
            <input name="channel_code" placeholder="채널코드" value={form.channel_code} onChange={change}/>
            <input name="quantity" placeholder="수량" value={form.quantity} onChange={change}/>

            <br/><br/>

            <button onClick={register}>등록</button>
            <button disabled={!selected} onClick={modify}>수정</button>

            <hr/>

            <table border="1" cellPadding="10" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>날짜</th>
                    <th>상품코드</th>
                    <th>고객코드</th>
                    <th>프로모션</th>
                    <th>채널</th>
                    <th>수량</th>
                    <th>관리</th>
                </tr>
                </thead>

                <tbody>
                {sales.data?.map(sale=>(
                    <tr key={sale.id}>
                        <td>{sale.id}</td>
                        <td>{sale.date}</td>
                        <td>{sale.product_code}</td>
                        <td>{sale.customer_code}</td>
                        <td>{sale.promotion_code}</td>
                        <td>{sale.channel_code}</td>
                        <td>{sale.quantity}</td>
                        <td>
                            <button onClick={()=>{
                                setSelected(sale.id);
                                setForm({...sale});
                            }}>선택</button>

                            <button onClick={()=>remove.mutate(sale.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </>
    );
}

export default SalePage;