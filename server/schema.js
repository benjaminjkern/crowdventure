const { gql } = require("apollo-server-lambda");

const typeDefs = gql `
  type Account {
    screenName: String!
    bio: String
    profilePicURL: String

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

    pictureURL: String
    bgColor: Int!
    fgColor: Int!

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
    to: Node
    suggestedBy: Account!

    likes: Int!
    dislikes: Int!
    score: Int!
  }

  type Query {
    allAccounts: [Account!]
    allNodes: [Node!]
    allChoices: [Choice!]

    getAccount(screenName: String!): Account
    getNode(ID: String!): Node
    getChoice(ID: String!): Choice

    searchAccounts(type: String!, query: String!): [Account!]
    searchNodes(type: String!, query: String!): [Node!]
    searchChoices(type: String!, query: String!): [Choice!]
  }

  type Mutation {
    createAccount(screenName: String!, password: String!): Account
    deleteAccount(screenName: String!): Boolean
    editAccount(
      screenName: String!
      password: String
      bio: String
      profilePic: String
    ): Account
    loginAccount(screenName: String!, password: String): Account

    createNode(
      accountScreenName: String!
      title: String!
      content: String!
      pictureURL: String
      bgColor: Int
      fgColor: Int
    ): Node
    deleteNode(nodeID: String!): Boolean
    editNode(
      nodeID: String!
      title: String
      content: String
      pictureURL: String
      bgColor: Int
      fgColor: Int
    ): Node

    suggestChoice(
      accountScreenName: String!
      fromID: String!
      action: String!
      toID: String!
    ): Choice
    editSuggestion(choiceID: String!, action: String, toID: String): Choice
    removeSuggestion(choiceID: String!): Boolean

    makeCanon(choiceID: String!): Choice
    makeNonCanon(choiceID: String!): Choice

    likeSuggestion(accountScreenName: String!, choiceID: String!): Choice
    dislikeSuggestion(accountScreenName: String!, choiceID: String!): Choice
  }
`;

module.exports = { typeDefs };