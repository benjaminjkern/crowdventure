const { databaseCalls } = require("./databaseCalls.js");

const ChoiceResolvers = {
    from: async (parent) => await databaseCalls.getNode(parent.from),
    to: async (parent) => await databaseCalls.getNode(parent.to),
    suggestedBy: async (parent) =>
        await databaseCalls.getAccount(parent.suggestedBy),
    likes: (parent) => Object.keys(parent.likedBy).length,
    dislikes: (parent) => Object.keys(parent.dislikedBy).length,
    score: (parent) =>
        parent
            ? parent.score ||
              ChoiceResolvers.likes(parent) - ChoiceResolvers.dislikes(parent)
            : 0,
    likedBy: async (parent) =>
        await Promise.all(
            Object.keys(parent.likedBy).map((accountScreenName) =>
                databaseCalls.getAccount(accountScreenName)
            )
        ),
    dislikedBy: async (parent) =>
        await Promise.all(
            Object.keys(parent.dislikedBy).map((accountScreenName) =>
                databaseCalls.getAccount(accountScreenName)
            )
        ),
    dateCreated: async (parent) => {
        const newParent = await databaseCalls.getChoice(parent.ID);
        if (!newParent.dateCreated) {
            parent.dateCreated = "Before September 16, 2020";
            newParent.dateCreated = "Before September 16, 2020";
        }
        databaseCalls.addChoice(newParent);
        return parent.dateCreated;
    },
};

module.exports = ChoiceResolvers;
