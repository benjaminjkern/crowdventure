const AccountResolvers = require("./accountResolvers.js");
const NodeResolvers = require("./nodeResolvers.js");
const ChoiceResolvers = require("./choiceResolvers.js");
const FeedbackResolvers = require("./feedbackResolvers.js");
const QueryResolvers = require("./queryResolvers.js");
const MutationResolvers = require("./mutationResolvers.js");
require("dotenv").config();

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

const resolvers = { Account: AccountResolvers, Node: NodeResolvers, Choice: ChoiceResolvers, Feedback: FeedbackResolvers, Query: QueryResolvers, Mutation: MutationResolvers }

module.exports = { resolvers };