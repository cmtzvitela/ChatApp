import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';
import UserAPI from './dataSource.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    return {
      dataSources: {
        UserAPI: new UserAPI(),
      },
    };
  },
});

console.log(`🚀  Server ready at ${url}`);
//server.listen(4000).then(() => console.log('GraphQL on port 4000'));

export default server;
