const { ApolloServer, gql, UserInputError } = require(require("./server.js")
    .serverType);

const typeDefs = gql `
  type Account {
    ID: String!
    screenName: String!

    nodes: [Node!]
    suggestedChoices: [Choice!]

    totalNodeViews: Int!
    totalSuggestionScore: Int!
  }

  type Node {
    ID: String!
    title: String!
    content: String!
    views: Int!

    owner: Account!
    canonChoices: [Choice!]
    nonCanonChoices: [Choice!]
  }

  type Choice {
    ID: String!
    action: String!
    likes: Int!
    dislikes: Int!

    from: Node!
    to: Node!
    suggestedBy: Account!

    score: Int!
  }

  type Query {
    allAccounts: [Account!]
    allNodes: [Node!]
    allChoices: [Choice!]

    getAccount(ID: String!): Account
    getNode(ID: String!): Node
    getChoice(ID: String!): Choice

    # unimplemented
    searchAccounts(type: String!, query: String!): [Account!]
    searchNodes(type: String!, query: String!): [Node!]
    searchChoices(type: String!, query: String!): [Choice!]
  }

  type Mutation {
    createAccount(screenName: String!): Account
    deleteAccount(accountID: String!): Boolean
    createNode(accountID: String!, title: String!, content: String!): Node
    deleteNode(nodeID: String!): Boolean
    editNode(nodeID: String!, title: String, content: String): Node
    deleteEmptyNodes: Boolean
    suggestChoice(
      accountID: String!
      fromID: String!
      action: String!
      toID: String!
    ): Choice
    removeSuggestion(choiceID: String!): Boolean
    makeCanon(nodeID: String!, choiceID: String!): Choice
    makeNonCanon(nodeID: String!, choiceID: String!): Choice

    # unimplemented
    likeSuggestion(choiceID: String!): Choice
    dislikeSuggestion(choiceID: String!): Choice
  }
`;

module.exports = { typeDefs };