const { databaseCalls } = require("./databaseCalls.js");
const NodeResolvers = require("./nodeResolvers.js");
const ChoiceResolvers = require("./choiceResolvers.js");

const AccountResolvers = {
    nodes: async (parent) =>
        await databaseCalls.getNodesOwnedByAccount(parent.screenName),
    suggestedChoices: async (parent) =>
        await databaseCalls.getChoicesSuggestedByAccount(parent.screenName),
    notifications: async (parent) =>
        await databaseCalls.getNotificationsForAccount(parent.screenName),
    totalNodeViews: async (parent) =>
        // TODO: Make views be stored in database
        await databaseCalls
            .getNodesOwnedByAccount(parent.screenName)
            .then((nodes) =>
                Promise.all(nodes.map((node) => NodeResolvers.views(node)))
            )
            .then((nodes) => nodes.reduce((x, y) => x + y, 0)),
    totalSuggestionScore: async (parent) =>
        // TODO: Make score be stored in database
        await databaseCalls
            .getChoicesSuggestedByAccount(parent.screenName)
            .then((choices) =>
                Promise.all(
                    choices.map((choice) => ChoiceResolvers.score(choice))
                )
            )
            .then((choices) => choices.reduce((x, y) => x + y, 0)),
    featuredNodes: async (parent) =>
        await databaseCalls.getFeaturedNodesOwnedByAccount(parent.screenName),
    dateCreated: async (parent) => {
        if (!parent.dateCreated) {
            const existingParent = await databaseCalls.getAccount(
                parent.screenName
            );
            existingParent.dateCreated = `Before ${new Date().toJSON()}`;
            parent.dateCreated = existingParent.dateCreated;
            await databaseCalls.addAccount(existingParent);
        }
        return parent.dateCreated;
    },
};

module.exports = AccountResolvers;
