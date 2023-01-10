const { databaseCalls } = require("./databaseCalls.js");

const ChoiceResolvers = {
    from: async (parent) => await databaseCalls.getNode(parent.from),
    to: async (parent) => await databaseCalls.getNode(parent.to),
    suggestedBy: async (parent) =>
        await databaseCalls.getAccount(parent.suggestedBy),
    likes: async (parent) => (await ChoiceResolvers.likedBy(parent)).length,
    dislikes: async (parent) =>
        (await ChoiceResolvers.dislikedBy(parent)).length,
    score: async (parent) =>
        (await ChoiceResolvers.likes(parent)) -
        (await ChoiceResolvers.dislikes(parent)),
    likedBy: async (parent) =>
        await databaseCalls.getLikedByForChoice(parent.ID),
    dislikedBy: async (parent) =>
        await databaseCalls.getDisikedByForChoice(parent.ID),
    dateCreated: async (parent) => {
        if (!parent.dateCreated) {
            const existingParent = await databaseCalls.getChoice(parent.ID);
            existingParent.dateCreated = `Before ${new Date().toJSON()}`;
            parent.dateCreated = existingParent.dateCreated;
            await databaseCalls.addChoice(existingParent);
        }
        return parent.dateCreated;
    },
};

module.exports = ChoiceResolvers;
