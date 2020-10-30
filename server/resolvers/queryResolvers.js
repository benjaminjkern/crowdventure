const { UserInputError } = require('apollo-server-lambda');
const { databaseCalls } = require('./databaseCalls.js');
const { scramble } = require('./resolverUtils.js');

module.exports = {
  featuredNodes: async () => scramble(await databaseCalls.filterFeatured()),
  allAccounts: async () => await databaseCalls.allAccounts(),
  allNodes: async () => await databaseCalls.allNodes(),
  allChoices: async () => await databaseCalls.allChoices(),
  allFeedback: async () => await databaseCalls.allFeedback(),
  getAccount: async (parent, args, context, info) => {
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
  getNode: async (parent, args, context, info) => await databaseCalls.getNode(args.ID),
  getChoice: async (parent, args, context, info) => await databaseCalls.getChoice(args.ID),
  searchAccounts: async (parent, args, context, info) => {
    // these can absolutely be made better than just grabbing the entire database and searching here
    if (!args.query) return [];
    return (await databaseCalls.allAccounts()).filter((account) => account[args.type].toLowerCase().includes(args.query.toLowerCase()));
  },
  searchNodes: async (parent, args, context, info) => {
    if (!args.query) return [];
    return (await databaseCalls.allNodes()).filter((node) => node[args.type].toLowerCase().includes(args.query.toLowerCase()));
  },
  searchChoices: async (parent, args, context, info) => {
    if (!args.query) return [];
    return (await databaseCalls.allChoices()).filter((choice) => choice[args.type].toLowerCase().includes(args.query.toLowerCase()));
  },
};
