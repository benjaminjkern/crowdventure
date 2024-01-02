import { flagContent, scramble, uniqueID } from "../utils.js";
import { defaultEndpointsFactory } from "express-zod-api";
import { z } from "zod";
import { NodeSchema } from "+/schemas.js";
import authMiddleware from "+/auth.js";
import { getNode, getNodeBySlug } from "+/commonQueries.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const nodeEndpoints = {
    featuredNodes: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({
            allowHidden: z
                .string()
                .transform((x) => x === "true")
                .optional(),
            count: z
                .string()
                .transform((x) => parseInt(x))
                .optional(),
            ownedByAccount: z
                .string()
                .transform((x) => parseInt(x))
                .optional(),
        }),
        output: z.object({
            nodes: NodeSchema.array(),
        }),
        handler: async ({
            input: { allowHidden, count = 10, ownedByAccount },
        }) => {
            // TODO: Do this better (Dont load the whole thing into js
            const allFeatured = await prisma.node.findMany({
                where: {
                    ownerId: ownedByAccount,
                    featured: true,
                    hidden: allowHidden ? undefined : false,
                    pictureUnsafe: allowHidden ? undefined : false,
                    owner: {
                        hidden: allowHidden ? undefined : false,
                        profilePicUnsafe: allowHidden ? undefined : false,
                    },
                },
                include: {
                    owner: true,
                },
            });

            return { nodes: scramble(allFeatured).slice(0, count) };
        },
    }),
    getNode: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ slug: z.string() }),
        output: z.object({
            node: NodeSchema.nullable(),
        }),
        handler: async ({ input: { slug } }) => {
            return { node: await getNodeBySlug(slug) };
        },
    }),
    createNode: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
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
            options: { loggedInAccount },
        }) => {
            if (!loggedInAccount)
                throw new Error("Must be logged in to do that!");

            const account = loggedInAccount;

            console.log(
                `Creating new node with title ${title} and owner ${account.screenName}`
            );

            const newNode = await prisma.node.create({
                data: {
                    slug: await uniqueID(getNodeBySlug),
                    ownerId: account.id,
                    title,
                    content,
                    pictureURL,
                    featured,
                    hidden:
                        // TODO: Let user know if its flagged and they didnt mean it to be hidden
                        flagContent(title) || flagContent(content),
                    storedViews: 0,
                    views: 0,
                },
                include: {
                    owner: true,
                },
            });

            return newNode;
        },
    }),
    editNode: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["patch"],
        input: z.object({
            id: z.number(),
            title: z.string().min(1).optional(),
            content: z.string().min(1).optional(),
            pictureURL: z.string().min(1).nullable().optional(),
            pictureUnsafe: z.boolean().optional(),
            hidden: z.boolean().optional(),
            featured: z.boolean().optional(),
        }),
        output: NodeSchema,
        handler: async ({
            input: {
                id,
                title,
                content,
                pictureURL,
                pictureUnsafe,
                hidden,
                featured,
            },
            options: { loggedInAccount },
        }) => {
            const node = await getNode(id);
            if (!node) throw new Error("That node doesnt exist!");

            // TODO: Do this in one prisma or sql call

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.id !== node.ownerId
            )
                throw new Error("No permission!");

            console.log(`Editing node ${node.id} (${node.title})`);

            if (title) {
                node.title = title;
                if (flagContent(title)) node.hidden = true;
                // TODO: Let users know it was flagged
            }
            if (content) {
                node.content = content;
                if (flagContent(content)) node.hidden = true;
                // TODO: Let users know it was flagged
            }
            if (pictureURL !== undefined) node.pictureURL = pictureURL;
            if (loggedInAccount?.isAdmin && pictureUnsafe !== undefined)
                node.pictureUnsafe = pictureUnsafe;
            if (loggedInAccount?.isAdmin && hidden !== undefined) {
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

            return await prisma.node.update({
                where: { id },
                data: node,
                include: {
                    owner: true,
                },
            });
        },
    }),
    deleteNode: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["delete"],
        input: z.object({ id: z.string().transform((x) => parseInt(x)) }),
        output: z.object({ deleted: z.boolean() }),
        handler: async ({ input: { id }, options: { loggedInAccount } }) => {
            const node = await getNode(id);
            if (!node) throw new Error("That node doesnt exist!");

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.id !== node.ownerId
            )
                throw new Error("No permission!");

            console.log(`Deleting node ${node.id} (${node.title})`);
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
                deleted: !!(await prisma.node.delete({ where: { id } })),
            };
        },
    }),
    searchNodes: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ query: z.string() }),
        output: z.object({ nodes: NodeSchema.array() }),
        handler: async ({ input: { query } }) => {
            return {
                nodes: await prisma.node.findMany({
                    where: { title: { contains: query, mode: "insensitive" } },
                    take: 10, // TODO: Paginate this
                    include: { owner: true },
                }),
            };
        },
    }),
};

// export const content = async (parent, args, context) => {
//     const IP = getIP(context);
//     if (IP) {
//         // update views
//         const existingView = await databaseCalls.getViewByNodeAndIP(parent.ID);
//         if (!existingView) {
//             await databaseCalls.addView({
//                 ID: await uniqueID(databaseCalls.getView),
//                 node: parent.ID,
//                 IP,
//             });
//             // Fetch the actual node from database so we dont write any weird intermittent data
//             const node = await databaseCalls.getNode(parent.ID);
//             node.views = (node.views || 0) + 1;
//             await databaseCalls.addNode(node);
//             const account = await databaseCalls.getAccount(node.owner);
//             account.totalNodeViews = (account.totalNodeViews || 0) + 1;
//             await databaseCalls.addAccount(account);
//         }
//     }
//     return parent.content;
// };

// export const views = async (parent) => {
//     // TODO: Do this on view instead of spawning process to calculate
//     // (async () => {
//     //     const node = await databaseCalls.getNode(parent.ID);
//     //     const views = node.views;
//     //     node.views =
//     //         node.storedViews +
//     //         (await databaseCalls.getViewsForNode(node.ID)).length;
//     //     if (views !== node.views) await databaseCalls.addNode(node);
//     // })();

//     return parent.views;
// };

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
