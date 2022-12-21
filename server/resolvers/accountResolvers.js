const { databaseCalls } = require("./databaseCalls.js");
const NodeResolvers = require("./nodeResolvers.js");
const ChoiceResolvers = require("./choiceResolvers.js");

const AccountResolvers = {
    nodes: async (parent) =>
        await Promise.all(parent.nodes.map((id) => databaseCalls.getNode(id))),
    // .then((nodes) => nodes.map((node) => ({...node, views: NodeResolvers.views(node) })))
    // .then((nodes) => sort(nodes, (a, b) => {
    //     if (a.featured) return b.featured ? 0 : -1;
    //     if (b.featured) return 1;
    //     return a.views === b.views ? 0 : a.views > b.views ? -1 : 1;
    // })),
    suggestedChoices: async (parent) =>
        await Promise.all(
            parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
        ),
    totalNodeViews: async (parent) =>
        await Promise.all(
            parent.nodes.map((id) =>
                databaseCalls
                    .getNode(id)
                    .then((node) => NodeResolvers.views(node))
            )
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
