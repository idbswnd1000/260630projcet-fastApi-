import React, { useState } from "react";
import styled from "styled-components";

const SalesTable = ({ sales }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const totalPages = Math.ceil(sales.length / pageSize);

    const startIndex = (page - 1) * pageSize;
    const currentSales = sales.slice(startIndex, startIndex + pageSize);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    return (
        <Container>
            <TopBar>
                <Total>전체 {sales.length}건</Total>

                <Select value={pageSize} onChange={handlePageSizeChange}>
                    <option value={5}>5개씩 보기</option>
                    <option value={10}>10개씩 보기</option>
                    <option value={20}>20개씩 보기</option>
                    <option value={50}>50개씩 보기</option>
                </Select>
            </TopBar>

            <ScrollGuide>← 좌우로 드래그해서 더 보기 →</ScrollGuide>

            <TableWrapper>
                <Table>
                    <thead>
                    <tr>
                        <Th>날짜</Th>
                        <Th>고객</Th>
                        <Th>지역</Th>
                        <Th>제품</Th>
                        <Th>제품분류</Th>
                        <Th>분류</Th>
                        <Th>프로모션</Th>
                        <Th>채널</Th>
                        <Th>수량</Th>
                        <Th>판매가</Th>
                        <Th>총금액</Th>
                    </tr>
                    </thead>

                    <tbody>
                    {currentSales.map((item) => (
                        <tr key={item.id}>
                            <Td>{item.date}</Td>
                            <Td>{item.customerName}</Td>
                            <Td>{item.regionName}</Td>
                            <Td>{item.productName}</Td>
                            <Td>{item.productCategoryName}</Td>
                            <Td>{item.categoryName}</Td>
                            <Td>{item.promotionName}</Td>
                            <Td>{item.channelName}</Td>
                            <Td>{item.quantity}</Td>
                            <Td>{item.salePrice?.toLocaleString()}</Td>
                            <Td>{item.totalPrice?.toLocaleString()}</Td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </TableWrapper>

            <Pagination>
                <PageButton
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    이전
                </PageButton>

                <PageInfo>
                    {page} / {totalPages}
                </PageInfo>

                <PageButton
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    다음
                </PageButton>
            </Pagination>
        </Container>
    );
};

export default SalesTable;

const Container = styled.div`
    width: 100%;
`;

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const Total = styled.div`
    font-weight: bold;
`;

const Select = styled.select`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

const ScrollGuide = styled.div`
    display: none;
    font-size: 13px;
    color: #777;
    margin-bottom: 8px;

    @media (max-width: 900px) {
        display: block;
    }
`;

const TableWrapper = styled.div`
    width: 100%;
    max-height: 650px;   /* 세로 최대 높이 */
    overflow: auto;      /* 가로/세로 둘 다 스크롤 */

    border: 1px solid #ddd;
    border-radius: 10px;

    cursor: grab;

    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #eee;
    }
`;

const Table = styled.table`
    min-width: 1200px;
    width: 100%;
    border-collapse: collapse;
    background: white;
`;

const Th = styled.th`
    background: #1976d2;
    color: white;
    padding: 12px;
    white-space: nowrap;
`;

const Td = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    white-space: nowrap;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: ${({ disabled }) => (disabled ? "#ccc" : "#1976d2")};
    color: white;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const PageInfo = styled.div`
    font-weight: bold;
`;