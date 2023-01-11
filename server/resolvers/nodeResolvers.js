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
            const IP = context.headers["X-Forwarded-For"].split(",")[0];
            await databaseCalls.addView({
                ID: await uniqueID(databaseCalls.getView),
                node: parent.ID,
                IP,
            });
        }
        return parent.content;
    },
    views: async (parent) => {
        return (
            parent.storedViews +
            (await databaseCalls.getViewsForNode(parent.ID)).length
        );
        // if (typeof parent.views === "object") {
        //     const newParent = await databaseCalls.getNode(parent.ID);
        //     while (typeof newParent.views.previouslySaved === "object") {
        //         newParent.views.previouslySaved =
        //             newParent.views.previouslySaved.previouslySaved;
        //     }
        //     databaseCalls.addNode(newParent);
        //     parent.views = newParent.views;
        //     return (
        //         Object.keys(parent.views).filter(
        //             (key) => key !== "previouslySaved"
        //         ).length + (parent.views.previouslySaved || 0)
        //     );
        // } else {
        //     const newParent = await databaseCalls.getNode(parent.ID);
        //     newParent.views = { previouslySaved: parent.views };
        //     databaseCalls.addNode(newParent);
        //     parent.views = newParent.views;
        //     return newParent.views.previouslySaved;
        // }
    },
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
