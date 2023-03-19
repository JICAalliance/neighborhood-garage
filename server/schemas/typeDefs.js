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
    checkout: Checkout
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

  type Checkout {
    _id: ID
    outDate: Date
    dueDate: Date
    approved: Boolean
  }
        
  type Query {
    users: [User]
    user(_id:ID!): User
  
    currentUser: User
    toolOwner(_id:ID!): User
    tools: [Tool]
    myTools: User
    borrowedTools(idArray: [ID]): [Tool]
    tool(_id:ID!): Tool
    checkout(_id: ID!): Checkout

    garages: [Garage]
    garage(_id:ID!): Garage

    checkoutBorrower(_id:ID): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, phone: String!, address: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id:ID!, name: String!, phone: String!, email: String!, address: String ): User
    removeUser(_id:ID!): User

    addTool( name: String!, description: String, image: String): User
    removeTool(_id:ID!):User
    updateTool( _id: ID!, name: String!, description: String!): Tool

    createGarage(garageName: String!, description: String): Garage
    updateGarage(invitationCode:String!, adminIs:Boolean!, garageName:String!, description:String): Garage
    deleteGarage(adminIs:Boolean!, invitationCode: String!): Garage
    joinGarage(invitationCode: String!): Garage
    leaveGarage(invitationCode: String!): User

    addCheckout(outDate: Date!, dueDate: Date!, toolId: ID!): Tool
    approveCheckout(_id:ID!): Checkout
    deleteCheckout(_id:ID!): Tool
  }
`;

module.exports = typeDefs;