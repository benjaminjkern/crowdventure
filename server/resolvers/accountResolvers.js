const { databaseCalls } = require("./databaseCalls.js");
// const NodeResolvers = require("./nodeResolvers.js");
// const ChoiceResolvers = require("./choiceResolvers.js");

const AccountResolvers = {
    nodes: async (parent) =>
        await databaseCalls.getNodesOwnedByAccount(parent.screenName),
    suggestedChoices: async (parent) =>
        await databaseCalls.getChoicesSuggestedByAccount(parent.screenName),
    notifications: async (parent) =>
        await databaseCalls.getNotificationsForAccount(parent.screenName),
    // totalNodeViews: async (parent) => {
    //     if (parent.totalNodeViews) return parent.totalNodeViews;

    //     const account = await databaseCalls.getAccount(parent.screenName);
    //     const ownedNodes = await databaseCalls.getNodesOwnedByAccount(
    //         account.screenName
    //     );
    //     account.totalNodeViews = 0;
    //     for (const node of ownedNodes) {
    //         account.totalNodeViews += await NodeResolvers.views(node);
    //     }
    //     await databaseCalls.addAccount(account);

    //     parent.totalNodeViews = account.totalNodeViews;
    //     return parent.totalNodeViews;
    // },
    // totalSuggestionScore: async (parent) => {
    //     if (parent.totalSuggestionScore) return parent.totalSuggestionScore;

    //     const account = await databaseCalls.getAccount(parent.screenName);
    //     const suggestedChoices =
    //         await databaseCalls.getChoicesSuggestedByAccount(
    //             account.screenName
    //         );
    //     account.totalSuggestionScore = 0;
    //     for (const choice of suggestedChoices) {
    //         account.totalSuggestionScore += await ChoiceResolvers.score(choice);
    //     }
    //     await databaseCalls.addAccount(account);

    //     parent.totalSuggestionScore = account.totalSuggestionScore;
    //     return parent.totalSuggestionScore;
    // },
    featuredNodes: async (parent) =>
        await databaseCalls.getFeaturedNodesOwnedByAccount(parent.screenName),
};

module.exports = AccountResolvers;
