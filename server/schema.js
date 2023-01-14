const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
    scalar GraphQLLong

    type Account {
        screenName: String!
        dateCreated: String!
        bio: String
        profilePicURL: String
        hidden: Boolean
        isAdmin: Boolean

        nodes: [Node!]
        suggestedChoices: [Choice!]
        notifications: [Notification!]

        totalNodeViews: Int!
        totalSuggestionScore: Int!
        featuredNodes: [Node!]
    }

    type Notification {
        time: GraphQLLong!
        content: String!
        link: String
        seen: Boolean
    }

    type Node {
        ID: String!
        title: String!
        content: String!
        dateCreated: String!
        lastUpdated: GraphQLLong
        pictureURL: String
        pictureUnsafe: Boolean
        bgColor: String
        fgColor: String
        featured: Boolean
        hidden: Boolean

        owner: Account!
        canonChoices: [Choice!]
        nonCanonChoices: [Choice!]
        allChoices: [Choice!]
        parents: [Node!]

        views: Int!
        size: Int!
    }

    type Choice {
        ID: String!
        action: String!
        dateCreated: String!
        hidden: Boolean

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
        dateCreated: String!

        submittedBy: String
        reporting: String
    }

    type Query {
        allAccounts: [Account!]
        allNodes: [Node!]
        allChoices: [Choice!]
        allFeedback: [Feedback!]

        featuredNodes(allowHidden: Boolean, count: Int): [Node!]
        recentlyUpdatedNodes(
            allowHidden: Boolean
            pageSize: Int
            pageNum: Int
        ): [Node!]
        randomNode(allowHidden: Boolean, chooseFromLast: Int): Node!

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
            newPassword: String
            bio: String
            profilePicURL: String
            newScreenName: String
            hidden: Boolean
            isAdmin: Boolean
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
            hidden: Boolean
            pictureUnsafe: Boolean
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
            hidden: Boolean
            pictureUnsafe: Boolean
        ): Node

        suggestChoice(
            accountScreenName: String!
            fromID: String!
            action: String!
            toID: String!
        ): Choice
        editSuggestion(
            choiceID: String!
            action: String
            toID: String
            hidden: Boolean # isCanon: Boolean
        ): Choice
        removeSuggestion(choiceID: String!): Boolean

        # REMOVE
        makeCanon(choiceID: String!): Choice
        makeNonCanon(choiceID: String!): Choice

        # likeSuggestion(
        #     accountScreenName: String!
        #     choiceID: String!
        #     like: Boolean!
        # ): Choice
        likeSuggestion(accountScreenName: String!, choiceID: String!): Choice
        dislikeSuggestion(accountScreenName: String!, choiceID: String!): Choice

        createFeedback(
            accountScreenName: String
            reportingObjectType: String
            reportingObjectID: String
            info: String!
        ): Feedback
        removeFeedback(feedbackID: String!): Boolean
        # removeAllFeedback(
        #     accountScreenName: String
        #     reportingObjectType: String
        #     reportingObjectID: String
        #     info: String
        # ): Boolean

        createNotification(
            accountScreenName: String!
            content: String!
            link: String
        ): Notification!
        # seeNotification(notificationID: String!, force: Boolean): Boolean
        # removeNotification(notificationID: String!): Boolean
        seeNotification(
            accountScreenName: String!
            index: Int!
            force: Boolean
        ): Boolean
        removeNotification(accountScreenName: String!, index: Int!): Boolean

        clearNotifications(
            accountScreenName: String!
            onlyClearSeen: Boolean
        ): Boolean
    }
`;

module.exports = { typeDefs };
