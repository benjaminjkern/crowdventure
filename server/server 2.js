/*
 * NOTE: If you want to run browser GraphQL playground,
 * use "apollo-server", otherwise use "apollo-server-lambda" because
 * that's what we're gonna be using for the final product anyways
 */

// const serverType = "apollo-server-lambda";
const serverType = "apollo-server";

module.exports = { serverType };

const { ApolloServer, gql, UserInputError } = require(serverType);
const SCHEMA = require("./schema.js");
const RESOLVERS = require("./resolvers.js");

let server;

switch (serverType) {
  case "apollo-server-lambda":
    server = new ApolloServer({
      typeDefs: SCHEMA.typeDefs,
      resolvers: RESOLVERS.resolvers,
      context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
      }),
    });

    exports.graphqlHandler = server.createHandler({
      cors: {
        origin: "*",
        credentials: true,
      },
    });
    break;
  case "apollo-server":
    server = new ApolloServer({
      typeDefs: SCHEMA.typeDefs,
      resolvers: RESOLVERS.resolvers,
    });

    server.listen().then(({ url }) => {
      console.log(`👌  Server ready at ${url} 👌`);
    });
    break;
}
