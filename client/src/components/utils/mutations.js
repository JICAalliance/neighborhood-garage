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
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $address: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      phone: $phone
      address: $address
    ) {
      token
      user {
        name
        email
        phone
        myTools {
          _id
          name
        }
        borrowedTools {
          _id
          dueDate
        }
        myGarages {
          _id
          garageName
        }
      }
    }
  }
`;

//TODO: change ADD_TOOL mutation code from AddUser code to correct AddTool code
export const ADD_TOOL = gql`
  mutation addTool($name: String!, $description: String, $image: String) {
    addTool(name: $name, description: $description, image: $image) {
      name
      description
      image
    }
  }
`;

export const CREATE_GARAGE = gql`
  mutation createGarage(
    $admin: ID!
    $garageName: String!
    $description: String
  ) {
    createGarage(
      admin: $admin
      garageName: $garageName
      description: $description
    ) {
      _id
      admin {
        _id
      }
      garageName
      description
      members {
        _id
      }
      invitationCode
      messages {
        _id
      }
    }
  }
`;

export const JOIN_GARAGE = gql`
  mutation joinGarage($invitationCode: String!, $member: ID!) {
    joinGarage(invitationCode: $invitationCode, member: $member) {
      _id
      garageName
      description
    }
  }
`;

// export const UPDATE_USER = gql``;
// export const REMOVE_USER = gql``;
// export const REMOVE_TOOL = gql``;
// export const DELETE_GARAGE = gql``;
// export const LEAVE_GARAGE = gql``;
// export const ADD_CHECKOUT = gql``;
// export const DELETE_CHECKOUT = gql``;
