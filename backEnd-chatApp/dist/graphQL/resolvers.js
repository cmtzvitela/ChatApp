const resolvers = {
    Query: {
        async me(_, input, context) {
            const user = context.dataSources.UserAPI.findUserById(input);
            return user;
        },
    },
    Mutation: {
        async createUser(_, { input }, context) {
            const newUser = context.dataSources.UserAPI.createUser(input);
            console.log(input);
            console.log(newUser);
            return newUser;
            // const newUser = await User.create(input);
            // return newUser;
        },
    },
};
export default resolvers;
