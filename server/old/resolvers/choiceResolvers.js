const { databaseCalls } = require("./databaseCalls.js");

const ChoiceResolvers = {
    from: async (parent) => await databaseCalls.getNode(parent.from),
    to: async (parent) => await databaseCalls.getNode(parent.to),
    suggestedBy: async (parent) =>
        await databaseCalls.getAccount(parent.suggestedBy),
    likes: async (parent) => (await ChoiceResolvers.likedBy(parent)).length,
    dislikes: async (parent) =>
        (await ChoiceResolvers.dislikedBy(parent)).length,
    score: async (parent) => {
        (async () => {
            const choice = await databaseCalls.getChoice(parent.ID);
            const score = choice.score;
            choice.score =
                (await ChoiceResolvers.likes(choice)) -
                (await ChoiceResolvers.dislikes(choice));
            if (score !== choice.score) await databaseCalls.addChoice(choice);
        })();

        return parent.score;
    },
    likedBy: async (parent) => {
        const likedBy = await databaseCalls.getLikedByForChoice(parent.ID);
        const newLikedBy = [];
        for (const { account } of likedBy) {
            newLikedBy.push(await databaseCalls.getAccount(account));
        }
        return newLikedBy;
    },
    dislikedBy: async (parent) => {
        const dislikedBy = await databaseCalls.getDisikedByForChoice(parent.ID);
        const newDislikedBy = [];
        for (const { account } of dislikedBy) {
            newDislikedBy.push(await databaseCalls.getAccount(account));
        }
        return newDislikedBy;
    },
};

module.exports = ChoiceResolvers;
