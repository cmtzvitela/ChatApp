import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
  }

  type Query {
    me: User!
  }

  input newUserInput {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
  }

  type Mutation {
    createUser(input: newUserInput!): User!
  }
`;

export default typeDefs;
