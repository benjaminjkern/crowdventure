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

export const createNode = async (parent, args, context) => {
    if (!context.loggedInAccount)
        throw new Error("Must be logged in to do that!");

    const account = context.loggedInAccount;
    if (!args.title) throw new Error("Title cannot be empty!");
    if (!args.content) throw new Error("Content cannot be empty!");

    console.log(
        `Creating new node with title ${args.title} and owner ${account.screenName}`
    );

    const now = new Date();

    const newNode = {
        ID: await uniqueID(databaseCalls.getNode),
        owner: args.accountScreenName,
        title: args.title,
        content: args.content,
        pictureURL: args.pictureURL,
        pictureUnsafe: false,
        featured: args.featured || false,
        hidden:
            // TODO: Let user know if its flagged and they didnt mean it to be hidden
            flagContent(args.title) || flagContent(args.content),
        dateCreated: now.toJSON(),
        lastUpdated: now.getTime(),
        views: 0,
    };

    return await databaseCalls.addNode(newNode);
};
export const deleteNode = async (parent, args, context) => {
    const node = await databaseCalls.getNode(args.nodeID);
    if (!node) throw new Error("That node doesnt exist!");

    if (
        !context.loggedInAccount?.isAdmin &&
        !context.loggedInAccount?.screenName !== node.owner
    )
        throw new Error("No permission!");

    console.log(`Deleting node ${node.ID} (${node.title})`);

    // TODO: Combine these into a single call
    for (const { ID } of await databaseCalls.getCanonChoicesForNode(node.ID)) {
        await databaseCalls.removeChoice(ID);
    }
    for (const { ID } of await databaseCalls.getNonCanonChoicesForNode(
        node.ID
    )) {
        await databaseCalls.removeChoice(ID);
    }

    // MutationResolvers.createNotification(
    //     undefined,
    //     {
    //         accountScreenName: node.owner,
    //         content: `Your page titled "${node.title}" was deleted by an administrator.`,
    //         link: `/node/${node.ID}`,
    //     },
    //     context
    // );

    return await databaseCalls.removeNode(node.ID);
};
export const editNode = async (parent, args, context) => {
    const node = await databaseCalls.getNode(args.nodeID);
    if (!node) throw new Error("That node doesnt exist!");

    if (
        !context.loggedInAccount?.isAdmin &&
        !context.loggedInAccount?.screenName !== node.owner
    )
        throw new Error("No permission!");

    console.log(`Editing node ${node.ID} (${node.title})`);

    if (args.title) {
        node.title = args.title;
        if (flagContent(args.title)) node.hidden = true;
        // TODO: Let users know it was flagged
    }
    if (args.content) {
        node.content = args.content;
        if (flagContent(args.content)) node.hidden = true;
        // TODO: Let users know it was flagged
    }
    if (args.pictureURL !== undefined) node.pictureURL = args.pictureURL;
    if (args.pictureUnsafe !== undefined)
        node.pictureUnsafe = args.pictureUnsafe;
    if (context.loggedInAccount?.isAdmin && args.hidden !== undefined) {
        node.hidden = args.hidden;
    }
    if (args.featured !== undefined) node.featured = args.featured;

    // MutationResolvers.createNotification(
    //     undefined,
    //     {
    //         accountScreenName: node.owner,
    //         content: `Your page titled "${node.title}" was edited by an administrator.`,
    //         link: `/node/${node.ID}`,
    //     },
    //     context
    // );

    return await databaseCalls.addNode(node);
};
export const featuredNodes = async (parent, args) =>
    scramble(await databaseCalls.filterFeatured(args.allowHidden)).slice(
        0,
        args.count || 10
    );

export const recentlyUpdatedNodes = async (parent, args) =>
    await databaseCalls
        .sortedNodes(
            args.pageSize ? Math.min(args.pageSize, 100) : 10,
            args.pageNum || 0,
            args.allowHidden
        )
        .then((nodes) =>
            Promise.all(nodes.map((node) => databaseCalls.getNode(node.ID)))
        );

export const randomNode = async (parent, args) =>
    await databaseCalls.randomNode(
        args.chooseFromLast || 1000,
        args.allowHidden
    );

export const getNode = async (parent, { ID }) =>
    await databaseCalls.getNode(ID);

export const searchNodes = async (parent, { query, limit = 10 }) => {
    return await databaseCalls.searchNodes(query, limit);
};
