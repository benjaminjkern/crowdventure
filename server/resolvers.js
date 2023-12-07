import GraphQLLong from "graphql-type-long";
import * as Account from "./resolvers/Account.js";
import * as Node from "./resolvers/Node.js";
import * as Choice from "./resolvers/Choice.js";
// import * as Feedback from "./resolvers/Feedback.js";
import * as Notification from "./resolvers/Notification.js";
import * as Query from "./resolvers/Query.js";
import * as Mutation from "./resolvers/Mutation.js";

export default {
    GraphQLLong,
    Account,
    Node,
    Choice,
    // Feedback,
    Notification,
    Query,
    Mutation,
};
