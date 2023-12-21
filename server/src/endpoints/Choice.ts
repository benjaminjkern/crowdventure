import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { TABLES, addItem, getFullTable, removeItem } from "+/databaseCalls";
import { ChoiceSchema } from "+/schemas";
import { flagContent, uniqueID } from "+/utils";
import { type Choice } from "@/types/models";
import { getChoice, getNode } from "+/modelHelpers";

export const choiceEndpoints = {
    // This one kind of isn't necessary but whatever
    getChoice: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ choiceID: z.string() }),
        // @ts-ignore
        output: ChoiceSchema.optional(),
        handler: async ({ input: { choiceID } }) => await getChoice(choiceID),
    }),
    getChoicesForNode: defaultEndpointsFactory.build({
        methods: ["get"],
        input: z.object({ nodeID: z.string() }),
        // @ts-ignore
        output: ChoiceSchema.array(),
        handler: async ({ input: { nodeID } }) => {
            return await getFullTable(TABLES.CHOICE_TABLE, {
                filters: { from: nodeID },
            });
        },
    }),
    createChoice: defaultEndpointsFactory.build({
        methods: ["post"],
        input: z.object({
            fromNodeID: z.string(),
            toNodeID: z.string(),
            action: z.string().min(1),
            content: z.string().min(1),
        }),
        output: ChoiceSchema,
        handler: async ({
            input: { fromNodeID, toNodeID, action, content },
        }) => {
            if (!context.loggedInAccount)
                throw new Error("Must be logged in to do that!");

            const account = context.loggedInAccount;
            const fromNode = await getNode(fromNodeID);
            if (!fromNode) throw new Error("From node doesnt exist!");

            const toNode = await getNode(toNodeID);
            if (!toNode) throw new Error("To node doesnt exist!");

            console.log(
                `${account.screenName} is suggesting a new choice (${action}) to node ${fromNode.ID} (${fromNode.title}), which goes to node ${toNode.ID} (${toNode.title})`
            );

            const now = new Date();

            const newChoice: Choice = {
                ID: await uniqueID(getChoice, `${fromNode.ID}-`, false),
                from: fromNode.ID,
                action,
                dateCreated: now.toJSON(),
                lastUpdated: now.getTime(),
                to: toNode.ID,
                suggestedBy: account.screenName,
                hidden: flagContent(content) || undefined, // Let users know if its flagged
                score: 0,
                isCanon: false,
            };

            if (account.screenName === fromNode.owner) {
                newChoice.isCanon = true;
                // updateTime(node);
            } else {
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

            return await addItem(TABLES.CHOICE_TABLE, newChoice);
        },
    }),
    editChoice: defaultEndpointsFactory.build({
        methods: ["patch"],
        input: z.object({
            choiceID: z.string(),
            hidden: z.boolean().optional(),
            toNodeID: z.string().optional(),
            isCanon: z.boolean().optional(),
            action: z.string().min(1).optional(),
        }),
        output: ChoiceSchema,
        handler: async ({
            input: { choiceID, toNodeID, hidden, isCanon, action },
        }) => {
            const choice = await getChoice(choiceID);
            if (!choice) throw new Error("That choice doesnt exist!");

            const fromNode = await getNode(choice.from);

            if (!fromNode) {
                throw new Error("That choice's from node disappeared!");
                // TODO: Fix this when this happens
            }

            if (
                !context.loggedInAccount?.isAdmin &&
                !context.loggedInAccount?.screenName !== fromNode.owner &&
                (choice.isCanon ||
                    context.loggedInAccount?.screenName !== choice.suggestedBy)
            )
                throw new Error("No permission!");

            console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

            // TODO: Have to change at least one thing

            // const daddy = await databaseCalls.getNode(choice.from);

            if (context.loggedInAccount?.isAdmin && hidden !== undefined)
                // Should only be able to be done by admins
                choice.hidden = hidden;
            if (toNodeID && choice.to !== toNodeID) {
                const toNode = await getNode(toNodeID);
                if (toNode) choice.to = toNodeID; // TODO: Should let users know that it didnt work
            }
            if (
                (context.loggedInAccount?.isAdmin ||
                    context.loggedInAccount?.screenName === fromNode.owner) &&
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

            return await addItem(TABLES.CHOICE_TABLE, choice);
        },
    }),
    removeChoice: defaultEndpointsFactory.build({
        methods: ["delete"],
        input: z.object({ choiceID: z.string() }),
        // @ts-ignore
        output: z.boolean(),
        handler: async ({ input: { choiceID } }) => {
            const choice = await getChoice(choiceID);
            if (!choice) throw new Error("That choice doesnt exist!");

            const fromNode = await getNode(choice.from);
            if (!fromNode) {
                throw new Error("That choice's from node disappeared!");
                // TODO: Fix this when this happens
            }

            if (
                !context.loggedInAccount?.isAdmin &&
                !context.loggedInAccount?.screenName !== fromNode.owner &&
                (choice.isCanon ||
                    context.loggedInAccount?.screenName !== choice.suggestedBy)
            )
                throw new Error("No permission!");

            console.log(`Removing suggestion ${choice.ID} (${choice.action})`);
            return await removeItem(TABLES.CHOICE_TABLE, { ID: choice.ID });
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
