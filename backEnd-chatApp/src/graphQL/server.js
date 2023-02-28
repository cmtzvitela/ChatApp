import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';
import UserAPI from './dataSource.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      UserAPI: new UserAPI(),
    };
  },
  playground: {
    endpoint: 'http://localhost:3001/graphql',
  },
});
console.log(server);
export default server;

//server.listen(4000).then(() => console.log('GraphQL on port 4000'));
