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
    totalNodeViews: async (parent) => {
        // Spawn process to recalculate
        (async () => {
            const account = await databaseCalls.getAccount(parent.screenName);
            const ownedNodes = await databaseCalls.getNodesOwnedByAccount(
                account.screenName
            );
            const totalNodeViews = account.totalNodeViews;
            account.totalNodeViews = 0;
            for (const node of ownedNodes) {
                account.totalNodeViews += await NodeResolvers.views(node);
            }
            if (totalNodeViews !== account.totalNodeViews)
                await databaseCalls.addAccount(account);
        })();

        return parent.totalNodeViews;
    },
    totalSuggestionScore: async (parent) => {
        (async () => {
            const account = await databaseCalls.getAccount(parent.screenName);
            const suggestedChoices =
                await databaseCalls.getChoicesSuggestedByAccount(
                    account.screenName
                );
            const totalSuggestionScore = account.totalSuggestionScore;
            account.totalSuggestionScore = 0;
            for (const choice of suggestedChoices) {
                account.totalSuggestionScore += await ChoiceResolvers.score(
                    choice
                );
            }
            if (totalSuggestionScore !== account.totalSuggestionScore)
                await databaseCalls.addAccount(account);
        })();

        return parent.totalSuggestionScore;
    },
    featuredNodes: async (parent) =>
        await databaseCalls.getFeaturedNodesOwnedByAccount(parent.screenName),
};

module.exports = AccountResolvers;
