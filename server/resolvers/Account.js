import databaseCalls from "../databaseCalls.js";

export const notifications = async (parent) =>
    await databaseCalls.getNotificationsForAccount(parent.screenName);

export const totalNodeViews = async (parent) => {
    // TODO: Recalculate any time views changes
    // (async () => {
    //     const account = await databaseCalls.getAccount(parent.screenName);
    //     const ownedNodes = await databaseCalls.getNodesOwnedByAccount(
    //         account.screenName
    //     );
    //     const totalNodeViews = account.totalNodeViews;
    //     account.totalNodeViews = 0;
    //     for (const node of ownedNodes) {
    //         account.totalNodeViews += await NodeResolvers.views(node);
    //     }
    //     if (totalNodeViews !== account.totalNodeViews)
    //         await databaseCalls.addAccount(account);
    // })();

    return parent.totalNodeViews;
};
export const totalSuggestionScore = async (parent) => {
    // TODO: Recalculate any time score changes
    // (async () => {
    //     const account = await databaseCalls.getAccount(parent.screenName);
    //     const suggestedChoices =
    //         await databaseCalls.getChoicesSuggestedByAccount(
    //             account.screenName
    //         );
    //     const totalSuggestionScore = account.totalSuggestionScore;
    //     account.totalSuggestionScore = 0;
    //     for (const choice of suggestedChoices) {
    //         account.totalSuggestionScore += await ChoiceResolvers.score(choice);
    //     }
    //     if (totalSuggestionScore !== account.totalSuggestionScore)
    //         await databaseCalls.addAccount(account);
    // })();

    return parent.totalSuggestionScore;
};
