export default `#graphql
    scalar GraphQLLong

    type Account {
        screenName: String!
        dateCreated: String!
        bio: String
        profilePicURL: String
        hidden: Boolean
        isAdmin: Boolean

        # nodes: [Node!]
        # suggestedChoices: [Choice!]
        notifications: [Notification!] # TODO: Make this into a query

        totalNodeViews: Int!
        totalSuggestionScore: Int!
        # featuredNodes: [Node!]
    }

    type Notification {
        time: GraphQLLong!
        content: String!
        link: String
        seen: Boolean! # TODO: Ensure always returned

        account: Account! # TODO: Make sure these are stored
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
        # canonChoices: [Choice!]
        # nonCanonChoices: [Choice!]
        # parents: [Node!]

        allChoices: [Choice!]

        views: Int!
        # size: Int!
    }

    type Choice {
        ID: String!
        action: String!
        dateCreated: String!
        hidden: Boolean! # TODO: Make sure this is always available
        isCanon: Boolean! # TODO: Migrate this

        # likedBy: [Account!]
        # dislikedBy: [Account!] # TODO: Put this as a query

        from: Node!
        to: Node
        suggestedBy: Account!

        likes: Int!
        dislikes: Int!
        score: Int!
    }

    # type Feedback {
    #     ID: String!
    #     info: String!
    #     dateCreated: String!

    #     submittedBy: String
    #     reporting: String
    # }

    type Query {
        featuredNodes(allowHidden: Boolean, count: Int): [Node!]
        recentlyUpdatedNodes(
            allowHidden: Boolean
            pageSize: Int
            pageNum: Int
        ): [Node!]
        randomNode(allowHidden: Boolean, chooseFromLast: Int): Node!

        searchNodes(query: String!, limit: Int): [Node!]

        getAccount(screenName: String!): Account
        getNode(ID: String!): Node
    }

    type Mutation {

        loginAccount(screenName: String!, password: String): Account

        createAccount(screenName: String!, password: String!): Account
        deleteAccount(screenName: String!): Boolean
        editAccount(
            screenName: String!
            newPassword: String
            bio: String
            profilePicURL: String
            # newScreenName: String # TODO Add this back in
            hidden: Boolean
            isAdmin: Boolean
        ): Account

        createNode(
            # accountScreenName: String # TODO: allow admins to create nodes on behalf of other people
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
            # accountScreenName: String # TODO: allow admins to transfer ownership of nodes
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
            # accountScreenName: String # TODO: allow admins to create choices on behalf of other people
            fromID: String!
            action: String!
            toID: String!
        ): Choice
        editSuggestion(
            # accountScreenName: String # TODO: allow admins to transfer ownership
            choiceID: String!
            action: String
            toID: String
            hidden: Boolean
            isCanon: Boolean
        ): Choice
        removeSuggestion(choiceID: String!): Boolean

        # REMOVE
        # makeCanon(choiceID: String!): Choice
        # makeNonCanon(choiceID: String!): Choice

        # likeSuggestion(
        #     accountScreenName: String!
        #     choiceID: String!
        #     like: Boolean!
        # ): Choice
        # likeSuggestion(accountScreenName: String!, choiceID: String!): Choice
        # dislikeSuggestion(accountScreenName: String!, choiceID: String!): Choice

        # createFeedback(
        #     accountScreenName: String
        #     reportingObjectType: String
        #     reportingObjectID: String
        #     info: String!
        # ): Feedback
        # removeFeedback(feedbackID: String!): Boolean
        # removeAllFeedback(
        #     accountScreenName: String
        #     reportingObjectType: String
        #     reportingObjectID: String
        #     info: String
        # ): Boolean

        # createNotification(
        #     accountScreenName: String!
        #     content: String!
        #     link: String
        # ): Notification!
        # seeNotification(notificationID: String!, force: Boolean): Boolean
        # removeNotification(notificationID: String!): Boolean
        # seeNotification(
        #     accountScreenName: String!
        #     index: Int!
        #     force: Boolean
        # ): Boolean
        # removeNotification(accountScreenName: String!, index: Int!): Boolean

        # clearNotifications(
        #     accountScreenName: String!
        #     onlyClearSeen: Boolean
        # ): Boolean
    }
`;
