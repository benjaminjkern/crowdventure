const { UserInputError } = require("apollo-server-lambda");
const { databaseCalls } = require("./databaseCalls.js");
const { encrypt, flagContent, uniqueID } = require("./resolverUtils.js");
// const AccountResolvers = require("./accountResolvers.js");
const NodeResolvers = require("./nodeResolvers.js");
const AccountResolvers = require("./accountResolvers.js");

// const MAX_NOTIFICATIONS = 50;

const updateTime = async (
    node,
    time = new Date().getTime(),
    seen = {},
    first = true
) => {
    if (seen[node.ID]) return;
    console.log("Updating " + node.ID);
    seen[node.ID] = true;
    node.lastUpdated = time;
    if (!first) databaseCalls.addNode(node);
    const parents = await NodeResolvers.parents(node);
    for (const parent of parents) {
        updateTime(parent, time, seen, false);
    }
};

const MutationResolvers = {
    createAccount: async (parent, args, context) => {
        console.log(`Creating new account with name ${args.screenName}`);
        if (!args.screenName) {
            throw new UserInputError("ScreenName cannot be empty!", {
                invalidArgs: Object.keys(args),
            });
        }
        if (!args.password) {
            throw new UserInputError("Password cannot be empty!", {
                invalidArgs: Object.keys(args),
            });
        }
        if (await databaseCalls.getAccount(args.screenName)) {
            throw new UserInputError("That screen name already exists!", {
                invalidArgs: Object.keys(args),
            });
        }
        if (flagContent(args.screenName)) {
            throw new UserInputError("Bad word", {
                invalidArgs: Object.keys(args),
            });
        }
        const IP = context.headers
            ? context.headers["X-Forwarded-For"].split(",")[0]
            : undefined;
        return await databaseCalls.addAccount({
            screenName: args.screenName,
            bio: flagContent(args.bio) ? undefined : args.bio,
            encryptedPassword: encrypt(args.password),
            lastIP: IP,
            profilePicURL: args.profilePicURL,
            dateCreated: new Date().toJSON(),
            isAdmin: false,
        });
    },
    deleteAccount: async (parent, args) => {
        const account = await databaseCalls.getAccount(args.screenName);

        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Deleting Account ${account.screenName}`);

        for (const { ID } of await AccountResolvers.suggestedChoices(account)) {
            await MutationResolvers.removeSuggestion(undefined, {
                choiceID: ID,
            });
        }
        for (const { ID } of await AccountResolvers.nodes(account)) {
            await MutationResolvers.deleteNode(undefined, { nodeID: ID });
        }

        return await databaseCalls.removeAccount(account.screenName);
    },
    editAccount: async (parent, args) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing Account ${account.screenName}`);

        if (args.newPassword)
            account.encryptedPassword = encrypt(args.newPassword);
        if (args.bio !== undefined && !flagContent(args.bio))
            account.bio = args.bio;
        if (args.profilePicURL !== undefined)
            account.profilePicURL = args.profilePicURL;
        if (args.hidden !== undefined) account.hidden = args.hidden;
        if (args.isAdmin !== undefined) account.isAdmin = args.isAdmin;

        if (args.newScreenName && !flagContent(args.newScreenName)) {
            throw new UserInputError(
                "Changing screen name is no longer allowed! (Too many bugs with the way it was implemented originally because I am dumb)",
                {
                    invalidArgs: Object.keys(args),
                }
            );
        }
        // await MutationResolvers.createNotification(
        //     account,
        //     {
        //         content: `Your account was edited by an administrator.`,
        //         link: `/node/${account.screenName}`,
        //     },
        //     context
        // );

        return await databaseCalls.addAccount(account);
    },

    loginAccount: async (parent, args, context) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const IP = context.headers
            ? context.headers["X-Forwarded-For"].split(",")[0]
            : undefined;
        if (args.password) {
            if (encrypt(args.password) !== account.encryptedPassword)
                return null;

            account.lastIP = IP;
        }

        if (!IP || account.lastIP !== IP) return null;
        return await databaseCalls.addAccount(account);
    },
    createNode: async (parent, args) => {
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Creating new node with title ${args.title} and owner ${account.screenName}`
        );
        if (!args.title) {
            throw new UserInputError("Title cannot be empty!", {
                invalidArgs: Object.keys(args),
            });
        }
        if (!args.content) {
            throw new UserInputError("Content cannot be empty!", {
                invalidArgs: Object.keys(args),
            });
        }
        const now = new Date();

        const newNode = {
            ID: await uniqueID(databaseCalls.getNode),
            owner: args.accountScreenName,
            title: args.title,
            content: args.content,
            pictureURL: args.pictureURL,
            pictureUnsafe: args.pictureUnsafe,
            featured: args.featured || false,
            hidden:
                flagContent(args.title) ||
                flagContent(args.content) ||
                args.hidden,
            dateCreated: now.toJSON(),
            lastUpdated: now.getTime(),
        };

        return await databaseCalls.addNode(newNode);
    },
    deleteNode: async (parent, args) => {
        const node = await databaseCalls.getNode(args.nodeID);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Deleting node ${node.ID} (${node.title})`);

        for (const { ID } of await NodeResolvers.allChoices(node)) {
            await MutationResolvers.removeSuggestion(undefined, {
                choiceID: ID,
            });
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
    },
    editNode: async (parent, args) => {
        const node = await databaseCalls.getNode(args.nodeID);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing node ${node.ID} (${node.title})`);

        if (args.title) {
            node.title = args.title;
            if (flagContent(args.title)) node.hidden = true;
        }
        if (args.content) {
            node.content = args.content;
            if (flagContent(args.content)) node.hidden = true;
        }
        if (args.pictureURL !== undefined) node.pictureURL = args.pictureURL;
        if (args.bgColor) node.bgColor = args.bgColor;
        if (args.fgColor) node.fgColor = args.fgColor;
        if (args.pictureUnsafe !== undefined)
            node.pictureUnsafe = args.pictureUnsafe;
        if (args.hidden !== undefined) {
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
    },
    suggestChoice: async (parent, args, context) => {
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        const node = await databaseCalls.getNode(args.fromID);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        const toNode = await databaseCalls.getNode(args.toID);
        if (!toNode) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `${account.screenName} is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`
        );
        if (!args.action) {
            throw new UserInputError("Action cannot be empty!", {
                invalidArgs: Object.keys(args),
            });
        }

        let ID = `${node.ID}-${Math.random().toString(36).substring(2, 12)}`;
        while (await databaseCalls.getChoice(ID))
            ID = `${node.ID}-${Math.random().toString(36).substring(2, 12)}`;

        const newChoice = {
            ID: uniqueID(databaseCalls.getChoice, `${node.ID}-`, false),
            from: node.ID,
            action: args.action,
            dateCreated: new Date().toJSON(),
            to: toNode.ID,
            suggestedBy: account.screenName,
            hidden: flagContent(args.content) || undefined,
        };

        if (account.screenName === node.owner) {
            newChoice.isCanon = true;
            // updateTime(node);
        } else {
            newChoice.isCanon = false;
            MutationResolvers.createNotification(
                undefined,
                {
                    accountScreenName: node.owner,
                    content: `${account.screenName} suggested a new choice for your page "${node.title}"!`,
                    link: `/node/${node.ID}`,
                },
                context
            );
        }

        // MutationResolvers.createNotification(undefined, { accountScreenName: toNode.owner, content: `${account.screenName} suggested a new choice that leads to your page "${toNode.title}"!`, link: `/node/${node.ID}` }, context);

        return await databaseCalls.addChoice(newChoice);
    },
    editSuggestion: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

        // const daddy = await databaseCalls.getNode(choice.from);

        if (args.hidden !== undefined) {
            choice.hidden = args.hidden;
        }
        if (args.toID && choice.to !== args.toID) {
            choice.to = args.toID;
            // if (daddy.canonChoices.includes(choice.ID)) {
            //     updateTime(daddy);
            // }
        }
        if (args.isCanon !== undefined) {
            choice.isCanon = args.isCanon;
        }
        if (args.action) {
            choice.action = args.action;
            if (flagContent(args.action)) choice.hidden = true;
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
    },
    removeSuggestion: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Removing suggestion ${choice.ID} (${choice.action})`);
        return await databaseCalls.removeChoice(choice.ID);
    },
    makeCanon: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const node = await databaseCalls.getNode(choice.from);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) canon`
        );

        // updateTime(node);

        // MutationResolvers.createNotification(
        //     undefined,
        //     {
        //         accountScreenName: choice.suggestedBy,
        //         content: `Your suggested choice "${choice.action}" stemming from page titled "${node.title}" was made canon!`,
        //         link: `/node/${node.ID}`,
        //     },
        //     context
        // );

        choice.isCanon = true;
        return await databaseCalls.addChoice(choice);
    },
    makeNonCanon: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const node = await databaseCalls.getNode(choice.from);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) non-canon`
        );

        // updateTime(node);
        // MutationResolvers.createNotification(
        //     undefined,
        //     {
        //         accountScreenName: choice.suggestedBy,
        //         content: `Your suggested choice "${choice.action}" stemming from page titled "${node.title}" was made non-canon!`,
        //         link: `/node/${node.ID}`,
        //     },
        //     context
        // );

        choice.isCanon = false;
        return await databaseCalls.addChoice(choice);
    },
    likeSuggestion: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `${account.screenName} is liking choice ${choice.ID} (${choice.action})`
        );

        const reaction = await databaseCalls.getReactionByAccountAndChoice(
            args.accountScreenName,
            args.choiceID
        );

        if (!reaction) {
            return await databaseCalls.addReaction({
                ID: await uniqueID(databaseCalls.getReaction),
                account: args.accountScreenName,
                choice: args.choiceID,
                like: args.like,
            });
        } else if (reaction.like === true) {
            // replace with reaction.like === args.like
            // If it already matches what you are trying to do, turn it off
            return await databaseCalls.removeReaction(reaction);
        } else {
            reaction.like = args.like;
            return await databaseCalls.addReaction(reaction);
        }
    },
    dislikeSuggestion: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `${account.screenName} is disliking choice ${choice.ID} (${choice.action})`
        );

        const reaction = await databaseCalls.getReactionByAccountAndChoice(
            args.accountScreenName,
            args.choiceID
        );

        if (!reaction) {
            return await databaseCalls.addReaction({
                ID: await uniqueID(databaseCalls.getReaction),
                account: args.accountScreenName,
                choice: args.choiceID,
                like: args.like,
            });
        } else if (reaction.like === false) {
            // replace with reaction.like === args.like
            // If it already matches what you are trying to do, turn it off
            return await databaseCalls.removeReaction(reaction);
        } else {
            reaction.like = args.like;
            return await databaseCalls.addReaction(reaction);
        }
    },

    createFeedback: async (parent, args, context) => {
        let account;
        if (args.accountScreenName) {
            account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account) {
                throw new UserInputError("That account doesnt exist!", {
                    invalidArgs: Object.keys(args),
                });
            }
        }

        if (
            (args.reportingObjectType !== undefined) !==
            (args.reportingObjectID !== undefined)
        ) {
            throw new UserInputError(
                "Invalid input, make sure you report both object type and ID",
                {
                    invalidArgs: Object.keys(args),
                }
            );
        }

        const IP = context.headers
            ? context.headers["X-Forwarded-For"].split(",")[0]
            : undefined;
        const feedback = {
            ID: await uniqueID(databaseCalls.getFeedback),
            submittedBy: args.accountScreenName || "",
            IP,
            reporting: "",
            dateCreated: new Date().toJSON(),
            info: args.info,
        };

        if (args.reportingObjectType && args.reportingObjectID) {
            feedback.reporting = {
                type: args.reportingObjectType,
                ID: args.reportingObjectID,
            };

            // Hide nodes and choices that are being reported
            switch (args.reportingObjectType) {
                case "Node":
                    databaseCalls
                        .getNode(args.reportingObjectID)
                        .then((reporting) => {
                            if (reporting.hidden === undefined)
                                reporting.hidden = true;
                            databaseCalls.addNode(reporting);
                        });
                    break;
                case "Choice":
                    databaseCalls
                        .getChoice(args.reportingObjectID)
                        .then((reporting) => {
                            if (reporting.hidden === undefined)
                                reporting.hidden = true;
                            databaseCalls.addChoice(reporting);
                        });
                    break;
            }
        }
        return await databaseCalls.addFeedback(feedback);
    },
    removeFeedback: async (parent, args) => {
        const feedback = await databaseCalls.getFeedback(args.feedbackID);
        if (!feedback) {
            throw new UserInputError("That feedback doesn't exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        return await databaseCalls.removeFeedback(feedback.ID);
    },

    createNotification: async (parent, args) => {
        let account;
        if (parent) {
            account = parent;
        } else {
            account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account) {
                throw new UserInputError(`Account doesn't exist!`, {
                    invalidArgs: Object.keys(args),
                });
            }
        }

        const newNotification = {
            ID: await uniqueID(databaseCalls.getNotification),
            time: new Date().getTime(),
            content: args.content,
            link: args.link,
            seen: false,
            account: account.screenName,
        };

        return await databaseCalls.addNotification(newNotification);
    },
    removeNotification: async (parent, args) => {
        throw new UserInputError(`No longer supported, sorry!`, {
            invalidArgs: Object.keys(args),
        });
        // const notification = await databaseCalls.getNotification(
        //     args.notificationID
        // );

        // if (!notification) {
        //     throw new UserInputError(`Notification doesn't exist!`, {
        //         invalidArgs: Object.keys(args),
        //     });
        // }
        // return await databaseCalls.removeNotification(notification.ID);
    },
    seeNotification: async (parent, args) => {
        throw new UserInputError(`No longer supported, sorry!`, {
            invalidArgs: Object.keys(args),
        });
        // const notification = await databaseCalls.getNotification(
        //     args.notificationID
        // );

        // if (!notification) {
        //     throw new UserInputError(`Notification doesn't exist!`, {
        //         invalidArgs: Object.keys(args),
        //     });
        // }
        // notification.seen =
        //     args.force !== undefined ? args.force : !notification.seen;

        // return await databaseCalls.addNotification(notification);
    },
    clearNotifications: async (parent, args) => {
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError(`Account doesn't exist!`, {
                invalidArgs: Object.keys(args),
            });
        }
        for (const { ID } of await AccountResolvers.notifications(
            account.screenName
        )) {
            await databaseCalls.removeNotification(ID);
        }
        return true;
    },
};

module.exports = { MutationResolvers, updateTime };
