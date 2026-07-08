import React from "react";
import styled from "styled-components";

import { useSales } from "../stores/hooks/useSales";
import SalesTable from "../components/SalesTable";

const SalesPage = () => {

    const { data, loading, error } = useSales();

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error.message}</h2>;

    return (
        <Container>
            <Title>Sales List</Title>

            <SalesTable sales={data.viewSales} />
        </Container>
    );
};

export default SalesPage;

const Container = styled.div`
    padding: 40px;
`;

const Title = styled.h1`
    margin-bottom: 30px;
`;