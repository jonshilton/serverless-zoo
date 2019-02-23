import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    return error;
  },
  formatResponse: response => {
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  playground: {
    endpoint: process.env.GRAPHQL_ENDPOINT
      ? process.env.GRAPHQL_ENDPOINT
      : '/production/graphql'
  },
  tracing: true
});

exports.graphql = server.createHandler({
  cors: {
    origin: '*'
  }
});
