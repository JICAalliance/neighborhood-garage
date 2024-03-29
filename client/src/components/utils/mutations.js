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
        _id
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

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $phone: String!
    $email: String!
    $address: String
  ) {
    updateUser(
      _id: $id
      name: $name
      phone: $phone
      email: $email
      address: $address
    ) {
      _id
      name
      email
      phone
      address
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(_id: $id) {
      _id
    }
  }
`;

export const ADD_TOOL = gql`
  mutation addTool($name: String!, $description: String, $image: String) {
    addTool(name: $name, description: $description, image: $image) {
      _id
      name
      myTools {
        _id
        name
        description
        image
        checkout {
          _id
          outDate
          dueDate
        }
      }
    }
  }
`;

export const REMOVE_TOOL = gql`
  mutation RemoveTool($id: ID!) {
    removeTool(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_TOOL = gql`
  mutation UpdateTool($id: ID!, $name: String!, $description: String!) {
    updateTool(_id: $id, name: $name, description: $description){
      _id
      name
      description
    }
  }
`

export const JOIN_GARAGE = gql`
  mutation joinGarage($invitationCode: String!) {
    joinGarage(invitationCode: $invitationCode) {
      _id
      garageName
      description
    }
  }
`;

//Create Garage
export const CREATE_GARAGE = gql`
  mutation CreateGarage($garageName: String!, $description: String) {
    createGarage(garageName: $garageName, description: $description) {
      _id
      garageName
    }
  }
`;

// export const REMOVE_TOOL = gql``;

export const LEAVE_GARAGE = gql`
  mutation LeaveGarage($invitationCode: String!) {
    leaveGarage(invitationCode: $invitationCode) {
      _id
      name
    }
  }
`;

export const UPDATE_GARAGE = gql`
  mutation UpdateGarage($invitationCode: String!, $adminIs: Boolean!, $garageName: String!, $description: String) {
    updateGarage(invitationCode: $invitationCode, adminIs: $adminIs, garageName: $garageName, description: $description) {
      _id
      admin {
        _id
        name
      }
      description
      garageName
    }
  }
`;

export const DELETE_GARAGE = gql`
  mutation DeleteGarage($adminIs: Boolean!, $invitationCode: String!) {
    deleteGarage(adminIs: $adminIs, invitationCode: $invitationCode) {
      garageName
      _id
    }
  }
`;

export const ADD_CHECKOUT = gql`
  mutation addCheckout($toolId: ID!, $outDate: Date!, $dueDate: Date!) {
    addCheckout(toolId: $toolId, outDate: $outDate, dueDate: $dueDate) {
      _id
      checkout {
        _id
        outDate
        dueDate
      }
    }
  }
`;

export const APPROVE_CHECKOUT = gql`
  mutation ApproveCheckout ($id: ID!){
    approveCheckout (_id: $id) {
      _id
      approved
    }
  }
`;

export const DELETE_CHECKOUT = gql`
  mutation deleteCheckout($id: ID!) {
    deleteCheckout(_id: $id) {
      _id
    }
  }
`;


export const ADD_MESSAGE = gql`
  mutation AddMessage($body: String!, $garageId: ID!) {
    addMessage(body: $body, garageId: $garageId) {
      _id
      author {
        _id
        name
      }
      body
      createdAt
    }
  }
`;

export const DELETE_MESSAGE = gql`
mutation DeleteMessage($id: ID!) {
  deleteMessage(_id: $id) {
    _id
    author {
      _id
      name
    }
    body
  }
}
`;