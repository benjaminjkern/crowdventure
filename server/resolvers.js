const { databaseCalls } = require("./databaseCalls.js");
const { UserInputError } = require("apollo-server-lambda");

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

// ABSOLUTELY FIX THIS AT SOME POINT BUT WHATEVER
const encrypt = (word) => word;

// lil quick sort its neat
const sort = (list, compFunc) => {
    if (list.length === 0) return [];
    const tail = list.slice(1);
    let before = [],
        same = [],
        after = [];
    tail.forEach((item) => {
        switch (compFunc(item, list[0])) {
            case -1:
                before.push(item);
                break;
            case 0:
                same.push(item);
                break;
            case 1:
                after.push(item);
                break;
        }
    });

    return [
        ...sort(before, compFunc),
        list[0],
        ...same,
        ...sort(after, compFunc),
    ];
};

const allConnected = async(node, visited = {}) => {
    const children = await resolvers.Node.canonChoices(node).then((choices) =>
        Promise.all(choices.map((choice) => resolvers.Choice.to(choice)))
    );
    let newVisited = {...visited, [node.ID]: node.ID };

    for (let childKey in children) {
        const child = children[childKey];
        if (!newVisited[child.ID] && !child.featured)
            newVisited = {
                ...newVisited,
                ...(await allConnected(child, newVisited)),
            };
    }
    return newVisited;
};

const resolvers = {
    Account: {
        nodes: async(parent, args, context, info) => {
            console.log(`Retrieving nodes owned by ${parent.screenName}`);
            return await Promise.all(
                    parent.nodes.map((id) => databaseCalls.getNode(id))
                )
                .then((nodes) =>
                    nodes.map((node) => ({...node, views: resolvers.Node.views(node) }))
                )
                .then((nodes) =>
                    sort(nodes, (a, b) => {
                        if (a.featured) return b.featured ? 0 : -1;
                        if (b.featured) return 1;
                        return a.views === b.views ? 0 : a.views > b.views ? -1 : 1;
                    })
                );
        },
        suggestedChoices: async(parent, args, context, info) => {
            console.log(`Retrieving choices suggested by ${parent.screenName}`);
            return await Promise.all(
                parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
            );
        },
        totalNodeViews: async(parent, args, context, info) => {
            console.log(
                `Retrieving total views of all nodes owned by ${parent.screenName}`
            );
            return await Promise.all(
                parent.nodes.map((id) => databaseCalls.getNode(id))
            ).then((nodes) =>
                nodes
                .map((node) => resolvers.Node.views(node))
                .reduce((x, y) => x + y, 0)
            );
        },
        totalSuggestionScore: async(parent, args, context, info) => {
            console.log(
                `Retrieving total score of all choices suggested by ${parent.screenName}`
            );
            return parent.suggestedChoices ?
                await Promise.all(
                    parent.suggestedChoices.map((id) => databaseCalls.getChoice(id))
                ).then((choices) =>
                    choices
                    .map((choice) => resolvers.Choice.score(choice))
                    .reduce((x, y) => x + y, 0)
                ) :
                0;
        },
        featuredNodes: async(parent, args, context, info) => {
            console.log(`Retrieving featured nodes owned by ${parent.screenName}`);
            let allNodes = await resolvers.Account.nodes(parent);
            return await Promise.all(
                allNodes
                .filter((node) => node.featured)
                .map(async(node) => ({
                    ...node,
                    size: await resolvers.Node.size(node),
                }))
            );
        },
    },
    Node: {
        content: (parent, args, context, info) => {
            let IP = context.headers["X-Forwarded-For"].split(",")[0];
            if (!parent.views[IP]) {
                parent.views[IP] = IP;
                databaseCalls.addNode(parent);
            }
            return parent.content;
        },
        views: (parent, args, context, info) => {
            return typeof parent.views === "object" ?
                Object.keys(parent.views).length :
                parent.views;
        },
        owner: async(parent, args, context, info) => {
            console.log(`Retrieving owner of node ${parent.ID} (${parent.title})`);
            return await databaseCalls.getAccount(parent.owner);
        },
        canonChoices: async(parent, args, context, info) => {
            console.log(
                `Retrieving all canon choices from node ${parent.ID} (${parent.title})`
            );
            return await Promise.all(
                parent.canonChoices.map((id) => databaseCalls.getChoice(id))
            );
        },
        nonCanonChoices: async(parent, args, context, info) => {
            console.log(
                `Retrieving all non-canon choices from node ${parent.ID} (${parent.title})`
            );
            return await Promise.all(
                    parent.nonCanonChoices.map((id) => databaseCalls.getChoice(id))
                )
                .then((choices) =>
                    choices.map((choice) => ({
                        ...choice,
                        score: resolvers.Choice.score(choice),
                    }))
                )
                .then((choices) =>
                    sort(choices, (a, b) =>
                        a.score === b.score ? 0 : a.score > b.score ? -1 : 1
                    )
                );
        },
        // should return the total number of nodes it is connected to
        size: async(parent, args, context, info) => {
            console.log(
                `Retrieving size of story stemming from  from node ${parent.ID} (${parent.title})`
            );
            if (parent.size) return parent.size;
            return Object.keys(await allConnected(parent)).length;
        },
    },
    Choice: {
        from: async(parent, args, context, info) => {
            console.log(
                `Retrieving node from which choice ${parent.ID} (${parent.action}) was suggested`
            );
            return await databaseCalls.getNode(parent.from);
        },
        to: async(parent, args, context, info) => {
            console.log(
                `Retrieving node that a choice ${parent.ID} (${parent.action}) goes to`
            );
            return await databaseCalls.getNode(parent.to);
        },
        suggestedBy: async(parent, args, context, info) => {
            console.log(
                `Retrieving account that suggested choice ${parent.ID} (${parent.action})`
            );
            return await databaseCalls.getAccount(parent.suggestedBy);
        },
        likes: (parent, args, context, info) => {
            console.log(`Retrieving likes of choice ${parent.ID} (${parent.action})`);
            return Object.keys(parent.likedBy).length;
        },
        dislikes: (parent, args, context, info) => {
            console.log(
                `Retrieving dislikes of choice ${parent.ID} (${parent.action})`
            );
            return Object.keys(parent.dislikedBy).length;
        },
        score: (parent, args, context, info) => {
            console.log(`Retrieving score of choice ${parent.ID} (${parent.action})`);
            return (
                parent.score ||
                resolvers.Choice.likes(parent) - resolvers.Choice.dislikes(parent)
            );
        },
        likedBy: async(parent, args, context, info) => {
            console.log(
                `Retrieving all accounts that liked ${parent.ID} (${parent.action})`
            );
            return await Promise.all(
                Object.keys(parent.likedBy).map((accountScreenName) =>
                    databaseCalls.getAccount(accountScreenName)
                )
            );
        },
        dislikedBy: async(parent, args, context, info) => {
            console.log(
                `Retrieving all accounts that disliked ${parent.ID} (${parent.action})`
            );
            return await Promise.all(
                Object.keys(parent.dislikedBy).map((accountScreenName) =>
                    databaseCalls.getAccount(accountScreenName)
                )
            );
        },
    },
    Query: {
        featuredNodes: async() => await databaseCalls.filterFeatured(),
        allAccounts: async() => await databaseCalls.allAccounts(),
        allNodes: async() => await databaseCalls.allNodes(),
        allChoices: async() => await databaseCalls.allChoices(),
        getAccount: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.screenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let { encryptedPassword, lastIP, ...smallAccount } = account;
            // return everything except last IP and encrypted password since graphql cant do anything with those anyways
            return smallAccount;
        },
        getNode: async(parent, args, context, info) =>
            await databaseCalls.getNode(args.ID),
        getChoice: async(parent, args, context, info) =>
            await databaseCalls.getChoice(args.ID),
        searchAccounts: async(parent, args, context, info) => {
            // these can absolutely be made better than just grabbing the entire database and searching here
            console.log(`Searching for ${args.type}: ${args.query} in accounts`);
            if (!args.query) return [];
            return (await databaseCalls.allAccounts()).filter((account) =>
                account[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
        searchNodes: async(parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in nodes`);
            if (!args.query) return [];
            return (await databaseCalls.allNodes()).filter((node) =>
                node[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
        searchChoices: async(parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in choices`);
            if (!args.query) return [];
            return (await databaseCalls.allChoices()).filter((choice) =>
                choice[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
    },
    Mutation: {
        createAccount: async(parent, args, context, info) => {
            console.log(`Creating new account with name ${args.screenName}`);
            if (!args.screenName)
                throw new UserInputError(`ScreenName cannot be empty!`, {
                    invalidArgs: Object.keys(args),
                });
            if (!args.password)
                throw new UserInputError(`Password cannot be empty!`, {
                    invalidArgs: Object.keys(args),
                });
            if (await databaseCalls.getAccount(args.screenName))
                throw new UserInputError(`That screen name already exists!`, {
                    invalidArgs: Object.keys(args),
                });
            let IP = context.headers["X-Forwarded-For"].split(",")[0];
            return await databaseCalls.addAccount({
                screenName: args.screenName,
                bio: args.bio,
                encryptedPassword: encrypt(args.password),
                lastIP: IP,
                profilePicURL: args.profilePicURL,
                nodes: [],
                suggestedChoices: [],
                liked: {},
                disliked: {},
            });
        },
        deleteAccount: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.screenName);

            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(`Deleting Account ${account.screenName}`);
            // again, not really checking or caring if these work for now
            // I only care about it not returning promises for now
            account.suggestedChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            account.nodes.forEach((nodeID) =>
                resolvers.Mutation.deleteNode(undefined, { nodeID })
            );

            return await databaseCalls.removeAccount(account.screenName);
        },
        editAccount: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.screenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(`Editing Account ${account.screenName}`);

            if (args.password) account.encryptedPassword = encrypt(args.password);
            if (args.bio) account.bio = args.bio;
            if (args.profilePicURL) account.profilePicURL = args.profilePicURL;

            return await databaseCalls.addAccount(account);
        },
        loginAccount: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.screenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let IP = context.headers["X-Forwarded-For"].split(",")[0];
            if (args.password && encrypt(args.password) === account.encryptedPassword)
                account.lastIP = IP;
            if (account.lastIP === IP) return await databaseCalls.addAccount(account);
            return null;
        },
        createNode: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(
                `Creating new node with title ${args.title} and owner ${account.screenName}`
            );
            if (!args.title)
                throw new UserInputError(`Title cannot be empty!`, {
                    invalidArgs: Object.keys(args),
                });
            if (!args.content)
                throw new UserInputError(`Content cannot be empty!`, {
                    invalidArgs: Object.keys(args),
                });
            let newNode = {
                ID: Math.random().toString(36).substring(2, 12).toUpperCase(),
                owner: args.accountScreenName,
                title: args.title,
                content: args.content,
                pictureURL: args.pictureURL,
                fgColor: args.fgColor || "auto",
                bgColor: args.fgColor || "white",
                featured: args.featured || false,
                views: {},
                canonChoices: [],
                nonCanonChoices: [],
            };
            account.nodes.push(newNode.ID);
            databaseCalls.addAccount(account);
            return await databaseCalls.addNode(newNode);
        },
        deleteNode: async(parent, args, context, info) => {
            let node = await databaseCalls.getNode(args.nodeID);
            if (!node)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            let account = await databaseCalls.getAccount(node.owner);

            console.log(`Deleting node ${node.ID} (${node.title})`);

            node.canonChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            node.nonCanonChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );

            if (account) {
                account.nodes = account.nodes.filter((nodeID) => nodeID !== node.ID);
                databaseCalls.addAccount(account);
            }

            return await databaseCalls.removeNode(node.ID);
        },
        editNode: async(parent, args, context, info) => {
            let node = await databaseCalls.getNode(args.nodeID);
            if (!node)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(`Editing node ${node.ID} (${node.title})`);

            if (args.title) node.title = args.title;
            if (args.content) node.content = args.content;
            if (args.pictureURL) node.pictureURL = args.pictureURL;
            if (args.bgColor) node.bgColor = args.bgColor;
            if (args.fgColor) node.fgColor = args.fgColor;
            if (args.featured !== undefined) node.featured = args.featured;

            return await databaseCalls.addNode(node);
        },
        suggestChoice: async(parent, args, context, info) => {
            let account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            let node = await databaseCalls.getNode(args.fromID);
            if (!node)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            let toNode = await databaseCalls.getNode(args.toID);
            if (!toNode)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(
                `${account.screenName} is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`
            );
            if (!args.action)
                throw new UserInputError(`Action cannot be empty!`, {
                    invalidArgs: Object.keys(args),
                });

            let newChoice = {
                ID: `${node.ID}-${Math.random().toString(36).substring(2, 12)}`,
                from: node.ID,
                action: args.action,
                to: toNode.ID,
                likedBy: {},
                dislikedBy: {},
                suggestedBy: account.screenName,
            };

            account.suggestedChoices.push(newChoice.ID);

            if (account.screenName === node.owner)
                node.canonChoices.push(newChoice.ID);
            else node.nonCanonChoices.push(newChoice.ID);

            databaseCalls.addAccount(account);
            databaseCalls.addNode(node);
            return await databaseCalls.addChoice(newChoice);
        },
        editSuggestion: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That choice doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

            if (args.toID) choice.toID = args.toID;
            if (args.action) choice.action = args.action;

            return await databaseCalls.addChoice(choice);
        },
        removeSuggestion: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That choice doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let account = await databaseCalls.getAccount(choice.suggestedBy);
            let node = await databaseCalls.getNode(choice.from);

            console.log(`Removing suggestion ${choice.ID} (${choice.action})`);

            if (account) {
                account.suggestedChoices = account.suggestedChoices.filter(
                    (choiceID) => choiceID !== choice.ID
                );
                databaseCalls.addAccount(account);
            }
            if (node) {
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
        makeCanon: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That choice doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let node = await databaseCalls.getNode(choice.from);
            if (!node)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(
                `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) canon`
            );

            node.canonChoices.push(choice.ID);
            node.canonChoices = node.canonChoices.filter(
                (item, pos) => node.canonChoices.indexOf(item) === pos
            );
            node.nonCanonChoices = node.nonCanonChoices.filter(
                (id) => id !== choice.ID
            );

            databaseCalls.addNode(node);
            return choice;
        },
        makeNonCanon: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That choice doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let node = await databaseCalls.getNode(choice.from);
            if (!node)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            console.log(
                `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) non-canon`
            );

            node.nonCanonChoices.push(choice.ID);
            node.nonCanonChoices = node.nonCanonChoices.filter(
                (item, pos) => node.nonCanonChoices.indexOf(item) === pos
            );
            node.canonChoices = node.canonChoices.filter((id) => id !== choice.ID);

            databaseCalls.addNode(node);
            return choice;
        },
        likeSuggestion: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That node doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            let account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
            console.log(
                `${account.screenName} is liking choice ${choice.ID} (${choice.action})`
            );

            delete choice.dislikedBy[account.screenName];

            if (!choice.likedBy[account.screenName])
                choice.likedBy[account.screenName] = account.screenName;
            else delete choice.likedBy[account.screenName];

            databaseCalls.addAccount(account);
            return await databaseCalls.addChoice(choice);
        },
        dislikeSuggestion: async(parent, args, context, info) => {
            let choice = await databaseCalls.getChoice(args.choiceID);
            if (!choice)
                throw new UserInputError(`That choice doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });

            let account = await databaseCalls.getAccount(args.accountScreenName);
            if (!account)
                throw new UserInputError(`That account doesnt exist!`, {
                    invalidArgs: Object.keys(args),
                });
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
    },
};

module.exports = { resolvers };