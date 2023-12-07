import databaseCalls from "../databaseCalls.js";
import { scramble } from "../utils.js";

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

export const getAccount = async (parent, { screenName }) => {
    const account = await databaseCalls.getAccount(screenName);

    if (!account) return null;

    const { encryptedPassword, lastIP, ...smallAccount } = account; // eslint-disable-line no-unused-vars
    // return everything except last IP and encrypted password since graphql cant do anything with those anyways
    return smallAccount;
};

export const getNode = async (parent, { ID }) =>
    await databaseCalls.getNode(ID);
