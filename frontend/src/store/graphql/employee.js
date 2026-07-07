import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      email
      job
      pay
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query ($id: Int!) {
    employee(id: $id) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation ($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation ($id: Int!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation ($id: Int!) {
    deleteEmployee(id: $id)
  }
`;