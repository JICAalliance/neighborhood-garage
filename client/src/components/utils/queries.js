import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER = gql`
query User($id: ID!) {
  user(_id: $id) {
    _id
    name
    phone
    address
    myTools {
      _id
      name
    }
  }
}
`;
export const QUERY_USERS = gql`
query Users {
  users {
    _id
    name
    email
    phone
    address
    myTools {
      _id
      name
      
    }
    myGarages {
      garageName
    }

  }
}
`;


export const QUERY_ME = gql`
query CurrentUser {
  currentUser {
    _id
    name
    email
    phone
    address
    myTools {
      _id
      name
    }
    borrowedTools {
      _id
    }
    myGarages {
      _id
      admin{
        _id
        name
      }
      garageName
      description
      members {
        _id
        name
      }
      invitationCode
    }
  }
}
`;
//for now query all tools
//TODO make this query on the context.user tool
export const QUERY_TOOLS = gql`
  query Tools {
    tools {
      _id
      name
      description
      image
      checkout {
        _id
        dueDate
        outDate
      }
    }
  }
`;

export const QUERY_MY_TOOLS = gql`
  query myTools {
    myTools {
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
//query the garage by ID not by invitation code
export const QUERY_GARAGE = gql`
query Garage($id: ID!) {
  garage(_id: $id) {
    _id
    admin{
      _id
      name
    }
    invitationCode
    garageName
    description
    members {
      _id
      name
      phone
      address
      myTools {
        _id
        checkout {
          _id
          dueDate
        }
      }
    }
  }
}
`;

export const QUERY_TOOL = gql`
  query Tool {
    tools {
      _id
      name
      description
      image
    }
  }
`;

export const QUERY_USER_GARAGES = gql`
  query userGarages($id: ID!) {
    user(_id: $id) {
      myGarages {
        _id
        garageName
        description
      }
    }
  }
`;
// export const QUERY_GARAGE = gql``;
