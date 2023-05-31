import gql from 'graphql-tag';

const typeDefs = gql`
  # type User {
  #   username: String!
  #   email: String!
  #   password: String!
  #   tokens: [String]!
  #   friends: [ID]!
  #   friendRequests: [friendRequest]
  # }
  interface User {
    username: String!
    email: String!
  }
  type Me implements User {
    username: String!
    email: String!
    avatar: String!
    friends: [FriendUser]!
    friendRequests: [friendRequest]!
  }
  type FriendUser implements User {
    username: String!
    email: String!
    avatar: String!
  }
  type GenericUser implements User {
    username: String!
    email: String!
  }

  type singleMessage {
    body: String!
    createdAt: String!
    senderID: String!
  }

  type conversation {
    participants: [participantObject]
    name: String!
    isGroup: Boolean!
  }

  type participantObject {
    participantID: String!
    isAdmin: Boolean!
  }

  input participantObjectInput {
    participantID: String!
    isAdmin: Boolean!
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
    friendEmail: String!
    requestorID: String!
  }

  type friendRequest {
    friendEmail: String!
    requestorID: String!
  }

  input userID {
    id: ID!
  }

  input conversationID {
    conversationID: String!
  }

  input messageInput {
    body: String!
    conversationID: String!
    senderID: String!
  }

  input conversationInput {
    participants: [participantObjectInput]!
    name: String!
    isGroup: Boolean!
  }

  type Query {
    me(input: userID): Me!
    conversationMessages(input: conversationID): [singleMessage]
    getUserFriends(input: [userID]): [FriendUser]
  }
  type Mutation {
    createUser(input: newUserInput!): createUserResponse
    createMessage(input: messageInput!): singleMessage
    createConversation(input: conversationInput): conversation
    createFriendRequest(input: friendRequestInput!): friendRequest
  }

  type createUserResponse {
    createdUser: Me
  }
`;

export default typeDefs;