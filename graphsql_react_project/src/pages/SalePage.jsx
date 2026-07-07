import { useSalesGetAll } from "../../../frontend/src/graphql/sale/useSale";

const SalePage = () => {
    const { data, loading, error } = useSalesGetAll();

    const sales = data?.salesGetAll || [];

    if (loading) return <div style={styles.page}>로딩 중...</div>;
    if (error) return <div style={styles.page}>에러: {error.message}</div>;

    return (
        <div style={styles.page}>
            <h2>판매 내역</h2>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>회원 ID</th>
                    <th style={styles.th}>상품 ID</th>
                    <th style={styles.th}>수량</th>
                    <th style={styles.th}>할인율</th>
                    <th style={styles.th}>총 가격</th>
                    <th style={styles.th}>날짜</th>
                </tr>
                </thead>

                <tbody>
                {sales.map((sale) => (
                    <tr key={sale.id}>
                        <td style={styles.td}>{sale.id}</td>
                        <td style={styles.td}>{sale.userId}</td>
                        <td style={styles.td}>{sale.productId}</td>
                        <td style={styles.td}>{sale.quantity}</td>
                        <td style={styles.td}>{sale.discountRate}</td>
                        <td style={styles.td}>{sale.totalPrice}</td>
                        <td style={styles.td}>{sale.createdAt}</td>
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
};

export default SalePage;