const { databaseCalls } = require("./databaseCalls.js");

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

const resolvers = {
    Account: {
        nodes: (parent, args, context, info) => {
            console.log(
                `Retrieving nodes owned by ${parent.ID} (${parent.screenName})`
            );
            return parent.nodes.map((id) => databaseCalls.getNode(id));
        },
        suggestedChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving choices suggested by ${parent.ID} (${parent.screenName})`
            );
            return parent.suggestedChoices.map((id) => databaseCalls.getChoice(id));
        },
        totalNodeViews: (parent, args, context, info) => {
            console.log(
                `Retrieving total views of all nodes owned by ${parent.ID} (${parent.screenName})`
            );
            return parent.nodes
                .map((id) => databaseCalls.getNode(id).views)
                .reduce((x, y) => x + y, 0);
        },
        totalSuggestionScore: (parent, args, context, info) => {
            console.log(
                `Retrieving total score of all choices suggested by ${parent.ID} (${parent.screenName})`
            );
            return parent.suggestedChoices ?
                parent.suggestedChoices
                .map((id) => resolvers.Choice.score(databaseCalls.getChoice(id)))
                .reduce((x, y) => x + y, 0) :
                0;
        },
        liked: (parent, args, context, info) => {
            console.log(
                `Retrieving all nodes liked by ${parent.ID} (${parent.screenName})`
            );
            return Object.keys(parent.liked).map((id) => databaseCalls.getNode(id));
        },
        disliked: (parent, args, context, info) => {
            console.log(
                `Retrieving all nodes disliked by ${parent.ID} (${parent.screenName})`
            );
            return Object.keys(parent.disliked).map((id) =>
                databaseCalls.getNode(id)
            );
        },
    },
    Node: {
        content: (parent, args, context, info) => {
            parent.views++;
            databaseCalls.addNode(parent);
            return parent.content;
        },
        owner: (parent, args, context, info) => {
            console.log(`Retrieving owner of node ${parent.ID} (${parent.title})`);
            return databaseCalls.getAccount(parent.owner);
        },
        canonChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving all canon choices from node ${parent.ID} (${parent.title})`
            );
            return parent.canonChoices.map((id) => databaseCalls.getChoice(id));
        },
        nonCanonChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving all non-canon choices from node ${parent.ID} (${parent.title})`
            );
            return parent.nonCanonChoices.map((id) => databaseCalls.getChoice(id));
        },
    },
    Choice: {
        from: (parent, args, context, info) => {
            console.log(
                `Retrieving node from which choice ${parent.ID} (${parent.action}) was suggested`
            );
            return databaseCalls.getNode(parent.from);
        },
        to: (parent, args, context, info) => {
            console.log(
                `Retrieving node that a choice ${parent.ID} (${parent.action}) goes to`
            );
            return databaseCalls.getNode(parent.to);
        },
        suggestedBy: (parent, args, context, info) => {
            console.log(
                `Retrieving account that suggested choice ${parent.ID} (${parent.action})`
            );
            return databaseCalls.getAccount(parent.suggestedBy);
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
            return resolvers.Choice.likes(parent) - resolvers.Choice.dislikes(parent);
        },
        likedBy: (parent, args, context, info) => {
            console.log(
                `Retrieving all accounts that liked ${parent.ID} (${parent.action})`
            );
            return Object.keys(parent.likedBy).map((accountID) =>
                databaseCalls.getAccount(accountID)
            );
        },
        dislikedBy: (parent, args, context, info) => {
            console.log(
                `Retrieving all accounts that disliked ${parent.ID} (${parent.action})`
            );
            return Object.keys(parent.dislikedBy).map((accountID) =>
                databaseCalls.getAccount(accountID)
            );
        },
    },
    Query: {
        allAccounts: () => Object.values(databaseCalls.allAccounts()),
        allNodes: () => Object.values(databaseCalls.allNodes()),
        allChoices: () => Object.values(databaseCalls.allChoices()),
        getAccount: (parent, args, context, info) =>
            databaseCalls.getAccount(args.ID),
        getNode: (parent, args, context, info) => databaseCalls.getNode(args.ID),
        getChoice: (parent, args, context, info) =>
            databaseCalls.getChoice(args.ID),
        searchAccounts: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in accounts`);
            if (!args.query) return [];
            return Object.values(databaseCalls.allAccounts()).filter((account) =>
                account[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
        searchNodes: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in nodes`);
            if (!args.query) return [];
            return Object.values(databaseCalls.allNodes()).filter((node) =>
                node[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
        searchChoices: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in choices`);
            if (!args.query) return [];
            return Object.values(databaseCalls.allChoices()).filter((choice) =>
                choice[args.type].toLowerCase().includes(args.query.toLowerCase())
            );
        },
    },
    Mutation: {
        createAccount: (parent, args, context, info) => {
            console.log(`Creating new account with name ${args.screenName}`);
            return databaseCalls.addAccount({
                ID: Math.random().toString(36).substring(2, 12),
                screenName: args.screenName,
                nodes: [],
                suggestedChoices: [],
                liked: {},
                disliked: {},
            });
        },
        deleteAccount: (parent, args, context, info) => {
            let account = databaseCalls.getAccount(args.accountID);
            console.log(`Deleting Account ${account.ID} (${account.screenName})`);
            account.suggestedChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            account.nodes.forEach((nodeID) =>
                resolvers.Mutation.deleteNode(undefined, { nodeID })
            );

            databaseCalls.removeAccount(account.ID);
        },
        createNode: (parent, args, context, info) => {
            let account = databaseCalls.getAccount(args.accountID);
            console.log(
                `Creating new node with title ${args.title} and owner ${account.ID} (${account.screenName})`
            );
            let newNode = {
                ID: Math.random().toString(36).substring(2, 6).toUpperCase(),
                owner: args.accountID,
                title: args.title,
                content: args.content,
                views: 0,
                canonChoices: [],
                nonCanonChoices: [],
            };
            account.nodes.push(newNode.ID);
            databaseCalls.addAccount(account);
            return databaseCalls.addNode(newNode);
        },
        deleteNode: (parent, args, context, info) => {
            let node = databaseCalls.getNode(args.nodeID);
            let account = databaseCalls.getAccount(node.owner);

            console.log(`Deleting node ${node.ID} (${node.title})`);

            node.canonChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            node.nonCanonChoices.forEach((choiceID) =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );

            databaseCalls.removeNode(node.ID);

            account.nodes = account.nodes.filter((nodeID) => nodeID !== node.ID);
            databaseCalls.addAccount(account);
        },
        editNode: (parent, args, context, info) => {
            let node = databaseCalls.getNode(args.nodeID);

            console.log(`Editing node ${node.ID} (${node.title})`);

            if (args.title) node.title = args.title;
            if (args.content) node.content = args.content;

            return databaseCalls.addNode(node);
        },
        deleteEmptyNodes: (parent, args, context, info) => {
            console.log(`Deleting all empty nodes`);
            const nodes = Object.values(databaseCalls.allNodes());
            nodes.forEach((node) => {
                if (!node.title && !node.content)
                    resolvers.Mutation.deleteNode(undefined, { nodeID: node.ID });
            });
            return true;
        },
        suggestChoice: (parent, args, context, info) => {
            let account = databaseCalls.getAccount(args.accountID);
            let node = databaseCalls.getNode(args.fromID);
            let toNode = databaseCalls.getNode(args.toID);

            console.log(
                `${account.ID} (${account.screenName}) is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`
            );

            let newChoice = {
                ID: `${node.ID}-${Math.random().toString().substring(2, 6)}`,
                from: node.ID,
                action: args.action,
                to: toNode.ID,
                likedBy: {},
                dislikedBy: {},
                suggestedBy: account.ID,
            };

            account.suggestedChoices.push(newChoice.ID);

            if (account.ID === node.owner) node.canonChoices.push(newChoice.ID);
            else node.nonCanonChoices.push(newChoice.ID);

            databaseCalls.addAccount(account);
            databaseCalls.addNode(node);
            return databaseCalls.addChoice(newChoice);
        },
        editSuggestion: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);

            console.log(`Editing suggestion ${choice.ID} (${choice.action})`);

            if (args.toID) choice.toID = args.toID;
            if (args.action) choice.action = args.action;

            return databaseCalls.addChoice(choice);
        },
        removeSuggestion: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let account = databaseCalls.getAccount(choice.suggestedBy);

            console.log(`Removing suggestion ${choice.ID} (${choice.action})`);

            account.suggestedChoices = account.suggestedChoices.filter(
                (choiceID) => choiceID !== choice.ID
            );

            databaseCalls.addAccount(account);
            databaseCalls.removeChoice(choice.ID);
        },
        makeCanon: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let node = databaseCalls.getNode(choice.from);

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
        makeNonCanon: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let node = databaseCalls.getNode(choice.from);

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
        likeSuggestion: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let account = databaseCalls.getAccount(args.accountID);
            console.log(
                `${account.screenName} (${account.ID}) is liking choice ${choice.ID} (${choice.action})`
            );
            delete choice.dislikedBy[account.ID];
            delete account.disliked[choice.ID];

            if (!choice.likedBy[account.ID]) {
                choice.likedBy[account.ID] = account.ID;
                account.liked[choice.ID] = choice.ID;
            } else {
                delete choice.likedBy[account.ID];
                delete account.liked[choice.ID];
            }
            databaseCalls.addAccount(account);
            return databaseCalls.addChoice(choice);
        },
        dislikeSuggestion: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let account = databaseCalls.getAccount(args.accountID);
            console.log(
                `${account.screenName} (${account.ID}) is disliking choice ${choice.ID} (${choice.action})`
            );
            delete choice.likedBy[account.ID];
            delete account.liked[choice.ID];

            if (!choice.dislikedBy[account.ID]) {
                choice.dislikedBy[account.ID] = account.ID;
                account.disliked[choice.ID] = choice.ID;
            } else {
                delete choice.dislikedBy[account.ID];
                delete account.disliked[choice.ID];
            }
            databaseCalls.addAccount(account);
            return databaseCalls.addChoice(choice);
        },
    },
};

module.exports = { resolvers };