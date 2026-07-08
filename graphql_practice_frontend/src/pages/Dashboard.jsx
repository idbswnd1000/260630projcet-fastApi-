import styled from "styled-components";
import { useDashboard } from "../stores/hooks/useDashboard";
import DashboardCard from "../components/DashboardCard";
import DashboardChart from "../components/DashboardChart";

const Dashboard = () => {
    const { data, loading, error } = useDashboard();

    if (loading) return <Page><h2>Loading...</h2></Page>;
    if (error) return <Page><h2>{error.message}</h2></Page>;

    const dashboard = data.dashboard;

    return (
        <Page>
            <Header>
                <div>
                    <SubTitle>Overview</SubTitle>
                    <Title>Sales Dashboard</Title>
                </div>
                <Admin>Admin</Admin>
            </Header>

            <CardGrid>
                <DashboardCard
                    icon="💰"
                    title="총 매출"
                    value={`${dashboard.totalSales.toLocaleString()}원`}
                />
                <DashboardCard
                    icon="📦"
                    title="총 주문"
                    value={`${dashboard.totalOrders.toLocaleString()}건`}
                />
                <DashboardCard
                    icon="📈"
                    title="총 판매수량"
                    value={`${dashboard.totalQuantity.toLocaleString()}개`}
                />
                <DashboardCard
                    icon="👤"
                    title="고객 수"
                    value={`${dashboard.customerCount.toLocaleString()}명`}
                />
                <DashboardCard
                    icon="🛒"
                    title="상품 수"
                    value={`${dashboard.productCount.toLocaleString()}개`}
                />
            </CardGrid>

            <ChartBox>
                <ChartHeader>
                    <div>
                        <ChartTitle>제품별 총매출 TOP 10</ChartTitle>
                        <ChartDesc>총매출액 기준 상위 제품 목록</ChartDesc>
                    </div>
                </ChartHeader>

                <DashboardChart data={dashboard.topProducts} />
            </ChartBox>
        </Page>
    );
};

export default Dashboard;

const Page = styled.div`
    min-height: 100vh;
    background: #f5f7fb;
    padding: 42px 48px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 34px;
`;

const SubTitle = styled.div`
    color: #6366f1;
    font-weight: 800;
    margin-bottom: 8px;
`;

const Title = styled.h1`
    margin: 0;
    color: #111827;
    font-size: 36px;
    font-weight: 900;
`;

const Admin = styled.div`
    background: white;
    padding: 12px 20px;
    border-radius: 999px;
    box-shadow: 0 8px 25px rgba(0,0,0,.08);
    font-weight: 800;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 22px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ChartBox = styled.div`
    margin-top: 42px;
    background: white;
    border-radius: 24px;
    padding: 34px;
    box-shadow: 0 10px 30px rgba(0,0,0,.08);
`;

const ChartHeader = styled.div`
    margin-bottom: 24px;
`;

const ChartTitle = styled.h2`
    margin: 0;
    color: #111827;
    font-size: 24px;
    font-weight: 900;
`;

const ChartDesc = styled.div`
    margin-top: 8px;
    color: #6b7280;
`;