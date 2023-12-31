import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { ChoiceSchema } from "+/schemas";
import { flagContent, uniqueID } from "+/utils";
import { getChoice, getChoiceBySlug, getNode } from "+/commonQueries";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "+/auth";
const prisma = new PrismaClient();

export const choiceEndpoints = {
    getChoicesForNode: defaultEndpointsFactory
        .addMiddleware(authMiddleware)
        .build({
            methods: ["get"],
            input: z.object({
                fromNodeId: z.string().transform((id) => parseInt(id)),
            }),
            output: z.object({ choices: ChoiceSchema.array() }),
            handler: async ({
                input: { fromNodeId },
                options: { loggedInAccount },
            }) => {
                return {
                    choices: await prisma.choice.findMany({
                        where: { fromNodeId },
                        include: {
                            suggestedBy: true,
                            fromNode: {
                                include: { owner: true },
                            },
                            toNode: {
                                include: { owner: true },
                            },
                            reactions: {
                                where: {
                                    accountId: loggedInAccount?.id,
                                },
                                select: { like: true },
                            },
                        },
                    }),
                };
            },
        }),
    createChoice: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["post"],
        input: z.object({
            fromNodeId: z.number(),
            toNodeId: z.number(),
            action: z.string().min(1),
            hidden: z.boolean().optional(),
        }),
        output: ChoiceSchema,
        handler: async ({
            input: { fromNodeId, toNodeId, action, hidden },
            options: { loggedInAccount },
        }) => {
            if (!loggedInAccount)
                throw new Error("Must be logged in to do that!");

            const account = loggedInAccount;
            const fromNode = await getNode(fromNodeId);
            if (!fromNode) throw new Error("From node doesnt exist!");

            const toNode = await getNode(toNodeId);
            if (!toNode) throw new Error("To node doesnt exist!");

            console.log(
                `${account.screenName} is suggesting a new choice (${action}) to node ${fromNode.id} (${fromNode.title}), which goes to node ${toNode.id} (${toNode.title})`
            );

            const choice = await prisma.choice.create({
                data: {
                    slug: await uniqueID(
                        getChoiceBySlug,
                        `${fromNode.slug}-`,
                        false
                    ),
                    fromNodeId: fromNode.id,
                    action,
                    toNodeId: toNode.id,
                    suggestedByAccountId: account.id,
                    hidden: flagContent(action) || hidden, // Let users know if its flagged
                    score: 0,
                    isCanon: account.id === fromNode.ownerId,
                },
                include: {
                    suggestedBy: true,
                    fromNode: {
                        include: { owner: true },
                    },
                    toNode: {
                        include: { owner: true },
                    },
                },
            });

            if (account.id !== fromNode.ownerId) {
                // MutationResolvers.createNotification(
                //     undefined,
                //     {
                //         accountScreenName: node.owner,
                //         content: `${account.screenName} suggested a new choice for your page "${node.title}"!`,
                //         link: `/node/${node.ID}`,
                //     },
                //     context
                // );
            }

            // MutationResolvers.createNotification(undefined, { accountScreenName: toNode.owner, content: `${account.screenName} suggested a new choice that leads to your page "${toNode.title}"!`, link: `/node/${node.ID}` }, context);

            return choice;
        },
    }),
    editChoice: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["patch"],
        input: z.object({
            id: z.number(),
            hidden: z.boolean().optional(),
            toNodeId: z.number().optional(),
            isCanon: z.boolean().optional(),
            action: z.string().min(1).optional(),
        }),
        output: ChoiceSchema,
        handler: async ({
            input: { id, toNodeId, hidden, isCanon, action },
            options: { loggedInAccount },
        }) => {
            const choice = await getChoice(id);
            if (!choice) throw new Error("That choice doesnt exist!");

            const fromNode = await getNode(choice.fromNodeId);

            if (!fromNode) {
                throw new Error("That choice's from node disappeared!");
                // TODO: Fix this when this happens
            }

            if (!loggedInAccount) throw new Error("No permission!");

            if (
                !(
                    loggedInAccount.isAdmin ||
                    loggedInAccount.id === fromNode.ownerId ||
                    (!choice.isCanon &&
                        loggedInAccount.id === choice.suggestedByAccountId)
                )
            )
                throw new Error("No permission!");

            console.log(`Editing suggestion ${choice.id} (${choice.action})`);

            // TODO: Have to change at least one thing

            // const daddy = await databaseCalls.getNode(choice.from);

            if (loggedInAccount?.isAdmin && hidden !== undefined)
                // Should only be able to be done by admins
                choice.hidden = hidden;
            if (toNodeId && choice.toNodeId !== toNodeId) {
                const toNode = await getNode(toNodeId);
                if (toNode) choice.toNodeId = toNodeId; // TODO: Should let users know that it didnt work
            }
            if (
                (loggedInAccount?.isAdmin ||
                    loggedInAccount?.id === fromNode.ownerId) &&
                isCanon !== undefined
            )
                choice.isCanon = isCanon;
            if (action) {
                choice.action = action;
                if (flagContent(action)) choice.hidden = true;
                // TODO: Notify users of flagged content
            }

            // MutationResolvers.createNotification(
            //     undefined,
            //     {
            //         accountScreenName: choice.suggestedBy,
            //         content: `Your suggested choice "${choice.action}" stemming from page titled "${daddy.title}" has been edited!`,
            //         link: `/node/${daddy.ID}`,
            //     },
            //     context
            // );

            return await prisma.choice.update({
                where: { id: choice.id },
                data: choice,
                include: {
                    suggestedBy: true,
                    fromNode: {
                        include: { owner: true },
                    },
                    toNode: {
                        include: { owner: true },
                    },
                },
            });
        },
    }),
    deleteChoice: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["delete"],
        input: z.object({ id: z.string().transform((x) => parseInt(x)) }),
        output: z.object({ deleted: z.boolean() }),
        handler: async ({ input: { id }, options: { loggedInAccount } }) => {
            const choice = await getChoice(id);
            if (!choice) throw new Error("That choice doesnt exist!");

            const fromNode = await getNode(choice.fromNodeId);
            if (!fromNode) {
                throw new Error("That choice's from node disappeared!");
                // TODO: Fix this when this happens
            }

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.id !== fromNode.ownerId &&
                (choice.isCanon ||
                    loggedInAccount?.id !== choice.suggestedByAccountId)
            )
                throw new Error("No permission!");

            console.log(`Deleting suggestion ${choice.id} (${choice.action})`);
            return {
                deleted: !!(await prisma.choice.delete({ where: { id } })),
            };
        },
    }),
    reactToChoice: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["post"],
        input: z.object({
            id: z.number(),
            like: z.boolean().nullable(),
        }),
        output: z.object({ score: z.number().int() }),
        handler: async ({
            input: { id, like },
            options: { loggedInAccount },
        }) => {
            const choice = await getChoice(id);
            if (!choice) throw new Error("That choice doesnt exist!");

            if (!loggedInAccount) throw new Error("No permission!");

            console.log(
                `${loggedInAccount.screenName} is ${
                    like ? "liking" : "disliking"
                } choice ${id} (${choice.action})`
            );

            const reaction = await prisma.reaction.findUnique({
                where: {
                    reactionIdentifier: {
                        accountId: loggedInAccount.id,
                        choiceId: id,
                    },
                },
            });

            if (!reaction) {
                if (like === null)
                    throw new Error("No reaction existed! Ignoring.");
                await prisma.reaction.create({
                    data: { accountId: loggedInAccount.id, choiceId: id, like },
                }); // TODO: Do this in a transaction just in case it gets fucked up
                const newScore = choice.score + (like ? 1 : -1);
                await prisma.choice.update({
                    where: { id },
                    data: { score: newScore },
                });
                return { score: newScore };
            }
            if (like === null) {
                await prisma.reaction.delete({
                    where: {
                        reactionIdentifier: {
                            accountId: loggedInAccount.id,
                            choiceId: id,
                        },
                    },
                });
                const newScore = choice.score + (reaction.like ? -1 : 1);
                await prisma.choice.update({
                    where: { id },
                    data: { score: newScore },
                });
                return { score: newScore };
            }

            if (reaction.like === like)
                throw new Error("Not changing anything with the reaction.");
            await prisma.reaction.update({
                where: {
                    reactionIdentifier: {
                        accountId: loggedInAccount.id,
                        choiceId: id,
                    },
                },
                data: { like },
            });
            const newScore = choice.score + (like ? 2 : -2);
            await prisma.choice.update({
                where: { id },
                data: { score: newScore },
            });
            return { score: newScore };
        },
    }),
};
