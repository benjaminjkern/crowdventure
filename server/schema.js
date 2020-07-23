const { gql } = require("apollo-server-lambda");

const typeDefs = gql `
  type Account {
    screenName: String!
    bio: String
    profilePicURL: String

    nodes: [Node!]
    suggestedChoices: [Choice!]

    totalNodeViews: Int!
    totalSuggestionScore: Int!
    featuredNodes: [Node!]
  }

  type Node {
    ID: String!
    title: String!
    content: String!
    pictureURL: String
    bgColor: String
    fgColor: String
    featured: Boolean

    owner: Account!
    canonChoices: [Choice!]
    nonCanonChoices: [Choice!]

    views: Int!
    size: Int!
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

  type Feedback {
    ID: String!
    info: String!

    submittedBy: Account
    reporting: String
  }

  type Query {
    allAccounts: [Account!]
    allNodes: [Node!]
    allChoices: [Choice!]
    allFeedback: [Feedback!]

    featuredNodes: [Node!]

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
      profilePicURL: String
    ): Account
    loginAccount(screenName: String!, password: String): Account

    createNode(
      accountScreenName: String!
      title: String!
      content: String!
      pictureURL: String
      bgColor: String
      fgColor: String
      featured: Boolean
    ): Node
    deleteNode(nodeID: String!): Boolean
    editNode(
      nodeID: String!
      title: String
      content: String
      pictureURL: String
      bgColor: String
      fgColor: String
      featured: Boolean
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

    createFeedback(
      accountScreenName: String
      reportingObjectType: String
      reportingObjectID: String
      info: String!
    ): Feedback
    removeFeedback(feedbackID: String!): Boolean
  }
`;

module.exports = { typeDefs };