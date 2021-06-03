const { UserInputError } = require('apollo-server-lambda');
const { databaseCalls } = require('./databaseCalls.js');
const { scramble } = require('./resolverUtils.js');

module.exports = {
    // TODO: For now, featured is a random selection of 10 top-level nodes
    // Eventually I want to make this actually some sort of algorithmic selection based on recent activity
    featuredNodes: async(parent, args, context, info) => scramble(await databaseCalls.filterFeatured(args.allowHidden)).slice(0, args.count || 10),
    recentlyUpdatedNodes: async(parent, args, context, info) =>
        await databaseCalls.sortedNodes(args.pageSize ? Math.min(args.pageSize, 100) : 10, args.pageNum || 0, args.allowHidden)
        .then(nodes => Promise.all(nodes.map(node => databaseCalls.getNode(node.ID)))),
    randomNode: async(parent, args, context, info) => await databaseCalls.randomNode(args.chooseFromLast || 1000, args.allowHidden),

    allAccounts: async() => await databaseCalls.allAccounts(),
    allNodes: async() => {
        const allNodes = await databaseCalls.allNodes();
        // (async() => {
        //     for (const node of allNodes) {
        //         node.canonChoices = await Promise.all(node.canonChoices.map(choiceID => databaseCalls.getChoice(choiceID))).then(choices => choices.filter(choice => choice).map(choice => choice.ID));
        //         node.nonCanonChoices = await Promise.all(node.nonCanonChoices.map(choiceID => databaseCalls.getChoice(choiceID))).then(choices => choices.filter(choice => choice).map(choice => choice.ID));
        //         databaseCalls.addNode(node);
        //     }
        // })();
        return allNodes;
    },
    allChoices: async() => {
        const allChoices = await databaseCalls.allChoices();
        // (async() => {
        //     for (const choice of allChoices) {
        //         const daddy = await databaseCalls.getNode(choice.from);
        //         if (daddy.canonChoices.includes(choice.ID)) continue;
        //         if (daddy.nonCanonChoices.includes(choice.ID)) continue;
        //         if (choice.ID) {
        //             daddy.nonCanonChoices.push(choice.ID);
        //             await databaseCalls.addNode(daddy);
        //         }
        //     }
        // })();
        return allChoices;
    },
    allFeedback: async() => await databaseCalls.allFeedback(),

    getAccount: async(parent, args, context, info) => {
        const account = await databaseCalls.getAccount(args.screenName);
        if (!account) {
            throw new UserInputError('That account doesnt exist!', {
                invalidArgs: Object.keys(args),
            });
        }
        const { encryptedPassword, lastIP, ...smallAccount } = account;
        // return everything except last IP and encrypted password since graphql cant do anything with those anyways
        return smallAccount;
    },
    getNode: async(parent, args, context, info) => await databaseCalls.getNode(args.ID),
    getChoice: async(parent, args, context, info) => await databaseCalls.getChoice(args.ID),
    searchAccounts: async(parent, args, context, info) => {
        // these can absolutely be made better than just grabbing the entire database and searching here
        if (!args.query) return [];
        return (await databaseCalls.allAccounts()).filter((account) => account[args.type].toLowerCase().includes(args.query.toLowerCase()));
    },
    searchNodes: async(parent, args, context, info) => {
        if (!args.query) return [];
        return (await databaseCalls.allNodes()).filter((node) => node[args.type].toLowerCase().includes(args.query.toLowerCase()));
    },
    searchChoices: async(parent, args, context, info) => {
        if (!args.query) return [];
        return (await databaseCalls.allChoices()).filter((choice) => choice[args.type].toLowerCase().includes(args.query.toLowerCase()));
    },
};