import databaseCalls from "../databaseCalls.js";

export const from = async (parent) => await databaseCalls.getNode(parent.from);
export const to = async (parent) => await databaseCalls.getNode(parent.to);
export const suggestedBy = async (parent) =>
    await databaseCalls.getAccount(parent.suggestedBy);

export const likes = async (parent) => {
    // TODO: Do this in the same way as the other async methods
    return (await databaseCalls.getLikedByForChoice(parent.ID)).length;
};
export const dislikes = async (parent) => {
    return (await databaseCalls.getDisikedByForChoice(parent.ID)).length;
};

export const score = async (parent) => {
    // TODO: Do this on update instead of spawning recalc
    // (async () => {
    //     const choice = await databaseCalls.getChoice(parent.ID);
    //     const score = choice.score;
    //     choice.score =
    //         (await ChoiceResolvers.likes(choice)) -
    //         (await ChoiceResolvers.dislikes(choice));
    //     if (score !== choice.score) await databaseCalls.addChoice(choice);
    // })();

    return parent.score;
};
