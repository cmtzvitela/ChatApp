import gql from 'graphql-tag';
const typeDefs = gql `
  type User {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
  }
  type loggedUser {
    username: String!
    email: String!
    friends: [ID]!
  }

  input newUserInput {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
  }

  input userID {
    id: ID!
  }

  type Query {
    me(input: userID): loggedUser!
  }
  type Mutation {
    createUser(input: newUserInput!): User
  }
`;
export default typeDefs;
