const { ApolloServer, gql, UserInputError } = require(require("./server.js")
    .serverType);

const typeDefs = gql `
  type Account {
    ID: String!
    screenName: String!
    nodes: [Node!]

    totalNodeViews: Int!
    totalSuggestionScore: Int!
  }

  type Node {
    ID: String!
    owner: Account!
    content: String!
    views: Int!
    canon_choices: [Choice!]
    non_canon_choices: [Choice!]
  }

  type Choice {
    content: String!
    likes: Int!
    dislikes: Int!
    goesTo: Node!
    suggestedBy: Account!

    score: Int!
  }

  type Query {
    allAccounts: [Account!]
    allNodes: [Node!]
    searchAccounts(type: String!, query: String!): [Account!]
    searchNodes(type: String!, query: String!): [Node!]
  }

  type Mutation {
    addAccount(screenName: String!): Account
    deleteAccount(accountID: String!): Account
    addNode(accountID: String!, content: String!): Node
    deleteNode(nodeID: String!): Node
    suggestChoice(accountID: String!, content: String!, goesTo: String!): Choice
    makeCanon(nodeID: String!): Node
    makeNonCanon(nodeID: String!): Node
  }
`;

module.exports = { typeDefs };