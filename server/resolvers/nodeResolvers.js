const { databaseCalls } = require("./databaseCalls.js");
const { uniqueID } = require("./resolverUtils.js");

// all nodes that can possible be reached from this node
// const allConnected = async (node, visited = {}) => {
//     const children = await NodeResolvers.canonChoices(node).then((choices) =>
//         Promise.all(choices.map((choice) => ChoiceResolvers.to(choice)))
//     );
//     let newVisited = { ...visited, [node.ID]: node.ID };

//     for (const childKey in children) {
//         const child = children[childKey];
//         if (!newVisited[child.ID] && !child.featured) {
//             newVisited = {
//                 ...newVisited,
//                 ...(await allConnected(child, newVisited)),
//             };
//         }
//     }
//     return newVisited;
// };

const NodeResolvers = {
    content: async (parent, args, context) => {
        if (context.headers) {
            // update views
            const IP = context.headers["X-Forwarded-For"].split(",")[0];
            const existingView = await databaseCalls.getViewByNodeAndIP(
                parent.ID
            );
            if (!existingView) {
                await databaseCalls.addView({
                    ID: await uniqueID(databaseCalls.getView),
                    node: parent.ID,
                    IP,
                });
                // Fetch the actual node from database so we dont write any weird intermittent data
                const node = await databaseCalls.getNode(parent.ID);
                node.views = (node.views || 0) + 1;
                await databaseCalls.addNode(node);
                const account = await databaseCalls.getAccount(node.owner);
                account.totalNodeViews = (account.totalNodeViews || 0) + 1;
                await databaseCalls.addAccount(account);
            }
        }
        return parent.content;
    },
    // views: async (parent) => {
    //     if (parent.views) return parent.views;

    //     const node = await databaseCalls.getNode(parent.ID);
    //     node.views =
    //         node.storedViews +
    //         (await databaseCalls.getViewsForNode(node.ID)).length;
    //     await databaseCalls.addNode(node);

    //     parent.views = node.views;
    //     return parent.views;
    // },
    owner: async (parent) => await databaseCalls.getAccount(parent.owner),
    canonChoices: async (parent) =>
        await databaseCalls.getCanonChoicesForNode(parent.ID),
    nonCanonChoices: async (parent) =>
        await databaseCalls.getNonCanonChoicesForNode(parent.ID),
    size: async () => {
        // should return the total number of nodes it is connected to
        return 0;
        // if (parent.size) return parent.size;
        // return Object.keys(await allConnected(parent)).length;
    },
    parents: async () => {
        return [];
        // const choices = await databaseCalls.filterParents(parent.ID);
        // return await Promise.all(
        //     choices.map((choice) => databaseCalls.getNode(choice.from))
        // );
    },
};

module.exports = NodeResolvers;
