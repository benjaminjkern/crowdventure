const { UserInputError } = require("apollo-server-lambda");
const { databaseCalls } = require("./databaseCalls.js");
const { encrypt, flagContent } = require("./resolverUtils.js");
// const AccountResolvers = require("./accountResolvers.js");
const NodeResolvers = require("./nodeResolvers.js");
const AccountResolvers = require("./accountResolvers.js");

const MAX_NOTIFICATIONS = 50;

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
        const IP = context.headers["X-Forwarded-For"].split(",")[0];
        return await databaseCalls.addAccount({
            screenName: args.screenName,
            bio: flagContent(args.bio) ? null : args.bio,
            encryptedPassword: encrypt(args.password),
            lastIP: IP,
            profilePicURL: args.profilePicURL,
            dateCreated: new Date().toJSON(),
            nodes: [],
            suggestedChoices: [],
            liked: {},
            disliked: {},
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
        // again, not really checking or caring if these work for now
        // I only care about it not returning promises for now
        account.suggestedChoices.forEach((choiceID) =>
            MutationResolvers.removeSuggestion(undefined, { choiceID })
        );
        (await AccountResolvers.nodes(parent)).forEach((nodeID) =>
            MutationResolvers.deleteNode(undefined, { nodeID })
        );

        return await databaseCalls.removeAccount(account.screenName);
    },
    editAccount: async (parent, args, context) => {
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
            if (await databaseCalls.getAccount(args.newScreenName)) {
                throw new UserInputError("That account already exists!", {
                    invalidArgs: Object.keys(args),
                });
            }
            throw new UserInputError(
                "Changing screen name is no longer allowed! (Too many bugs with the way it was implemented originally because I am dumb)",
                {
                    invalidArgs: Object.keys(args),
                }
            );
            // const nodes = await AccountResolvers.nodes(account);
            // nodes.forEach((node) =>
            //     databaseCalls.addNode({ ...node, owner: args.newScreenName })
            // );
            // const choices = await AccountResolvers.suggestedChoices(account);
            // choices.forEach((choice) => {
            //     const newLikes = choice.likedBy;
            //     if (newLikes[account.screenName]) {
            //         delete newLikes[account.screenName];
            //         newLikes[args.newScreenName] = args.newScreenName;
            //     }
            //     const newDislikes = choice.dislikedBy;
            //     if (newDislikes[account.screenName]) {
            //         delete newDislikes[account.screenName];
            //         newDislikes[args.newScreenName] = args.newScreenName;
            //     }
            //     databaseCalls.addChoice({
            //         ...choice,
            //         suggestedBy: args.newScreenName,
            //         likedBy: newLikes,
            //         dislikedBy: newDislikes,
            //     });
            // });
            // databaseCalls.removeAccount(account.screenName);
            // account.screenName = args.newScreenName;
        }
        MutationResolvers.createNotification(
            account,
            {
                content: `Your account was edited by an administrator.`,
                link: `/node/${account.screenName}`,
            },
            context
        );

        return await databaseCalls.addAccount(account);
    },
    loginAccount: async (parent, args, context) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError("That account doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const IP = context.headers["X-Forwarded-For"].split(",")[0];
        if (args.password) {
            if (encrypt(args.password) === account.encryptedPassword)
                account.lastIP = IP;
            else return null;
        }
        if (account.lastIP === IP)
            return await databaseCalls.addAccount(account);
        return null;
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

        let ID = Math.random().toString(36).substring(2, 12).toUpperCase();
        while (await databaseCalls.getNode(ID))
            ID = Math.random().toString(36).substring(2, 12).toUpperCase();

        const newNode = {
            ID,
            owner: args.accountScreenName,
            title: args.title,
            content: args.content,
            pictureURL: args.pictureURL,
            pictureUnsafe: args.pictureUnsafe || false,
            fgColor: args.fgColor || "auto",
            bgColor: args.fgColor || "white",
            featured: args.featured || false,
            hidden:
                args.hidden ||
                flagContent(args.title) ||
                flagContent(args.content) ||
                undefined,
            dateCreated: now.toJSON(),
            lastUpdated: now.getTime(),
            views: {},
            canonChoices: [],
            nonCanonChoices: [],
        };
        // account.nodes.push(newNode.ID);
        databaseCalls.addAccount(account);
        return await databaseCalls.addNode(newNode);
    },
    deleteNode: async (parent, args, context) => {
        const node = await databaseCalls.getNode(args.nodeID);
        if (!node) {
            throw new UserInputError("That node doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        const account = await databaseCalls.getAccount(node.owner);

        console.log(`Deleting node ${node.ID} (${node.title})`);

        node.canonChoices.forEach((choiceID) =>
            MutationResolvers.removeSuggestion(undefined, { choiceID })
        );
        node.nonCanonChoices.forEach((choiceID) =>
            MutationResolvers.removeSuggestion(undefined, { choiceID })
        );

        if (account) {
            // account.nodes = account.nodes.filter(
            //     (nodeID) => nodeID !== node.ID
            // );
            databaseCalls.addAccount(account);
        }
        MutationResolvers.createNotification(
            undefined,
            {
                accountScreenName: node.owner,
                content: `Your page titled "${node.title}" was deleted by an administrator.`,
                link: `/node/${node.ID}`,
            },
            context
        );

        return await databaseCalls.removeNode(node.ID);
    },
    editNode: async (parent, args, context) => {
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

        MutationResolvers.createNotification(
            undefined,
            {
                accountScreenName: node.owner,
                content: `Your page titled "${node.title}" was edited by an administrator.`,
                link: `/node/${node.ID}`,
            },
            context
        );

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
            ID,
            from: node.ID,
            action: args.action,
            dateCreated: new Date().toJSON(),
            to: toNode.ID,
            likedBy: {},
            dislikedBy: {},
            suggestedBy: account.screenName,
            hidden: flagContent(args.content) || undefined,
        };

        account.suggestedChoices.push(newChoice.ID);

        if (account.screenName === node.owner) {
            node.canonChoices.push(newChoice.ID);
            updateTime(node);
        } else {
            node.nonCanonChoices.push(newChoice.ID);
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

        console.log(node);

        databaseCalls.addAccount(account);
        databaseCalls.addNode(node);
        return await databaseCalls.addChoice(newChoice);
    },
    editSuggestion: async (parent, args, context) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

        const daddy = await databaseCalls.getNode(choice.from);

        if (args.hidden !== undefined) {
            choice.hidden = args.hidden;
        }
        if (args.toID && choice.to !== args.toID) {
            choice.to = args.toID;
            if (daddy.canonChoices.includes(choice.ID)) {
                updateTime(daddy);
            }
        }
        if (args.action) {
            choice.action = args.action;
            if (flagContent(args.action)) choice.hidden = true;
        }

        MutationResolvers.createNotification(
            undefined,
            {
                accountScreenName: choice.suggestedBy,
                content: `Your suggested choice "${choice.action}" stemming from page titled "${daddy.title}" has been edited!`,
                link: `/node/${daddy.ID}`,
            },
            context
        );

        return await databaseCalls.addChoice(choice);
    },
    removeSuggestion: async (parent, args, context) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
                invalidArgs: Object.keys(args),
            });
        }
        const account = await databaseCalls.getAccount(choice.suggestedBy);
        const node = await databaseCalls.getNode(choice.from);

        console.log(`Removing suggestion ${choice.ID} (${choice.action})`);

        if (account) {
            // idk how either of these can be null but whatever
            account.suggestedChoices = account.suggestedChoices.filter(
                (choiceID) => choiceID !== choice.ID
            );

            if (node)
                MutationResolvers.createNotification(
                    account,
                    {
                        content: `Your suggested choice "${choice.action}" stemming from page titled "${node.title}" was deleted.`,
                        link: `/node/${node.ID}`,
                    },
                    context
                );
            databaseCalls.addAccount(account);
        }
        if (node) {
            if (node.canonChoices.includes(choice.ID)) {
                updateTime(node);
            }
            node.canonChoices = node.canonChoices.filter(
                (choiceID) => choiceID !== choice.ID
            );
            node.nonCanonChoices = node.nonCanonChoices.filter(
                (choiceID) => choiceID !== choice.ID
            );
            databaseCalls.addNode(node);
        }
        return await databaseCalls.removeChoice(choice.ID);
    },
    makeCanon: async (parent, args, context) => {
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

        if (node.canonChoices.includes(choice.ID)) return choice;

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) canon`
        );

        updateTime(node);

        node.canonChoices.push(choice.ID);
        node.nonCanonChoices = node.nonCanonChoices.filter(
            (id) => id !== choice.ID
        );

        MutationResolvers.createNotification(
            undefined,
            {
                accountScreenName: choice.suggestedBy,
                content: `Your suggested choice "${choice.action}" stemming from page titled "${node.title}" was made canon!`,
                link: `/node/${node.ID}`,
            },
            context
        );

        databaseCalls.addNode(node);
        return choice;
    },
    makeNonCanon: async (parent, args, context) => {
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
        if (node.nonCanonChoices.includes(choice.ID)) return choice;

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) non-canon`
        );

        updateTime(node);

        node.nonCanonChoices.push(choice.ID);
        node.canonChoices = node.canonChoices.filter((id) => id !== choice.ID);

        MutationResolvers.createNotification(
            undefined,
            {
                accountScreenName: choice.suggestedBy,
                content: `Your suggested choice "${choice.action}" stemming from page titled "${node.title}" was made non-canon!`,
                link: `/node/${node.ID}`,
            },
            context
        );

        databaseCalls.addNode(node);
        return choice;
    },
    likeSuggestion: async (parent, args, context) => {
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
        const node = await databaseCalls.getNode(choice.from);

        console.log(
            `${account.screenName} is liking choice ${choice.ID} (${choice.action})`
        );

        delete choice.dislikedBy[account.screenName];

        if (!choice.likedBy[account.screenName]) {
            choice.likedBy[account.screenName] = account.screenName;
            if (node)
                MutationResolvers.createNotification(
                    undefined,
                    {
                        accountScreenName: choice.suggestedBy,
                        content: `${account.screenName} liked your choice ${choice.action} on page titled "${node.title}"!`,
                        link: `/account/${account.screenName}`,
                    },
                    context
                );
        } else delete choice.likedBy[account.screenName];

        databaseCalls.addAccount(account);
        return await databaseCalls.addChoice(choice);
    },
    dislikeSuggestion: async (parent, args) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError("That choice doesnt exist!", {
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

        delete choice.likedBy[account.screenName];

        if (!choice.dislikedBy[account.screenName])
            choice.dislikedBy[account.screenName] = account.screenName;
        else delete choice.dislikedBy[account.screenName];

        databaseCalls.addAccount(account);
        return await databaseCalls.addChoice(choice);
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

        let ID = Math.random().toString(36).substring(2, 12).toUpperCase();
        while (await databaseCalls.getFeedback(ID))
            ID = Math.random().toString(36).substring(2, 12).toUpperCase();

        const IP = context.headers["X-Forwarded-For"].split(",")[0];
        const feedback = {
            ID,
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

            switch (args.reportingObjectType) {
                case "Node":
                    databaseCalls
                        .getNode(args.reportingObjectID)
                        .then((reporting) => {
                            if (
                                reporting.hidden === undefined ||
                                reporting.hidden === null
                            )
                                reporting.hidden = true;
                            databaseCalls.addNode(reporting);
                        });
                    break;
                case "Choice":
                    databaseCalls
                        .getChoice(args.reportingObjectID)
                        .then((reporting) => {
                            if (
                                reporting.hidden === undefined ||
                                reporting.hidden === null
                            )
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
    removeAllFeedback: async (parent, args) => {
        const allFeedback = await databaseCalls.allFeedback();

        if (
            args.reportingObjectID !== undefined &&
            args.reportingObjectType === undefined
        ) {
            throw new UserInputError(
                "Invalid input, make sure you report both object type and ID",
                {
                    invalidArgs: Object.keys(args),
                }
            );
        }

        allFeedback.forEach((feedback) => {
            // accountScreenName: String, reportingObjectType: String, reportingObjectID: String, info: String
            if (
                args.accountScreenName &&
                feedback.submittedBy !== args.accountScreenName
            )
                return;
            if (
                args.reportingObjectType &&
                (feedback.reporting === undefined ||
                    feedback.reporting.type !== args.reportingObjectType)
            )
                return;
            if (
                args.reportingObjectID &&
                (feedback.reporting === undefined ||
                    feedback.reporting.ID !== args.reportingObjectType)
            )
                return;
            if (args.info && feedback.info !== args.info) return;
            databaseCalls.removeFeedback(feedback.ID);
        });
        return true;
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

        if (!account.notifications) account.notifications = [];

        const newNotification = {
            time: new Date().getTime(),
            content: args.content,
            link: args.link,
            seen: false,
        };

        account.notifications = [
            newNotification,
            ...account.notifications,
        ].slice(0, MAX_NOTIFICATIONS);
        if (!parent) databaseCalls.addAccount(account);

        return newNotification;
    },
    removeNotification: async (parent, args) => {
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

        if (!account.notifications) account.notifications = [];

        if (!account.notifications[args.index]) return false;

        account.notifications = [
            ...account.notifications.slice(0, args.index),
            ...account.notifications.slice(args.index + 1),
        ];
        databaseCalls.addAccount(account);

        return true;
    },
    seeNotification: async (parent, args) => {
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

        if (!account.notifications) account.notifications = [];

        if (args.index === -1) {
            for (const notification of account.notifications) {
                notification.seen = true;
            }
        } else if (!account.notifications[args.index]) return false;
        else {
            if (args.force === undefined)
                account.notifications[args.index].seen =
                    !account.notifications[args.index].seen;
            else account.notifications[args.index].seen = args.force;
        }
        databaseCalls.addAccount(account);

        return true;
    },
    clearNotifications: async (parent, args) => {
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

        if (args.onlyClearSeen && account.notifications)
            account.notifications = account.notifications.filter(
                (notification) => !notification.seen
            );
        else account.notifications = [];
        databaseCalls.addAccount(account);

        return true;
    },
};

module.exports = { MutationResolvers, updateTime };
