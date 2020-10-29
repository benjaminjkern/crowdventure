const { databaseCalls } = require("./databaseCalls.js");
const { UserInputError } = require("apollo-server-lambda");

module.exports = {
    submittedBy: async(parent, args, context, info) =>
        await databaseCalls.getAccount(parent.submittedBy),
    reporting: async(parent, args, context, info) => {
        if (!parent.reporting.type) return null;
        switch (parent.reporting.type) {
            case "Account":
                return inspect(
                    await databaseCalls.getAccount(parent.reporting.ID)
                ).replace(/\n/g, "");
            case "Node":
                return inspect(
                    await databaseCalls.getNode(parent.reporting.ID)
                ).replace(/\n/g, "");
            case "Choice":
                return inspect(
                    await databaseCalls.getChoice(parent.reporting.ID)
                ).replace(/\n/g, "");
        }

        throw new UserInputError(
            `The parent's reporting object type is invalid`, {
                invalidArgs: parent.reporting.type,
            }
        );
    },
};