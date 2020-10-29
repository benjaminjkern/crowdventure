const { databaseCalls } = require("./databaseCalls.js");

module.exports = {
    from: async(parent, args, context, info) => {
        return await databaseCalls.getNode(parent.from);
    },
    to: async(parent, args, context, info) => {
        return await databaseCalls.getNode(parent.to);
    },
    suggestedBy: async(parent, args, context, info) => {
        return await databaseCalls.getAccount(parent.suggestedBy);
    },
    likes: (parent, args, context, info) => {
        return Object.keys(parent.likedBy).length;
    },
    dislikes: (parent, args, context, info) => {
        return Object.keys(parent.dislikedBy).length;
    },
    score: (parent, args, context, info) => {
        return (
            parent.score ||
            resolvers.Choice.likes(parent) - resolvers.Choice.dislikes(parent)
        );
    },
    likedBy: async(parent, args, context, info) => {
        return await Promise.all(
            Object.keys(parent.likedBy).map((accountScreenName) =>
                databaseCalls.getAccount(accountScreenName)
            )
        );
    },
    dislikedBy: async(parent, args, context, info) => {
        return await Promise.all(
            Object.keys(parent.dislikedBy).map((accountScreenName) =>
                databaseCalls.getAccount(accountScreenName)
            )
        );
    },
    dateCreated: (parent, args, context, info) => {
        if (!parent.dateCreated) parent.dateCreated = "Before September 16, 2020";
        databaseCalls.addChoice(parent);
        return parent.dateCreated;
    }
};