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

// export const UPDATE_USER = gql``;
// export const REMOVE_USER = gql``;
// export const REMOVE_TOOL = gql``;
// export const DELETE_GARAGE = gql``;
export const LEAVE_GARAGE = gql`
mutation LeaveGarage($invitationCode: String!) {
  leaveGarage(invitationCode: $invitationCode) {
    _id
    name
  }
}
`;

export const UPDATE_GARAGE=gql`
mutation UpdateGarage($invitationCode: String!, $adminIs: Boolean!, $garageName: String, $description: String) {
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
}`;

export const DELETE_CHECKOUT = gql`
mutation deleteCheckout($id: ID!) {
  deleteCheckout(_id: $id) {
    _id
  }
}`;
