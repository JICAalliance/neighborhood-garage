const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    phone: String
    address: String
    myTools: [Tool]
    borrowedTools: [Tool]
    myGarages: [Garage]
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
    tools: [Tool]
    garages: [Garage]

  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, phone: String!, address: String): User
    updateUser(_id:ID!, name: String, phone: String, address: String): User
    removeUser(_id:ID!): User


    addTool( name: String!, description: String, image: String, ownerId:ID!): User
    removeTool(_id:ID!):User
    tempRemTool(_id:ID!):Tool

    createGarage(admin: ID!, garageName: String!, description: String): Garage
    deleteGarage(admin:ID!,invitationCode: String!): Garage
    joinGarage(invitationCode: String!, member:ID!): Garage
    leaveGarage(invitationCode: String!, member:ID!): User
  }
`;

module.exports = typeDefs;