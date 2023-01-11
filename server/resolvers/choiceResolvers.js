const { databaseCalls } = require("./databaseCalls.js");

const ChoiceResolvers = {
    from: async (parent) => await databaseCalls.getNode(parent.from),
    to: async (parent) => await databaseCalls.getNode(parent.to),
    suggestedBy: async (parent) =>
        await databaseCalls.getAccount(parent.suggestedBy),
    likes: async (parent) => (await ChoiceResolvers.likedBy(parent)).length,
    dislikes: async (parent) =>
        (await ChoiceResolvers.dislikedBy(parent)).length,
    // score: async (parent) => {
    //     if (parent.score) return parent.score;

    //     const choice = await databaseCalls.getChoice(parent.ID);
    //     choice.score =
    //         (await ChoiceResolvers.likes(choice)) -
    //         (await ChoiceResolvers.dislikes(choice));
    //     await databaseCalls.addChoice(choice);

    //     parent.score = choice.score;
    //     return parent.score;
    // },
    likedBy: async (parent) =>
        await databaseCalls.getLikedByForChoice(parent.ID),
    dislikedBy: async (parent) =>
        await databaseCalls.getDisikedByForChoice(parent.ID),
};

module.exports = ChoiceResolvers;
