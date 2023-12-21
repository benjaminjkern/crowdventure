import {
    TABLES,
    addItem,
    deleteItem,
    deleteMany,
    getItem,
    getMany,
} from "+/databaseCalls.js";
import { type StoredNode } from "@/types/storedTypes.js";
import { flagContent, getIP, scramble, uniqueID } from "../utils.js";
import { defaultEndpointsFactory } from "express-zod-api";
import { z } from "zod";
import { getNode } from "+/modelHelpers.js";
import { NodeSchema } from "+/schemas.js";

// defaultEndpointsFactory.build({
//     methods: undefined,
//     input: undefined,
//     output: undefined,
//     handler: async ({ input: {} }) => {},
// });

export const nodeEndpoints = {
    featuredNodes: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({
            allowHidden: z.boolean().optional(),
            count: z.number().int().min(1).optional(),
        }),
        output: z.object({ nodes: NodeSchema.array() }),
        handler: async ({ input: { allowHidden, count = 10 } }) => {
            // TODO: Do this better
            const { results: allFeatured } = await getMany<StoredNode>(
                TABLES.NODE_TABLE,
                {
                    filters: {
                        featured: true,
                        hidden: allowHidden ? undefined : true,
                        pictureUnsafe: allowHidden ? undefined : true,
                    },
                    filterExpressions: {
                        hidden: (v, a) => `${v} <> ${a}`,
                        pictureUnsafe: (v, a) => `${v} <> ${a}`,
                    },
                }
            );
            return { nodes: scramble(allFeatured).slice(0, count) };
        },
    }),
    getNode: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ nodeID: z.string() }),
        output: z.object({ node: NodeSchema.optional() }),
        handler: async ({ input: { nodeID } }) => {
            return { node: await getNode(nodeID) };
        },
    }),
    createNode: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({
            title: z.string().min(1),
            content: z.string().min(1),
            pictureURL: z.string().min(1).optional(),
            featured: z.boolean().optional(),
        }),
        output: NodeSchema,
        handler: async ({
            input: { title, content, pictureURL, featured },
        }) => {
            if (!context.loggedInAccount)
                throw new Error("Must be logged in to do that!");

            const account = context.loggedInAccount;
            if (!title) throw new Error("Title cannot be empty!");
            if (!ontent) throw new Error("Content cannot be empty!");

            console.log(
                `Creating new node with title ${title} and owner ${account.screenName}`
            );

            const now = new Date();

            const newNode: StoredNode = {
                ID: await uniqueID(getNode),
                owner: account.screenName,
                searchTitle: title.toLowerCase(),
                title,
                content,
                pictureURL,
                pictureUnsafe: false,
                featured: featured || false,
                hidden:
                    // TODO: Let user know if its flagged and they didnt mean it to be hidden
                    flagContent(title) || flagContent(content),
                dateCreated: now.toJSON(),
                lastUpdated: now.getTime(),
                views: 0,
            };

            return await addItem(TABLES.NODE_TABLE, newNode);
        },
    }),
    editNode: defaultEndpointsFactory.build({
        methods: ["patch"],
        input: z.object({
            nodeID: z.string(),
            title: z.string().min(1).optional(),
            content: z.string().min(1).optional(),
            pictureURL: z.string().min(1).optional(),
            pictureUnsafe: z.boolean().optional(),
            hidden: z.boolean().optional(),
            featured: z.boolean().optional(),
        }),
        output: NodeSchema,
        handler: async ({
            input: { nodeID, title, content, pictureUnsafe, hidden, featured },
        }) => {
            const node = await getNode(nodeID);
            if (!node) throw new Error("That node doesnt exist!");

            if (
                !context.loggedInAccount?.isAdmin &&
                !context.loggedInAccount?.screenName !== node.owner
            )
                throw new Error("No permission!");

            console.log(`Editing node ${node.ID} (${node.title})`);

            if (title) {
                node.title = title;
                node.searchTitle = title.toLowerCase();
                if (flagContent(title)) node.hidden = true;
                // TODO: Let users know it was flagged
            }
            if (content) {
                node.content = content;
                if (flagContent(content)) node.hidden = true;
                // TODO: Let users know it was flagged
            }
            if (pictureURL !== undefined) node.pictureURL = pictureURL;
            if (context.loggedInAccount?.isAdmin && pictureUnsafe !== undefined)
                node.pictureUnsafe = pictureUnsafe;
            if (context.loggedInAccount?.isAdmin && hidden !== undefined) {
                node.hidden = hidden;
            }
            if (featured !== undefined) node.featured = featured;

            // MutationResolvers.createNotification(
            //     undefined,
            //     {
            //         accountScreenName: node.owner,
            //         content: `Your page titled "${node.title}" was edited by an administrator.`,
            //         link: `/node/${node.ID}`,
            //     },
            //     context
            // );

            return await addItem(TABLES.NODE_TABLE, node);
        },
    }),
    deleteNode: defaultEndpointsFactory.build({
        methods: ["delete"],
        input: z.object({ nodeID: z.string() }),
        output: z.object({ deleted: z.boolean() }),
        handler: async ({ input: { nodeID } }) => {
            const node = await getNode(nodeID);
            if (!node) throw new Error("That node doesnt exist!");

            if (
                !context.loggedInAccount?.isAdmin &&
                !context.loggedInAccount?.screenName !== node.owner
            )
                throw new Error("No permission!");

            console.log(`Deleting node ${node.ID} (${node.title})`);
            // MutationResolvers.createNotification(
            //     undefined,
            //     {
            //         accountScreenName: node.owner,
            //         content: `Your page titled "${node.title}" was deleted by an administrator.`,
            //         link: `/node/${node.ID}`,
            //     },
            //     context
            // );

            return {
                deleted: await deleteItem(TABLES.NODE_TABLE, { ID: node.ID }),
            };
        },
    }),
};

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

// export const recentlyUpdatedNodes = async (parent, args) =>
//     await databaseCalls
//         .sortedNodes(
//             args.pageSize ? Math.min(args.pageSize, 100) : 10,
//             args.pageNum || 0,
//             args.allowHidden
//         )
//         .then((nodes) =>
//             Promise.all(nodes.map((node) => databaseCalls.getNode(node.ID)))
//         );

// export const randomNode = async (parent, args) =>
//     await databaseCalls.randomNode(
//         args.chooseFromLast || 1000,
//         args.allowHidden
//     );

// export const searchNodes = async (parent, { query, limit = 10 }) => {
//     return await databaseCalls.searchNodes(query, limit);
// };
