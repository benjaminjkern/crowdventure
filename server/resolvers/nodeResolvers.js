const { databaseCalls } = require('./databaseCalls.js');
const { sort } = require('./resolverUtils.js');
const ChoiceResolvers = require('./choiceResolvers.js');

const allConnected = async (node, visited = {}) => {
  const children = await NodeResolvers.canonChoices(node).then((choices) => Promise.all(choices.map((choice) => ChoiceResolvers.to(choice))));
  let newVisited = { ...visited, [node.ID]: node.ID };

  for (const childKey in children) {
    const child = children[childKey];
    if (!newVisited[child.ID] && !child.featured) {
      newVisited = {
        ...newVisited,
        ...(await allConnected(child, newVisited)),
      };
    }
  }
  return newVisited;
};

const NodeResolvers = {
  content: (parent, args, context, info) => {
    const IP = context.headers['X-Forwarded-For'].split(',')[0];
    if (!parent.views[IP]) {
      parent.views[IP] = IP;
      databaseCalls.addNode(parent);
    }
    return parent.content;
  },
  views: (parent, args, context, info) => (typeof parent.views === 'object'
    ? Object.keys(parent.views).length
    : parent.views),
  owner: async (parent, args, context, info) => await databaseCalls.getAccount(parent.owner),
  canonChoices: async (parent, args, context, info) => await Promise.all(
    parent.canonChoices.map((id) => databaseCalls.getChoice(id)),
  ),
  nonCanonChoices: async (parent, args, context, info) => await Promise.all(
    parent.nonCanonChoices.map((id) => databaseCalls.getChoice(id)),
  )
    .then((choices) => choices.map((choice) => ({
      ...choice,
      score: ChoiceResolvers.score(choice),
    })))
    .then((choices) => sort(choices, (a, b) => (a.score === b.score ? 0 : a.score > b.score ? -1 : 1))),
  dateCreated: (parent, args, context, info) => {
    if (!parent.dateCreated) parent.dateCreated = 'Before September 16, 2020';
    databaseCalls.addNode(parent);
    return parent.dateCreated;
  },
  // should return the total number of nodes it is connected to
  size: async (parent, args, context, info) => {
    return 0;
    if (parent.size) return parent.size;
    return Object.keys(await allConnected(parent)).length;
  },
};

module.exports = NodeResolvers;
