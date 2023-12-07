import databaseCalls from "../databaseCalls.js";
import { getIP, uniqueID } from "../utils.js";

export const content = async (parent, args, context) => {
    const IP = getIP(context);
    if (IP) {
        // update views
        const existingView = await databaseCalls.getViewByNodeAndIP(parent.ID);
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
};
export const owner = async (parent) =>
    await databaseCalls.getAccount(parent.owner);

export const allChoices = async (parent) => [
    ...(await databaseCalls.getCanonChoicesForNode(parent.ID)),
    ...(await databaseCalls.getNonCanonChoicesForNode(parent.ID)),
];

export const views = async (parent) => {
    // TODO: Do this on view instead of spawning process to calculate
    // (async () => {
    //     const node = await databaseCalls.getNode(parent.ID);
    //     const views = node.views;
    //     node.views =
    //         node.storedViews +
    //         (await databaseCalls.getViewsForNode(node.ID)).length;
    //     if (views !== node.views) await databaseCalls.addNode(node);
    // })();

    return parent.views;
};

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
