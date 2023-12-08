import databaseCalls from "../databaseCalls.js";
import { encrypt, flagContent, getIP, uniqueID } from "../utils.js";
import jwt from "jsonwebtoken";

export const loginAccount = async (parent, args, context) => {
    const account = await databaseCalls.getAccount(args.screenName);
    if (!account) throw new Error("That account doesnt exist!");
    if (args.password) {
        if (encrypt(args.password) !== account.encryptedPassword) return null;

        context.res.set({
            "Access-Control-Expose-Headers": "token",
            token: jwt.sign(
                { accountScreenName: account.screenName },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            ),
        });
    } else if (
        !context.loggedInAccount ||
        context.loggedInAccount.screenName !== account.screenName
    )
        return null;

    return account;
};

export const createAccount = async (parent, args, context) => {
    if (!args.screenName) throw new Error("ScreenName cannot be empty!");
    if (!args.password) throw new Error("Password cannot be empty!");
    if (flagContent(args.screenName)) throw new Error("Bad word");
    if (await databaseCalls.getAccount(args.screenName))
        throw new Error("That screen name already exists!");

    console.log(`Creating new account with name ${args.screenName}`);

    return await databaseCalls.addAccount({
        screenName: args.screenName,
        bio: flagContent(args.bio) ? undefined : args.bio,
        encryptedPassword: encrypt(args.password),
        lastIP: getIP(context),
        profilePicURL: args.profilePicURL,
        dateCreated: new Date().toJSON(),
        isAdmin: false,
        totalSuggestionScore: 0,
        totalNodeViews: 0,
    });
};
export const deleteAccount = async (parent, args, context) => {
    const account = await databaseCalls.getAccount(args.screenName);
    if (!account) throw new Error("That account doesnt exist!");

    if (
        !context.loggedInAccount?.isAdmin &&
        context.loggedInAccount?.screenName !== account.screenName
    )
        throw new Error("No permission!");

    console.log(`Deleting Account ${account.screenName}`);

    // TODO: Make these all one database call instead of O(N) calls
    for (const { ID } of await databaseCalls.getChoicesSuggestedByAccount(
        account.screnName
    )) {
        await databaseCalls.removeChoice(ID);
    }
    for (const { ID } of await databaseCalls.getNodesOwnedByAccount(
        account.screenName
    )) {
        await databaseCalls.removeNode(ID);
    }

    return await databaseCalls.removeAccount(account.screenName);
};

export const editAccount = async (parent, args, context) => {
    const account = await databaseCalls.getAccount(args.screenName);
    if (!account) throw new Error("That account doesnt exist!");

    if (
        !context.loggedInAccount?.isAdmin &&
        context.loggedInAccount?.screenName !== account.screenName
    )
        throw new Error("No permission!");

    console.log(`Editing Account ${account.screenName}`);
    // TODO: Don't update if nothing is changing

    if (args.newPassword) account.encryptedPassword = encrypt(args.newPassword);
    if (args.bio !== undefined) {
        if (flagContent(args.bio)) {
            account.hidden = true;
            // TODO: Send notification (Maybe also put a check on the frontend)
            // TODO: Find a way to either only hide the bio or make it so if they change the thing that's bad then they'll get unhidden
        }
        account.bio = args.bio;
    }
    if (args.profilePicURL !== undefined)
        account.profilePicURL = args.profilePicURL;
    if (context.loggedInAccount?.isAdmin && args.hidden !== undefined)
        account.hidden = args.hidden;
    if (context.loggedInAccount?.isAdmin && args.isAdmin !== undefined)
        account.isAdmin = args.isAdmin;

    // await MutationResolvers.createNotification(
    //     account,
    //     {
    //         content: `Your account was edited by an administrator.`,
    //         link: `/node/${account.screenName}`,
    //     },
    //     context
    // );

    return await databaseCalls.addAccount(account);
};

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
        pictureUnsafe: args.pictureUnsafe, // TODO: Do this on the backend
        featured: args.featured || false,
        hidden:
            // TODO: Let user know if its flagged and they didnt mean it to be hidden
            // TODO: Also only admins hsould be able to do this (?)
            flagContent(args.title) || flagContent(args.content) || args.hidden,
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
    if (args.bgColor) node.bgColor = args.bgColor;
    if (args.fgColor) node.fgColor = args.fgColor;
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

// createFeedback: async (parent, args, context) => {
//     let account;
//     if (args.accountScreenName) {
//         account = await databaseCalls.getAccount(args.accountScreenName);
//         if (!account) {
//             throw new UserInputError("That account doesnt exist!", {
//                 invalidArgs: Object.keys(args),
//             });
//         }
//     }

//     if (
//         (args.reportingObjectType !== undefined) !==
//         (args.reportingObjectID !== undefined)
//     ) {
//         throw new UserInputError(
//             "Invalid input, make sure you report both object type and ID",
//             {
//                 invalidArgs: Object.keys(args),
//             }
//         );
//     }

//     const IP = context.headers
//         ? context.headers["X-Forwarded-For"].split(",")[0]
//         : undefined;
//     const feedback = {
//         ID: await uniqueID(databaseCalls.getFeedback),
//         submittedBy: args.accountScreenName || "",
//         IP,
//         reporting: "",
//         dateCreated: new Date().toJSON(),
//         info: args.info,
//     };

//     if (args.reportingObjectType && args.reportingObjectID) {
//         feedback.reporting = {
//             type: args.reportingObjectType,
//             ID: args.reportingObjectID,
//         };

//         // Hide nodes and choices that are being reported
//         switch (args.reportingObjectType) {
//             case "Node":
//                 databaseCalls
//                     .getNode(args.reportingObjectID)
//                     .then((reporting) => {
//                         if (reporting.hidden === undefined)
//                             reporting.hidden = true;
//                         databaseCalls.addNode(reporting);
//                     });
//                 break;
//             case "Choice":
//                 databaseCalls
//                     .getChoice(args.reportingObjectID)
//                     .then((reporting) => {
//                         if (reporting.hidden === undefined)
//                             reporting.hidden = true;
//                         databaseCalls.addChoice(reporting);
//                     });
//                 break;
//         }
//     }
//     return await databaseCalls.addFeedback(feedback);
// },

// createNotification: async (parent, args) => {
//     let account;
//     if (parent) {
//         account = parent;
//     } else {
//         account = await databaseCalls.getAccount(args.accountScreenName);
//         if (!account) {
//             throw new UserInputError(`Account doesn't exist!`, {
//                 invalidArgs: Object.keys(args),
//             });
//         }
//     }

//     const newNotification = {
//         ID: await uniqueID(databaseCalls.getNotification),
//         time: new Date().getTime(),
//         content: args.content,
//         link: args.link,
//         seen: false,
//         account: account.screenName,
//     };

//     return await databaseCalls.addNotification(newNotification);
// },
// seeNotification: async (parent, args) => {
//     throw new UserInputError(`No longer supported, sorry!`, {
//         invalidArgs: Object.keys(args),
//     });
//     // const notification = await databaseCalls.getNotification(
//     //     args.notificationID
//     // );

//     // if (!notification) {
//     //     throw new UserInputError(`Notification doesn't exist!`, {
//     //         invalidArgs: Object.keys(args),
//     //     });
//     // }
//     // notification.seen =
//     //     args.force !== undefined ? args.force : !notification.seen;

//     // return await databaseCalls.addNotification(notification);
// },
// clearNotifications: async (parent, args) => {
//     const account = await databaseCalls.getAccount(args.accountScreenName);
//     if (!account) {
//         throw new UserInputError(`Account doesn't exist!`, {
//             invalidArgs: Object.keys(args),
//         });
//     }
//     for (const { ID } of await AccountResolvers.notifications(
//         account.screenName
//     )) {
//         await databaseCalls.removeNotification(ID);
//     }
//     return true;
// },

// const changeScore = async (choice, diff) => {
//     choice.score += diff;
//     await databaseCalls.addChoice(choice);
//     const suggestedBy = await databaseCalls.getAccount(choice.suggestedBy);
//     suggestedBy.totalSuggestionScore += diff;
//     await databaseCalls.addAccount(suggestedBy);
// };
