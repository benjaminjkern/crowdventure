import databaseCalls from "../databaseCalls.js";

export const hidden = async (parent) => {
    // TODO: Migrate full database;
    return parent.hidden || false;
};

export const from = async (parent) => await databaseCalls.getNode(parent.from);
export const to = async (parent) => await databaseCalls.getNode(parent.to);
export const suggestedBy = async (parent) =>
    await databaseCalls.getAccount(parent.suggestedBy);

export const likes = async (parent) => {
    // TODO: Do this in the same way as the other async methods
    return (await databaseCalls.getLikedByForChoice(parent.ID)).length;
};
export const dislikes = async (parent) => {
    return (await databaseCalls.getDisikedByForChoice(parent.ID)).length;
};

export const score = async (parent) => {
    // TODO: Do this on update instead of spawning recalc
    // (async () => {
    //     const choice = await databaseCalls.getChoice(parent.ID);
    //     const score = choice.score;
    //     choice.score =
    //         (await ChoiceResolvers.likes(choice)) -
    //         (await ChoiceResolvers.dislikes(choice));
    //     if (score !== choice.score) await databaseCalls.addChoice(choice);
    // })();

    return parent.score;
};

export const suggestChoice = async (parent, args, context) => {
    if (!context.loggedInAccount)
        throw new Error("Must be logged in to do that!");

    const account = context.loggedInAccount;
    const node = await databaseCalls.getNode(args.fromID);
    if (!node) throw new Error("From node doesnt exist!");

    const toNode = await databaseCalls.getNode(args.toID);
    if (!toNode) throw new Error("To node doesnt exist!");

    if (!args.action) throw new Error("Action cannot be empty!");

    console.log(
        `${account.screenName} is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`
    );

    const newChoice = {
        ID: await uniqueID(databaseCalls.getChoice, `${node.ID}-`, false),
        from: node.ID,
        action: args.action,
        dateCreated: new Date().toJSON(),
        to: toNode.ID,
        suggestedBy: account.screenName,
        hidden: flagContent(args.content) || undefined, // Let users know if its flagged
        score: 0,
    };

    if (account.screenName === node.owner) {
        newChoice.isCanon = true;
        // updateTime(node);
    } else {
        newChoice.isCanon = false;
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

    return await databaseCalls.addChoice(newChoice);
};
export const editSuggestion = async (parent, args, context) => {
    const choice = await databaseCalls.getChoice(args.choiceID);
    if (!choice) throw new Error("That choice doesnt exist!");

    const fromNode = await databaseCalls.getNode(choice.from);

    if (
        !context.loggedInAccount?.isAdmin &&
        !context.loggedInAccount?.screenName !== fromNode.owner &&
        (choice.isCanon ||
            context.loggedInAccount?.screenName !== choice.suggestedBy)
    )
        throw new Error("No permission!");

    console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

    // const daddy = await databaseCalls.getNode(choice.from);

    if (context.loggedInAccount?.isAdmin && args.hidden !== undefined)
        // Should only be able to be done by admins
        choice.hidden = args.hidden;
    if (args.toID && choice.to !== args.toID) {
        choice.to = args.toID;
        // if (daddy.canonChoices.includes(choice.ID)) {
        //     updateTime(daddy);
        // }
    }
    if (
        context.loggedInAccount?.isAdmin ||
        (context.loggedInAccount?.screenName === fromNode.owner &&
            args.isCanon !== undefined)
    )
        choice.isCanon = args.isCanon;
    if (args.action) {
        choice.action = args.action;
        if (flagContent(args.action)) choice.hidden = true;
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

    return await databaseCalls.addChoice(choice);
};
export const removeSuggestion = async (parent, args, context) => {
    const choice = await databaseCalls.getChoice(args.choiceID);
    if (!choice) throw new Error("That choice doesnt exist!");

    const fromNode = await databaseCalls.getNode(choice.from);

    if (
        !context.loggedInAccount?.isAdmin &&
        !context.loggedInAccount?.screenName !== fromNode.owner &&
        (choice.isCanon ||
            context.loggedInAccount?.screenName !== choice.suggestedBy)
    )
        throw new Error("No permission!");

    console.log(`Removing suggestion ${choice.ID} (${choice.action})`);
    return await databaseCalls.removeChoice(choice.ID);
};
// likeSuggestion: async (parent, args) => {
//     const choice = await databaseCalls.getChoice(args.choiceID);
//     if (!choice) {
//         throw new UserInputError("That node doesnt exist!", {
//             invalidArgs: Object.keys(args),
//         });
//     }
//     const account = await databaseCalls.getAccount(args.accountScreenName);
//     if (!account) {
//         throw new UserInputError("That account doesnt exist!", {
//             invalidArgs: Object.keys(args),
//         });
//     }

//     console.log(
//         `${account.screenName} is liking choice ${choice.ID} (${choice.action})`
//     );

//     const reaction = await databaseCalls.getReactionByAccountAndChoice(
//         args.accountScreenName,
//         args.choiceID
//     );

//     if (!reaction) {
//         await changeScore(choice, 1);

//         return await databaseCalls.addReaction({
//             ID: await uniqueID(databaseCalls.getReaction),
//             account: args.accountScreenName,
//             choice: args.choiceID,
//             like: true,
//         });
//     } else if (reaction.like === true) {
//         await changeScore(choice, -1);
//         // replace with reaction.like === args.like
//         // If it already matches what you are trying to do, turn it off
//         return await databaseCalls.removeReaction(reaction.ID);
//     } else {
//         await changeScore(choice, 2);
//         reaction.like = true;
//         return await databaseCalls.addReaction(reaction);
//     }
// },

// const changeScore = async (choice, diff) => {
//     choice.score += diff;
//     await databaseCalls.addChoice(choice);
//     const suggestedBy = await databaseCalls.getAccount(choice.suggestedBy);
//     suggestedBy.totalSuggestionScore += diff;
//     await databaseCalls.addAccount(suggestedBy);
// };
