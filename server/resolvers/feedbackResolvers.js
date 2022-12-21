const { UserInputError } = require("apollo-server-lambda");

module.exports = {
    reporting: async (parent) => {
        if (!parent.reporting.type) return null;
        switch (parent.reporting.type) {
            case "Account":
            case "Node":
            case "Choice":
                return parent.reporting.type + " : " + parent.reporting.ID;
            default:
        }

        throw new UserInputError(
            "The parent's reporting object type is invalid",
            {
                invalidArgs: parent.reporting.type,
            }
        );
    },
};
