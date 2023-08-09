import { withFilter } from 'graphql-subscriptions';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers = {
  Me: {
    async friends(parent, input, context) {
      const friendIDs = parent.friends;
    },
  },
  Query: {
    async me(_, { input }, context) {
      const user = context.dataSources.UserAPI.findUserById(input.id);
      return user;
    },
    async conversationMessages(_, { input }, context) {
      console.log('🚀 ~ input:', input);
      const messagesArray = await context.dataSources.ChatAPI.getMessages(input.conversationID);
      return messagesArray;
    },
    async getUserFriends(_, { input }, context) {
      const friendArray = [];
      input.map((element) => {
        const friend = context.dataSources.UserAPI.findUserById(element.id);
        friendArray.push(friend);
      });
      return friendArray;
    },
    async getConversation(_, { input }, context) {
      const conversation = await context.dataSources.ChatAPI.getConversation(input);
      console.log('🚀 ~ conversation:', conversation);
      if (!conversation) {
        console.log('Inside the if');
        const createdConversation = await context.dataSources.ChatAPI.createConversation(input);
        return { _id: createdConversation._id };
      }
      return { _id: conversation._id };
    },
    async getGroupConversations(_, { input }, context) {
      console.log('🚀 ~ input:', input);
      const groupConversations = await context.dataSources.ChatAPI.getGroupConversations(input.id);
      console.log('🚀 ~ groupConversations:', groupConversations);
      return groupConversations;
    },
  },
  Mutation: {
    async createUser(_, { input }, context) {
      const newUser = await context.dataSources.UserAPI.createUser(input);
      const response = { createdUser: newUser.user };
      return response;
    },
    async createMessage(_, { input }, context) {
      const newMessage = await context.dataSources.ChatAPI.createMessage(input);
      return newMessage;
    },
    async createFriendRequest(_, { input }, context) {
      const newFriendRequest = await context.dataSources.UserAPI.createFriendRequest(input);
      console.log('🚀 ~ newFriendRequest:', newFriendRequest);
      return newFriendRequest;
    },
    async createGroupConversation(_, { input }, context) {
      console.log('🚀 ~ input in resolver:', input);
      const newGroupConversation = await context.dataSources.ChatAPI.createGroupConversation(input);
      console.log('🚀 ~ newGroupConversation:', newGroupConversation);
      return newGroupConversation;
    },
  },
  // Subscription: {
  //   hello: {
  //     // Example using an async generator
  //     subscribe: async function* () {
  //       for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
  //         yield { hello: word };
  //       }
  //     },
  //   },
  //   postCreated: {
  //     // More on pubsub below
  //     subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
  //   },
  //   commentAdded: {
  //     subscribe: withFilter(
  //       () => pubsub.asyncIterator('COMMENT_ADDED'),
  //       (payload, variables) => {
  //         // Only push an update if the comment is on
  //         // the correct repository for this operation
  //         return payload.commentAdded.repository_name === variables.repoFullName;
  //       }
  //     ),
  //   },
  // },
};

export default resolvers;
