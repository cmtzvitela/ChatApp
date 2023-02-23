import User from '../models/user.js';
const resolvers = {
  Query: {
    me() {
      return {
        email: 'carlos@intek.com',
        friends: [],
      };
    },
  },
  Mutation: {
    async newUser(_, { input }, User) {
      newUser = await User.create(input)
      return newUser
    },
  },
};

export default resolvers;
