export default `#graphql
    scalar GraphQLLong

    type Account {
        screenName: String!
        dateCreated: String!
        bio: String
        profilePicURL: String
        hidden: Boolean!
        isAdmin: Boolean!

        unseenNotifications: Int # null = no permission

        totalNodeViews: Int!
        totalSuggestionScore: Int!
    }

    type Notification {
        ID: String!
        time: GraphQLLong!
        content: String!
        link: String
        seen: Boolean!
    }

    type Node {
        ID: String!
        title: String!
        content: String!
        dateCreated: String!
        lastUpdated: GraphQLLong!
        featured: Boolean!
        hidden: Boolean!
        pictureURL: String
        pictureUnsafe: Boolean!

        owner: Account!

        views: Int!
    }

    type Choice {
        ID: String!
        action: String!
        dateCreated: String!
        lastUpdated: GraphQLLong!
        hidden: Boolean!
        isCanon: Boolean!

        reactionStatus: Boolean!

        to: Node
        suggestedBy: Account!

        score: Int!
    }

    type Feedback {
        ID: String!
        info: String!
        dateCreated: String!

        submittedBy: Account
        reporting: String
    }

    type Query {
        featuredNodes(allowHidden: Boolean, limit: Int): [Node!]!
        searchNodes(query: String!, allowHidden: Boolean, limit: Int): [Node!]!
        randomNode(allowHidden: Boolean): Node!

        getAccount(screenName: String!): Account
        getNode(ID: String!): Node

        getChoices(nodeID: String!): [Choice!]!
        getNotifications: [Notification!]!
    }

    type Mutation {
        loginAccount(screenName: String!, password: String): Account!

        createAccount(screenName: String!, password: String!): Account!
        deleteAccount(screenName: String!): Boolean!
        editAccount(
            screenName: String!
            newPassword: String
            bio: String
            profilePicURL: String
            hidden: Boolean
            isAdmin: Boolean
        ): Account!

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

        suggestChoice(
            fromID: String!
            action: String!
            toID: String!
        ): Choice!
        editSuggestion(
            choiceID: String!
            action: String
            toID: String
            hidden: Boolean
            isCanon: Boolean
        ): Choice!
        removeSuggestion(choiceID: String!): Boolean!

        reactToChoice(choiceID: String!, like: Boolean!): Int!

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
