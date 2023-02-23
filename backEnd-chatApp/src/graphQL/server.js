import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';
import Users from './dataSource.js';
import User from '../models/user.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    users: new Users(User),
  }),
  context: { User },
  playground: {
    endpoint: 'http://localhost:3001/graphql',
  },
});

export default server;

//server.listen(4000).then(() => console.log('GraphQL on port 4000'));
