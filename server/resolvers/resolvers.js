const AccountResolvers = require('./accountResolvers.js');
const NodeResolvers = require('./nodeResolvers.js');
const ChoiceResolvers = require('./choiceResolvers.js');
const FeedbackResolvers = require('./feedbackResolvers.js');
const NotificationResolvers = require('./notificationResolvers.js');
const QueryResolvers = require('./queryResolvers.js');
const MutationResolvers = require('./mutationResolvers.js');
const { databaseCalls } = require('./databaseCalls.js');

const GraphQLLong = require('graphql-type-long');

require('dotenv').config();

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

const resolvers = {
    GraphQLLong,
    Account: AccountResolvers,
    Node: NodeResolvers,
    Choice: ChoiceResolvers,
    Feedback: FeedbackResolvers,
    Notification: NotificationResolvers,
    Query: QueryResolvers,
    Mutation: MutationResolvers.MutationResolvers,
};

module.exports = { resolvers };

(async() => {

    const account = await databaseCalls.getAccount("ben");
    console.log(await resolvers.Account.featuredNodes(account));

})();