const { databaseCalls } = require("./databaseCalls.js");
const NodeResolvers = require("./nodeResolvers.js");
const ChoiceResolvers = require("./choiceResolvers.js");

const AccountResolvers = {
    nodes: async (parent) => {
        return await databaseCalls.getNodesOwnedByAccount(parent.screenName);
    },
    suggestedChoices: async (parent) =>
        await Promise.all(
            parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
        ),
    totalNodeViews: async (parent) =>
        await Promise.all(
            (
                await databaseCalls.getNodesOwnedByAccount(parent.screenName)
            ).map((node) => NodeResolvers.views(node))
        ).then((nodes) => nodes.reduce((x, y) => x + y, 0)),
    totalSuggestionScore: async (parent) =>
        parent.suggestedChoices
            ? await Promise.all(
                  parent.suggestedChoices.map((id) =>
                      databaseCalls.getChoice(id)
                  )
              ).then((choices) =>
                  choices
                      .map((choice) => ChoiceResolvers.score(choice))
                      .reduce((x, y) => x + y, 0)
              )
            : 0,
    featuredNodes: async (parent) => {
        const allNodes = await AccountResolvers.nodes(parent);
        return await Promise.all(
            allNodes
                .filter((node) => node.featured)
                .map(async (node) => ({
                    ...node,
                    size: await NodeResolvers.size(node),
                }))
        );
    },
    dateCreated: async (parent) => {
        const newParent = await databaseCalls.getAccount(parent.ID);
        if (!newParent.dateCreated) {
            parent.dateCreated = "Before September 16, 2020";
            newParent.dateCreated = "Before September 16, 2020";
        }
        databaseCalls.addAccount(newParent);
        return parent.dateCreated;
    },
};

module.exports = AccountResolvers;
