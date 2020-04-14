const { ApolloServer, gql, UserInputError } = require(require("./server.js")
    .serverType);

const typeDefs = gql `
  type Account {
    ID: String!
    screenName: String!

    nodes: [Node!]
    suggestedChoices: [Choice!]
    liked: [Node!]
    disliked: [Node!]

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

    likedBy: [Account!]
    dislikedBy: [Account!]

    from: Node!
    to: Node!
    suggestedBy: Account!

    likes: Int!
    dislikes: Int!
    score: Int!
  }

  type Query {
    allAccounts: [Account!]
    allNodes: [Node!]
    allChoices: [Choice!]

    getAccount(ID: String!): Account
    getNode(ID: String!): Node
    getChoice(ID: String!): Choice

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
    editSuggestion(choiceID: String!, action: String, toID: String): Choice
    removeSuggestion(choiceID: String!): Boolean

    makeCanon(choiceID: String!): Choice
    makeNonCanon(choiceID: String!): Choice

    likeSuggestion(accountID: String!, choiceID: String!): Choice
    dislikeSuggestion(accountID: String!, choiceID: String!): Choice
  }
`;

module.exports = { typeDefs };