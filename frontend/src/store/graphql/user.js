import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        users {
            id
            username
            age
            email
            city
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: Int!) {
        user(id: $id) {
            id
            username
            age
            email
            city
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            username
            age
            email
            city
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: Int!, $input: UserInput!) {
        updateUser(id: $id, input: $input) {
            id
            username
            age
            email
            city
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: Int!) {
        deleteUser(id: $id)
    }
`;

export const LOGIN = gql`
mutation Login($input: LoginInput!) {
    login(input:$input){
        accessToken
        tokenType
    }
}
`;

export const ME = gql`
query{
    me{
        id
        username
        age
        email
        city
    }
}
`;