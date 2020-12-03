const { databaseCalls } = require('./databaseCalls.js');
const { sort } = require('./resolverUtils.js');
const ChoiceResolvers = require('./choiceResolvers.js');

const allConnected = async(node, visited = {}) => {
    const children = await NodeResolvers.canonChoices(node).then((choices) => Promise.all(choices.map((choice) => ChoiceResolvers.to(choice))));
    let newVisited = {...visited, [node.ID]: node.ID };

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
    content: async(parent, args, context, info) => {
        const IP = context.headers['X-Forwarded-For'].split(',')[0];
        const newParent = await databaseCalls.getNode(parent.ID);
        if (typeof newParent.views !== 'object') {
            newParent.views = { previouslySaved: newParent.views };
        }
        if (!newParent.views[IP]) {
            newParent.views[IP] = IP;
            databaseCalls.addNode(newParent);
        }
        parent.views = newParent.views;
        return parent.content;
    },
    views: async(parent, args, context, info) => {
        if (typeof parent.views === 'object') {
            const newParent = await databaseCalls.getNode(parent.ID);
            while (typeof newParent.views.previouslySaved === 'object') {
                newParent.views.previouslySaved = newParent.views.previouslySaved.previouslySaved;
            }
            databaseCalls.addNode(newParent);
            parent.views = newParent.views;
            return Object.keys(parent.views).filter(key => key !== 'previouslySaved').length + (parent.views.previouslySaved || 0);
        } else {
            const newParent = await databaseCalls.getNode(parent.ID);
            newParent.views = { previouslySaved: parent.views };
            databaseCalls.addNode(newParent);
            parent.views = newParent.views;
            return newParent.views.previouslySaved;
        }
    },
    owner: async(parent, args, context, info) => await databaseCalls.getAccount(parent.owner),
    canonChoices: async(parent, args, context, info) => await Promise.all(
        parent.canonChoices.map((id) => databaseCalls.getChoice(id)),
    ),
    nonCanonChoices: async(parent, args, context, info) => await Promise.all(
            parent.nonCanonChoices.map((id) => databaseCalls.getChoice(id)),
        )
        .then((choices) => choices.map((choice) => ({
            ...choice,
            score: ChoiceResolvers.score(choice),
        })))
        .then((choices) => sort(choices, (a, b) => (a.score === b.score ? 0 : a.score > b.score ? -1 : 1))),
    dateCreated: async(parent, args, context, info) => {
        const newParent = await databaseCalls.getNode(parent.ID);
        if (!newParent.dateCreated) {
            parent.dateCreated = 'Before September 16, 2020';
            newParent.dateCreated = 'Before September 16, 2020';
            databaseCalls.addNode(newParent);
        }
        return parent.dateCreated;
    },
    // should return the total number of nodes it is connected to
    size: async(parent, args, context, info) => {
        return 0;
        if (parent.size) return parent.size;
        return Object.keys(await allConnected(parent)).length;
    },
    parents: async(parent, args, content, info) => {
        const choices = await databaseCalls.filterParents(parent.ID);
        return await Promise.all(choices.map(choice => databaseCalls.getNode(choice.from)));
    }
};

module.exports = NodeResolvers;