const { databaseCalls } = require("./databaseCalls.js");
const { sort } = require("./resolverUtils.js");

module.exports = {
    nodes: async(parent, args, context, info) => {
        return await Promise.all(
                parent.nodes.map((id) => databaseCalls.getNode(id))
            )
            .then((nodes) =>
                nodes.map((node) => ({...node, views: resolvers.Node.views(node) }))
            )
            .then((nodes) =>
                sort(nodes, (a, b) => {
                    if (a.featured) return b.featured ? 0 : -1;
                    if (b.featured) return 1;
                    return a.views === b.views ? 0 : a.views > b.views ? -1 : 1;
                })
            );
    },
    suggestedChoices: async(parent, args, context, info) => {
        return await Promise.all(
            parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
        );
    },
    totalNodeViews: async(parent, args, context, info) => {
        return await Promise.all(
            parent.nodes.map((id) => databaseCalls.getNode(id))
        ).then((nodes) =>
            nodes
            .map((node) => resolvers.Node.views(node))
            .reduce((x, y) => x + y, 0)
        );
    },
    totalSuggestionScore: async(parent, args, context, info) => {
        return parent.suggestedChoices ?
            await Promise.all(
                parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
            ).then((choices) =>
                choices
                .map((choice) => resolvers.Choice.score(choice))
                .reduce((x, y) => x + y, 0)
            ) :
            0;
    },
    featuredNodes: async(parent, args, context, info) => {
        let allNodes = await resolvers.Account.nodes(parent);
        return await Promise.all(
            allNodes
            .filter((node) => node.featured)
            .map(async(node) => ({
                ...node,
                size: await resolvers.Node.size(node),
            }))
        );
    },
    dateCreated: (parent, args, context, info) => {
        if (!parent.dateCreated) parent.dateCreated = "Before September 16, 2020";
        databaseCalls.addAccount(parent);
        return parent.dateCreated;
    },
};