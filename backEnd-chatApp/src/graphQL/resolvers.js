import UserAPI from './dataSource.js';

const resolvers = {
  Query: {
    me() {
      return {
        email,
        name,
        friends,
      };
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      const newUser = UserAPI.createUser({ input });
      console.log(newUser);
      return newUser;
      // const newUser = await User.create(input);
      // return newUser;
    },
  },
};

export default resolvers;
