import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [String]!
  }

  type Query {
    me: User!
  }

  input newUserInput {
    name: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [String]!
  }

  type Mutation {
    newUser(input: newUserInput!): User!
  }
`;

export default typeDefs;
