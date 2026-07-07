import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query {
        products {
            id
            productName
            color
            price
            salePrice
            productCategoryCode
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProduct($id: Int!) {
        product(id: $id) {
            id
            productName
            color
            price
            salePrice
            productCategoryCode
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
            id
            productName
            color
            price
            salePrice
            productCategoryCode
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: Int!, $input: ProductInput!) {
        updateProduct(id: $id, input: $input) {
            id
            productName
            color
            price
            salePrice
            productCategoryCode
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: Int!) {
        deleteProduct(id: $id)
    }
`;