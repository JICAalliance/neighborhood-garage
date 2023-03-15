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
    {
        garage {
            admin
            garageName
            description
            members
            invitationCode
            messages
          }
    }
`

// export const QUERY_TOOL = gql``;
// export const QUERY_GARAGE = gql``;
