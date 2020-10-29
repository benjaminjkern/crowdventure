const { databaseCalls } = require("./databaseCalls.js");

module.exports = {
    content: (parent, args, context, info) => {
        let IP = context.headers["X-Forwarded-For"].split(",")[0];
        if (!parent.views[IP]) {
            parent.views[IP] = IP;
            databaseCalls.addNode(parent);
        }
        return parent.content;
    },
    views: (parent, args, context, info) => {
        return typeof parent.views === "object" ?
            Object.keys(parent.views).length :
            parent.views;
    },
    owner: async(parent, args, context, info) => {
        return await databaseCalls.getAccount(parent.owner);
    },
    canonChoices: async(parent, args, context, info) => {
        return await Promise.all(
            parent.canonChoices.map((id) => databaseCalls.getChoice(id))
        );
    },
    nonCanonChoices: async(parent, args, context, info) => {
        return await Promise.all(
                parent.nonCanonChoices.map((id) => databaseCalls.getChoice(id))
            )
            .then((choices) =>
                choices.map((choice) => ({
                    ...choice,
                    score: resolvers.Choice.score(choice),
                }))
            )
            .then((choices) =>
                sort(choices, (a, b) =>
                    a.score === b.score ? 0 : a.score > b.score ? -1 : 1
                )
            );
    },
    dateCreated: (parent, args, context, info) => {
        if (!parent.dateCreated) parent.dateCreated = "Before September 16, 2020";
        databaseCalls.addNode(parent);
        return parent.dateCreated;
    },
    // should return the total number of nodes it is connected to
    size: async(parent, args, context, info) => {
        return 0;
        if (parent.size) return parent.size;
        return Object.keys(await allConnected(parent)).length;
    },
};