const { ApolloServer, gql, UserInputError } = require(require("./server.js")
    .serverType);

const typeDefs = gql `
  type Account {
    ID: String!
    screenName: String!
    nodes: [Node!]
  }

  type Node {
    ID: String!
    owner: Account!
    content: String!
    canon_choices: [Node!]
    non_canon_choices: [Node!]
  }

  type Query {
    allAccounts: [Account]!
    allNodes: [Node]!
  }
`;

module.exports = { typeDefs };