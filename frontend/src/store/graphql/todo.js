import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query {
        todos {
            id
            subject
            checked
        }
    }
`;

export const GET_TODO = gql`
    query GetTodo($id: Int!) {
        todo(id: $id) {
            id
            subject
            checked
        }
    }
`;

export const CREATE_TODO = gql`
    mutation CreateTodo($input: TodoInput!) {
        createTodo(input: $input) {
            id
            subject
            checked
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: Int!, $input: TodoInput!) {
        updateTodo(id: $id, input: $input) {
            id
            subject
            checked
        }
    }
`;

export const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: Int!) {
        toggleTodo(id: $id) {
            id
            subject
            checked
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: Int!) {
        deleteTodo(id: $id)
    }
`;