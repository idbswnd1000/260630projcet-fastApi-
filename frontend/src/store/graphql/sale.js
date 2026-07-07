import { gql } from "@apollo/client";

export const GET_SALES = gql`
    query {
        sales {
            id
            userId
            productId
            quantity
            discountRate
            totalPrice
            createdAt
        }
    }
`;

export const GET_SALE = gql`
    query GetSale($id: Int!) {
        sale(id: $id) {
            id
            userId
            productId
            quantity
            discountRate
            totalPrice
            createdAt
        }
    }
`;