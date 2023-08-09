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
    _id: String!
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
    participant1: String!
    participant2: String!
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
    requestorID: String!
    status: Boolean!
  }

  input userID {
    id: ID!
  }

  type conversationIDType {
    _id: String
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
    participant1: String!
    participant2: String!
  }

  type groupConversation {
    participants: [groupParticipant]!
    groupName: String!
    creatorID: String!
  }

  type createdGroupConversation {
    _id: ID
    participants: [groupParticipant]!
    groupName: String!
    creatorID: String!
  }

  type groupParticipant {
    participantID: String!
    isGroupAdmin: Boolean!
  }
  input groupParticipantInput {
    participantID: String!
    isGroupAdmin: Boolean!
  }

  input groupConversationInput {
    participants: [groupParticipantInput]!
    groupName: String!
    creatorID: String!
  }

  type Query {
    me(input: userID): Me!
    conversationMessages(input: conversationID): [singleMessage]
    getUserFriends(input: [userID]): [FriendUser]
    getConversation(input: conversationInput): conversationIDType
    getGroupConversations(input: userID): [createdGroupConversation]
  }
  type Mutation {
    createUser(input: newUserInput!): createUserResponse
    createMessage(input: messageInput!): singleMessage
    createConversation(input: conversationInput): conversation
    createFriendRequest(input: friendRequestInput!): friendRequest
    createGroupConversation(input: groupConversationInput!): groupConversation
  }

  type createUserResponse {
    createdUser: Me
  }
`;

export default typeDefs;
