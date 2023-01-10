/*
 * NOTE: If you want to run browser GraphQL playground,
 * use "apollo-server", otherwise use "apollo-server-lambda" because
 * that's what we're gonna be using for the final product anyways
 */

const LOCAL = false;

const { ApolloServer } = require(LOCAL
    ? "apollo-server"
    : "apollo-server-lambda");
const SCHEMA = require("./schema.js");
const RESOLVERS = require("./resolvers/resolvers.js");

const server = new ApolloServer({
    typeDefs: SCHEMA.typeDefs,
    resolvers: RESOLVERS.resolvers,
    context: LOCAL
        ? undefined
        : ({ event, context }) => ({
              headers: event.headers,
              functionName: context.functionName,
              event,
              context,
          }),
    playground: {
        endpoint: "/dev/graphql",
    },
});

if (!LOCAL)
    exports.graphqlHandler = server.createHandler({
        cors: {
            origin: "*",
            credentials: true,
        },
    });
else server.listen("4000");
