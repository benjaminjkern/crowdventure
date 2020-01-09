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
            return parent.nodes.map(id => databaseCalls.getNode(id));
        },
        suggestedChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving choices suggested by ${parent.ID} (${parent.screenName})`
            );
            return parent.suggestedChoices.map(id => databaseCalls.getChoice(id));
        },
        totalNodeViews: (parent, args, context, info) => {
            console.log(
                `Retrieving total views of all nodes owned by ${parent.ID} (${parent.screenName})`
            );
            return parent.nodes
                .map(id => databaseCalls.getNode(id).views)
                .reduce((x, y) => x + y);
        },
        totalSuggestionScore: (parent, args, context, info) => {
            console.log(
                `Retrieving total score of all choices suggested by ${parent.ID} (${parent.screenName})`
            );
            return parent.suggestedChoices
                .map(id => resolvers.Choice.score(databaseCalls.getChoice(id)))
                .reduce((x, y) => x + y);
        }
    },
    Node: {
        owner: (parent, args, context, info) => {
            console.log(`Retrieving owner of node ${parent.ID} (${parent.title})`);
            return databaseCalls.getAccount(parent.owner);
        },
        canonChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving all canon choices from node ${parent.ID} (${parent.title})`
            );
            return parent.canonChoices.map(id => databaseCalls.getChoice(id));
        },
        nonCanonChoices: (parent, args, context, info) => {
            console.log(
                `Retrieving all non-canon choices from node ${parent.ID} (${parent.title})`
            );
            return parent.nonCanonChoices.map(id => databaseCalls.getChoice(id));
        }
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
        score: (parent, args, context, info) => {
            console.log(`Retrieving score of choice ${parent.ID} (${parent.action})`);
            return parent.likes - parent.dislikes;
        }
    },
    Query: {
        allAccounts: () => Object.values(databaseCalls.allAccounts()),
        allNodes: () => Object.values(databaseCalls.allNodes()),
        allChoices: () => Object.values(databaseCalls.allChoices()),
        searchAccounts: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in accounts`);
            // TODO: Implement!
        },
        searchNodes: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in nodes`);
            // TODO: Implement!
        },
        searchChoices: (parent, args, context, info) => {
            console.log(`Searching for ${args.type}: ${args.query} in choices`);
            // TODO: Implement!
        }
    },
    Mutation: {
        createAccount: (parent, args, context, info) => {
            console.log(`Creating new account with name ${args.screenName}`);
            return databaseCalls.addAccount({
                ID: Math.random()
                    .toString(36)
                    .substring(2, 12),
                screenName: args.screenName,
                nodes: [],
                suggestedChoices: []
            });
        },
        deleteAccount: (parent, args, context, info) => {
            let account = databaseCalls.getAccount(args.accountID);
            console.log(`Deleting Account ${account.ID} (${account.screenName})`);
            account.suggestedChoices.forEach(choiceID =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            account.nodes.forEach(nodeID =>
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
                ID: Math.random()
                    .toString(36)
                    .substring(2, 6)
                    .toUpperCase(),
                title: args.title,
                content: args.content,
                views: 0,
                canonChoices: [],
                nonCanonChoices: []
            };
            account.nodes.push(newNode.ID);
            databaseCalls.addAccount(account);
            return databaseCalls.addNode(newNode);
        },
        deleteNode: (parent, args, context, info) => {
            let node = databaseCalls.getNode(args.nodeID);
            let account = databaseCalls.getAccount(node.owner);

            console.log(`Deleting node ${node.ID} (${node.title})`);

            node.canonChoices.forEach(choiceID =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );
            node.nonCanonChoices.forEach(choiceID =>
                resolvers.Mutation.removeSuggestion(undefined, { choiceID })
            );

            databaseCalls.removeNode(node.ID);

            delete account.nodes[node.ID];
            databaseCalls.addAccount(account);
        },
        suggestChoice: (parent, args, context, info) => {
            let account = databaseCalls.getAccount(args.accountID);
            let node = databaseCalls.getNode(args.fromID);
            let toNode = databaseCalls.getNode(args.toID);

            console.log(
                `${account.ID} (${account.screenName}) is suggesting a new choice (${args.action}) to node ${node.ID} (${node.title}), which goes to node ${toNode.ID} (${toNode.title})`
            );

            let newChoice = {
                ID: `${node.ID}-${Math.random()
          .toString()
          .substring(2, 6)}`,
                from: node.ID,
                action: args.action,
                to: toNode.ID,
                likes: 0,
                dislikes: 0
            };
            if (account.ID === node.owner) node.canonChoices.push(newChoice.ID);
            else node.nonCanonChoices.push(newChoice.ID);

            databaseCalls.addNode(node);
            return databaseCalls.addChoice(newChoice);
        },
        removeSuggestion: (parent, args, context, info) => {
            let choice = databaseCalls.getChoice(args.choiceID);
            let account = databaseCalls.getAccount(choice.suggestedBy);

            console.log(`Removing suggestion ${choice.ID} (${choice.action})`);

            delete account.suggestedChoices[choice.ID];

            databaseCalls.addAccount(account);
            databaseCalls.removeNode(args.nodeID);
        },
        makeCanon: (parent, args, context, info) => {
            let node = databaseCalls.getNode(args.nodeID);
            let choice = databaseCalls.getChoice(args.choiceID);

            console.log(
                `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) canon`
            );

            node.canonChoices.push(choice.ID);
            node.canonChoices = node.canonChoices.filter(
                (item, pos) => node.canonChoices.indexOf(item) === pos
            );
            node.nonCanonChoices = node.nonCanonChoices.filter(
                id => id !== choice.ID
            );

            databaseCalls.addNode(node);
            return choice;
        },
        makeNonCanon: (parent, args, context, info) => {
            let node = databaseCalls.getNode(args.nodeID);
            let choice = databaseCalls.getChoice(args.choiceID);

            console.log(
                `Making choice ${choice.ID} (${choice.action}) in node ${node.ID} (${node.title}) non-canon`
            );

            node.nonCanonChoices.push(choice.ID);
            node.nonCanonChoices = node.nonCanonChoices.filter(
                (item, pos) => node.nonCanonChoices.indexOf(item) === pos
            );
            node.canonChoices = node.canonChoices.filter(id => id !== choice.ID);

            databaseCalls.addNode(node);
            return choice;
        }
    }
};

module.exports = { resolvers };