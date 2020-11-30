const { UserInputError } = require('apollo-server-lambda');
const { databaseCalls } = require('./databaseCalls.js');
const { encrypt } = require('./resolverUtils.js');
const AccountResolvers = require('./accountResolvers.js');

const MutationResolvers = {
    createAccount: async(parent, args, context, info) => {
        console.log(`Creating new account with name ${args.screenName}`);
        if (!args.screenName) {
            throw new UserInputError('ScreenName cannot be empty!', {
                invalidArgs: Object.keys(args),
            });
        }
        if (!args.password) {
            throw new UserInputError('Password cannot be empty!', {
                invalidArgs: Object.keys(args),
            });
        }
        if (await databaseCalls.getAccount(args.screenName)) {
            throw new UserInputError('That screen name already exists!', {
                invalidArgs: Object.keys(args),
            });
        }
        const IP = context.headers['X-Forwarded-For'].split(',')[0];
        return await databaseCalls.addAccount({
            screenName: args.screenName,
            bio: args.bio,
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
    deleteAccount: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.screenName);

        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Deleting Account ${account.screenName}`);
        // again, not really checking or caring if these work for now
        // I only care about it not returning promises for now
        account.suggestedChoices.forEach((choiceID) => MutationResolvers.removeSuggestion(undefined, { choiceID }));
        account.nodes.forEach((nodeID) => MutationResolvers.deleteNode(undefined, { nodeID }));

        return await databaseCalls.removeAccount(account.screenName);
    },
    editAccount: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing Account ${account.screenName}`);

        if (args.newPassword) account.encryptedPassword = encrypt(args.newPassword);
        if (args.bio) account.bio = args.bio;
        if (args.profilePicURL) account.profilePicURL = args.profilePicURL;
        if (args.hidden !== undefined) account.hidden = args.hidden;
        if (args.newScreenName) {
            if (await databaseCalls.getAccount(args.newScreenName)) {
                throw new UserInputError('That account already exists!', {
                    invalidArgs: Object.keys(args),
                });
            }
            const nodes = await AccountResolvers.nodes(account);
            nodes.forEach((node) => databaseCalls.addNode({...node, owner: args.newScreenName }));
            const choices = await AccountResolvers.suggestedChoices(account);
            choices.forEach((choice) => {
                const newLikes = choice.likedBy;
                if (newLikes[account.screenName]) {
                    delete newLikes[account.screenName];
                    newLikes[args.newScreenName] = args.newScreenName;
                }
                const newDislikes = choice.dislikedBy;
                if (newDislikes[account.screenName]) {
                    delete newDislikes[account.screenName];
                    newDislikes[args.newScreenName] = args.newScreenName;
                }
                databaseCalls.addChoice({
                    ...choice,
                    suggestedBy: args.newScreenName,
                    likedBy: newLikes,
                    dislikedBy: newDislikes,
                });
            });
            account.screenName = args.newScreenName;
        }

        return await databaseCalls.addAccount(account);
    },
    loginAccount: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const IP = context.headers['X-Forwarded-For'].split(',')[0];
        if (args.password && encrypt(args.password) === account.encryptedPassword) account.lastIP = IP;
        if (account.lastIP === IP) return await databaseCalls.addAccount(account);
        return null;
    },
    createNode: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Creating new node with title ${args.title} and owner ${account.screenName}`,
        );
        if (!args.title) {
            throw new UserInputError('Title cannot be empty!', {
                invalidArgs: Object.keys(args),
            });
        }
        if (!args.content) {
            throw new UserInputError('Content cannot be empty!', {
                invalidArgs: Object.keys(args),
            });
        }
        const newNode = {
            ID: Math.random().toString(36).substring(2, 12).toUpperCase(),
            owner: args.accountScreenName,
            title: args.title,
            content: args.content,
            pictureURL: args.pictureURL,
            fgColor: args.fgColor || 'auto',
            bgColor: args.fgColor || 'white',
            featured: args.featured || false,
            hidden: args.hidden || undefined,
            dateCreated: new Date().toJSON(),
            views: {},
            canonChoices: [],
            nonCanonChoices: [],
        };
        account.nodes.push(newNode.ID);
        databaseCalls.addAccount(account);
        return await databaseCalls.addNode(newNode);
    },
    deleteNode: async(parent, args, context, info) => {
        const node = await databaseCalls.getNode(args.nodeID);
        if (!node) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        const account = await databaseCalls.getAccount(node.owner);

        console.log(`Deleting node ${node.ID} (${node.title})`);

        node.canonChoices.forEach((choiceID) => MutationResolvers.removeSuggestion(undefined, { choiceID }));
        node.nonCanonChoices.forEach((choiceID) => MutationResolvers.removeSuggestion(undefined, { choiceID }));

        if (account) {
            account.nodes = account.nodes.filter((nodeID) => nodeID !== node.ID);
            databaseCalls.addAccount(account);
        }

        return await databaseCalls.removeNode(node.ID);
    },
    editNode: async(parent, args, context, info) => {
        const node = await databaseCalls.getNode(args.nodeID);
        if (!node) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing node ${node.ID} (${node.title})`);

        if (args.title) node.title = args.title;
        if (args.content) node.content = args.content;
        if (args.pictureURL) node.pictureURL = args.pictureURL;
        if (args.bgColor) node.bgColor = args.bgColor;
        if (args.fgColor) node.fgColor = args.fgColor;
        if (args.hidden !== undefined) node.hidden = args.hidden;
        if (args.featured !== undefined) node.featured = args.featured;

        return await databaseCalls.addNode(node);
    },
    suggestChoice: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        const node = await databaseCalls.getNode(args.fromID);
        if (!node) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        const toNode = await databaseCalls.getNode(args.toID);
        if (!toNode) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `${account.screenName} is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`,
        );
        if (!args.action) {
            throw new UserInputError('Action cannot be empty!', {
                invalidArgs: Object.keys(args),
            });
        }

        const newChoice = {
            ID: `${node.ID}-${Math.random().toString(36).substring(2, 12)}`,
            from: node.ID,
            action: args.action,
            dateCreated: new Date().toJSON(),
            to: toNode.ID,
            likedBy: {},
            dislikedBy: {},
            suggestedBy: account.screenName,
        };

        account.suggestedChoices.push(newChoice.ID);

        if (account.screenName === node.owner) node.canonChoices.push(newChoice.ID);
        else node.nonCanonChoices.push(newChoice.ID);

        databaseCalls.addAccount(account);
        databaseCalls.addNode(node);
        return await databaseCalls.addChoice(newChoice);
    },
    editSuggestion: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That choice doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

        if (args.toID) choice.to = args.toID;
        if (args.action) choice.action = args.action;
        if (args.hidden !== undefined) choice.hidden = args.hidden;

        return await databaseCalls.addChoice(choice);
    },
    removeSuggestion: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That choice doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const account = await databaseCalls.getAccount(choice.suggestedBy);
        const node = await databaseCalls.getNode(choice.from);

        console.log(`Removing suggestion ${choice.ID} (${choice.action})`);

        if (account) {
            account.suggestedChoices = account.suggestedChoices.filter(
                (choiceID) => choiceID !== choice.ID,
            );
            databaseCalls.addAccount(account);
        }
        if (node) {
            node.canonChoices = node.canonChoices.filter(
                (choiceID) => choiceID !== choice.ID,
            );
            node.nonCanonChoices = node.nonCanonChoices.filter(
                (choiceID) => choiceID !== choice.ID,
            );
            databaseCalls.addNode(node);
        }
        return await databaseCalls.removeChoice(choice.ID);
    },
    makeCanon: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That choice doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const node = await databaseCalls.getNode(choice.from);
        if (!node) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) canon`,
        );

        node.canonChoices.push(choice.ID);
        node.canonChoices = node.canonChoices.filter(
            (item, pos) => node.canonChoices.indexOf(item) === pos,
        );
        node.nonCanonChoices = node.nonCanonChoices.filter(
            (id) => id !== choice.ID,
        );

        databaseCalls.addNode(node);
        return choice;
    },
    makeNonCanon: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That choice doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const node = await databaseCalls.getNode(choice.from);
        if (!node) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        console.log(
            `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) non-canon`,
        );

        node.nonCanonChoices.push(choice.ID);
        node.nonCanonChoices = node.nonCanonChoices.filter(
            (item, pos) => node.nonCanonChoices.indexOf(item) === pos,
        );
        node.canonChoices = node.canonChoices.filter((id) => id !== choice.ID);

        databaseCalls.addNode(node);
        return choice;
    },
    likeSuggestion: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That node doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        console.log(
            `${account.screenName} is liking choice ${choice.ID} (${choice.action})`,
        );

        delete choice.dislikedBy[account.screenName];

        if (!choice.likedBy[account.screenName]) choice.likedBy[account.screenName] = account.screenName;
        else delete choice.likedBy[account.screenName];

        databaseCalls.addAccount(account);
        return await databaseCalls.addChoice(choice);
    },
    dislikeSuggestion: async(parent, args, context, info) => {
        const choice = await databaseCalls.getChoice(args.choiceID);
        if (!choice) {
            throw new UserInputError('That choice doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }

        const account = await databaseCalls.getAccount(args.accountScreenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        console.log(
            `${account.screenName} is disliking choice ${choice.ID} (${choice.action})`,
        );

        delete choice.likedBy[account.screenName];

        if (!choice.dislikedBy[account.screenName]) choice.dislikedBy[account.screenName] = account.screenName;
        else delete choice.dislikedBy[account.screenName];

        databaseCalls.addAccount(account);
        return await databaseCalls.addChoice(choice);
    },
    createFeedback: async(parent, args, context, info) => {
        let account;
        if (args.accountScreenName) {
            account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account) {
                throw new UserInputError('That account doesnt exist!', {
                    invalidArgs: Object.keys(args),
                });
            }
        }

        if (
            (args.reportingObjectType !== undefined) !==
            (args.reportingObjectID !== undefined)
        ) {
            throw new UserInputError(
                'Invalid input, make sure you report both object type and ID', {
                    invalidArgs: Object.keys(args),
                },
            );
        }

        const IP = context.headers['X-Forwarded-For'].split(',')[0];
        const feedback = {
            ID: Math.random().toString(36).substring(2, 12).toUpperCase(),
            submittedBy: args.accountScreenName || '',
            IP,
            reporting: '',
            dateCreated: new Date().toJSON(),
            info: args.info,
        };

        if (args.reportingObjectType && args.reportingObjectID) {
            feedback.reporting = {
                type: args.reportingObjectType,
                ID: args.reportingObjectID,
            };

            switch (args.reportingObjectType) {
                case 'Node':
                    databaseCalls.getNode(args.reportingObjectID).then((reporting) => {
                        if (reporting.hidden === undefined || reporting.hidden === null) reporting.hidden = true;
                        databaseCalls.addNode(reporting);
                    });
                    break;
                case 'Choice':
                    databaseCalls.getChoice(args.reportingObjectID).then((reporting) => {
                        if (reporting.hidden === undefined || reporting.hidden === null) reporting.hidden = true;
                        databaseCalls.addChoice(reporting);
                    });
                    break;
                case 'Account':
                    databaseCalls.getAccount(args.reportingObjectID).then((reporting) => {
                        if (reporting.hidden === undefined || reporting.hidden === null) reporting.hidden = true;
                        databaseCalls.addAccount(reporting);
                    });
                    break;
            }
        }
        return await databaseCalls.addFeedback(feedback);
    },
    removeFeedback: async(parent, args, context, info) => {
        const feedback = await databaseCalls.getFeedback(args.feedbackID);
        if (!feedback) {
            throw new UserInputError('That feedback doesn\'t exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        return await databaseCalls.removeFeedback(feedback.ID);
    },
    removeAllFeedback: async(parent, args, context, info) => {
        const allFeedback = await databaseCalls.allFeedback();

        if (args.reportingObjectID !== undefined && args.reportingObjectType === undefined) {
            throw new UserInputError(
                'Invalid input, make sure you report both object type and ID', {
                    invalidArgs: Object.keys(args),
                },
            );
        }

        allFeedback.forEach((feedback) => {
            // accountScreenName: String, reportingObjectType: String, reportingObjectID: String, info: String
            if (args.accountScreenName && feedback.submittedBy !== args.accountScreenName) return;
            if (args.reportingObjectType && (feedback.reporting === undefined || feedback.reporting.type !== args.reportingObjectType)) return;
            if (args.reportingObjectID && (feedback.reporting === undefined || feedback.reporting.ID !== args.reportingObjectType)) return;
            if (args.info && feedback.info !== args.info) return;
            databaseCalls.removeFeedback(feedback.ID);
        });
        return true;
    }
};

module.exports = MutationResolvers;