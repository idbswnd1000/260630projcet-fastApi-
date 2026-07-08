import styled from "styled-components";

const DashboardCard = ({ icon, title, value }) => {
    return (
        <Card>
            <Icon>{icon}</Icon>
            <Info>
                <Title>{title}</Title>
                <Value>{value}</Value>
            </Info>
        </Card>
    );
};

export default DashboardCard;

const Card = styled.div`
    background: white;
    border-radius: 20px;
    padding: 26px;
    box-shadow: 0 10px 30px rgba(0,0,0,.08);

    display: flex;
    align-items: center;
    gap: 18px;

    transition: .25s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 18px 40px rgba(0,0,0,.12);
    }
`;

const Icon = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: #eef2ff;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 26px;
`;

const Info = styled.div``;

const Title = styled.div`
    color: #6b7280;
    font-size: 14px;
    font-weight: 700;
`;

const Value = styled.h2`
    margin: 8px 0 0;
    color: #111827;
    font-size: 28px;
    font-weight: 800;
`;