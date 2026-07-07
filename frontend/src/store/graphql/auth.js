import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_Token
      token_Type
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
      age
      email
      city
    }
  }
`;