export default `#graphql

    type Query {
        featuredNodes(allowHidden: Boolean, limit: Int): [Node!]!
        searchNodes(query: String!, allowHidden: Boolean, limit: Int): [Node!]!
        randomNode(allowHidden: Boolean): Node!

        getNode(ID: String!): nodeID

        getNotifications: [Notification!]!
    }

    type Mutation {

        createNode(
            title: String!
            content: String!
            pictureURL: String
            featured: Boolean
        ): Node!
        deleteNode(nodeID: String!): Boolean!
        editNode(
            nodeID: String!
            title: String
            content: String
            pictureURL: String
            pictureUnsafe: Boolean
            featured: Boolean
            hidden: Boolean
        ): Node!


        createFeedback(
            reportingObjectType: String
            reportingObjectID: String
            info: String!
        ): Feedback!
        removeFeedback(feedbackID: String!): Boolean!
        removeAllFeedback(
            reportingObjectType: String
            reportingObjectID: String
        ): Boolean!

        seeNotification(
            notificationID: String!
            setSeen: Boolean
        ): Boolean!
        removeNotification(notificationID: String!): Boolean!

        clearNotifications(
            onlyClearSeen: Boolean
        ): Boolean!
    }
`;
