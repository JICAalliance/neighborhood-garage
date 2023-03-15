import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   {
//     user {
//       name
//       email
//       phone
//       address
//     }
//   }
// `;

export const QUERY_GARAGE = gql`
  query Garage {
    garages {
      _id
      garageName
      description
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
// export const QUERY_GARAGE = gql``;
