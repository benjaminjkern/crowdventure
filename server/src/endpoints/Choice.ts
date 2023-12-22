import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { ChoiceSchema } from "+/schemas";
import { flagContent, uniqueID } from "+/utils";
import { getChoice, getChoiceBySlug, getNode } from "+/commonQueries";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "+/auth";
const prisma = new PrismaClient();

export const choiceEndpoints = {
    getChoicesForNode: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ fromNodeId: z.number() }),
        output: z.object({ choices: ChoiceSchema.array() }),
        handler: async ({ input: { fromNodeId } }) => {
            return {
                choices: await prisma.choice.findMany({
                    where: { fromNodeId },
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
            content: z.string().min(1),
        }),
        output: ChoiceSchema,
        handler: async ({
            input: { fromNodeId, toNodeId, action, content },
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
                    hidden: flagContent(content) || undefined, // Let users know if its flagged
                    score: 0,
                    isCanon: account.id === fromNode.ownerId,
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

            if (
                !loggedInAccount?.isAdmin &&
                loggedInAccount?.id !== fromNode.ownerId &&
                (choice.isCanon ||
                    loggedInAccount?.id !== choice.suggestedByAccountId)
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
            });
        },
    }),
    deleteChoice: defaultEndpointsFactory.addMiddleware(authMiddleware).build({
        methods: ["delete"],
        input: z.object({ id: z.number() }),
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
    // reactToChoice: defaultEndpointsFactory.build({
    //     methods: ["post"],
    //     input: z.object({
    //         choiceID: z.string(),
    //         like: z.boolean(),
    //     }),
    //     // @ts-ignore
    //     output: z.number().int(),
    //     handler: async ({ input: { choiceID, like } }) => {
    //         const choice = await getChoice(choiceID);
    //         if (!choice) throw new Error("That node doesnt exist!");

    //         if (
    //             !context.loggedInAccount?.isAdmin &&
    //             !context.loggedInAccount?.screenName !== fromNode.owner &&
    //             (choice.isCanon ||
    //                 context.loggedInAccount?.screenName !== choice.suggestedBy)
    //         )
    //             throw new Error("No permission!");

    //         console.log(
    //             `${context.loggedInAccount.screenName} is ${like ? 'liking' : 'disliking'} choice ${choice.ID} (${choice.action})`
    //         );

    //         const reaction = await databaseCalls.getReactionByAccountAndChoice(
    //             args.accountScreenName,
    //             args.choiceID
    //         );

    //         if (!reaction) {
    //             await changeScore(choice, 1);

    //             return await databaseCalls.addReaction({
    //                 ID: await uniqueID(databaseCalls.getReaction),
    //                 account: args.accountScreenName,
    //                 choice: args.choiceID,
    //                 like: true,
    //             });
    //         } else if (reaction.like === true) {
    //             await changeScore(choice, -1);
    //             // replace with reaction.like === args.like
    //             // If it already matches what you are trying to do, turn it off
    //             return await databaseCalls.removeReaction(reaction.ID);
    //         } else {
    //             await changeScore(choice, 2);
    //             reaction.like = true;
    //             return await databaseCalls.addReaction(reaction);
    //         }
    //     },
    // }),
};
