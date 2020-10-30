const { databaseCalls } = require('./databaseCalls.js');
const { sort } = require('./resolverUtils.js');
const NodeResolvers = require('./nodeResolvers.js');
const ChoiceResolvers = require('./choiceResolvers.js');

const AccountResolvers = {
  nodes: async (parent, args, context, info) => await Promise.all(
    parent.nodes.map((id) => databaseCalls.getNode(id)),
  )
    .then((nodes) => nodes.map((node) => ({ ...node, views: NodeResolvers.views(node) })))
    .then((nodes) => sort(nodes, (a, b) => {
      if (a.featured) return b.featured ? 0 : -1;
      if (b.featured) return 1;
      return a.views === b.views ? 0 : a.views > b.views ? -1 : 1;
    })),
  suggestedChoices: async (parent, args, context, info) => await Promise.all(
    parent.suggestedChoices.map((id) => databaseCalls.getChoice(id)),
  ),
  totalNodeViews: async (parent, args, context, info) => await Promise.all(
    parent.nodes.map((id) => databaseCalls.getNode(id)),
  ).then((nodes) => nodes
    .map((node) => NodeResolvers.views(node))
    .reduce((x, y) => x + y, 0)),
  totalSuggestionScore: async (parent, args, context, info) => (parent.suggestedChoices
    ? await Promise.all(
      parent.suggestedChoices.map((id) => databaseCalls.getChoice(id)),
    ).then((choices) => choices
      .map((choice) => ChoiceResolvers.score(choice))
      .reduce((x, y) => x + y, 0))
    : 0),
  featuredNodes: async (parent, args, context, info) => {
    const allNodes = await AccountResolvers.nodes(parent);
    return await Promise.all(
      allNodes
        .filter((node) => node.featured)
        .map(async (node) => ({
          ...node,
          size: await NodeResolvers.size(node),
        })),
    );
  },
  dateCreated: (parent, args, context, info) => {
    if (!parent.dateCreated) parent.dateCreated = 'Before September 16, 2020';
    databaseCalls.addAccount(parent);
    return parent.dateCreated;
  },
};

module.exports = AccountResolvers;
