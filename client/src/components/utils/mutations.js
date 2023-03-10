import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// export const UPDATE_USER = gql``;
// export const REMOVE_USER = gql``;
// export const ADD_TOOL = gql``;
// export const REMOVE_TOOL = gql``;
// export const CREATE_GARAGE = gql``;
// export const DELETE_GARAGE = gql``;
// export const JOIN_GARAGE = gql``;
// export const LEAVE_GARAGE = gql``;
// export const ADD_CHECKOUT = gql``;
// export const DELETE_CHECKOUT = gql``;
