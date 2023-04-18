import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
    friendRequests: [friendRequest]
  }
  type loggedUser {
    username: String!
    email: String!
    friends: [ID]!
    friendRequests: [friendRequest]
  }

  input newUserInput {
    username: String!
    email: String!
    password: String!
    tokens: [String]!
    friends: [ID]!
    friendRequests: [friendRequestInput]!
  }

  input friendRequestInput {
    requestorID: String!
    status: Boolean!
  }

  type friendRequest {
    requestorID: String!
    status: Boolean!
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
