const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    phone: String
    address: String
    myTools: [Tool]
    borrowedTools: [Checkout]
    myGarages: [Garage]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Tool {
    _id: ID
    name: String
    description: String
    image: String
    owner: User
  }

  type Garage {
    _id: ID
    admin: User
    garageName: String
    description: String
    members: [User]
    invitationCode: String
    messages:[Message]
  }
  
  scalar Date

  type Message {
    _id: ID
    author: User
    createdAt: Date
    body: String
    }

        
  type Query {
    users: [User]
    user(_id:ID!): User
    currentUser: User
    tools: [Tool]
    garages: [Garage]

  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, phone: String!, address: String): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id:ID!, name: String, phone: String, address: String): User
    removeUser(_id:ID!): User

    addTool( name: String!, description: String, image: String): User
    removeTool(_id:ID!):User

    createGarage(admin: ID!, garageName: String!, description: String): Garage
    deleteGarage(admin:ID!,invitationCode: String!): Garage
    joinGarage(invitationCode: String!, member:ID!): Garage
    leaveGarage(invitationCode: String!, member:ID!): User

    createCheckout(outDate: Date!, dueDate: Date!, toolId: ID!): User
    deleteCheckout(_id:ID!): User
  }
`;

module.exports = typeDefs;