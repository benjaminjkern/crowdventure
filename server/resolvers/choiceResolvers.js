const { databaseCalls } = require('./databaseCalls.js');

const ChoiceResolvers = {
    from: async(parent, args, context, info) => await databaseCalls.getNode(parent.from),
    to: async(parent, args, context, info) => await databaseCalls.getNode(parent.to),
    suggestedBy: async(parent, args, context, info) => await databaseCalls.getAccount(parent.suggestedBy),
    likes: (parent, args, context, info) => Object.keys(parent.likedBy).length,
    dislikes: (parent, args, context, info) => Object.keys(parent.dislikedBy).length,
    score: (parent, args, context, info) => (
        parent.score ||
        ChoiceResolvers.likes(parent) - ChoiceResolvers.dislikes(parent)
    ),
    likedBy: async(parent, args, context, info) => await Promise.all(
        Object.keys(parent.likedBy).map((accountScreenName) => databaseCalls.getAccount(accountScreenName)),
    ),
    dislikedBy: async(parent, args, context, info) => await Promise.all(
        Object.keys(parent.dislikedBy).map((accountScreenName) => databaseCalls.getAccount(accountScreenName)),
    ),
    dateCreated: async(parent, args, context, info) => {
        const newParent = await databaseCalls.getChoice(parent.ID);
        if (!newParent.dateCreated) {
            parent.dateCreated = 'Before September 16, 2020';
            newParent.dateCreated = 'Before September 16, 2020';
        }
        databaseCalls.addChoice(newParent);
        return parent.dateCreated;
    },
};

module.exports = ChoiceResolvers;