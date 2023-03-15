import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER = gql`
    query User($id: ID!) {
        user(_id: $id) {
        _id
        name
        myTools {
            _id
            name
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
      myTools{
          _id
          name
      }
      borrowedTools {
          _id
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


export const QUERY_GARAGE = gql`
  query Garage {
    garages {
      _id
      garageName
      description
    }
  }
`;

// export const QUERY_TOOL = gql``;
// export const QUERY_GARAGE = gql``;
