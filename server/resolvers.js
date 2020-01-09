const { ApolloServer, gql, UserInputError } = require(require("./server.js")
    .serverType);

const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

const resolvers = {
    Account: {
        nodes: (parent, args, context, info) => {
            console.log(
                `Retrieving nodes owned by ${parent.ID} (${parent.screenName})`
            );

            return parent.nodes.map(id => NODES.find(node => node.ID === id));
        }
    },
    Node: {
        owner: (parent, args, context, info) => {
            console.log(`Retrieving owner of node ${parent.ID}`);

            return ACCOUNTS.find(account => account.ID === parent.owner);
        },
        canon_choices: (parent, args, context, info) => {
            console.log(`Retrieving all canon choices from node ${parent.ID}`);

            return parent.canon_choices.map(id => NODES.find(node => node.ID === id));
        },
        non_canon_choices: (parent, args, context, info) => {
            console.log(`Retrieving all non-canon choices from node ${parent.ID}`);

            return parent.non_canon_choices.map(id =>
                NODES.find(node => node.ID === id)
            );
        }
    },
    Query: {
        allAccounts: () => {
            console.log(`Retrieving all accounts`);
            return ACCOUNTS;
        },
        allNodes: () => {
            console.log(`Retrieving all nodes`);
            return NODES;
        }
    }
    Mutation: {
        addAccount,
        deleteAccount,
        addNode,
        deleteNode,
        makeCanon,
        makeNonCanon,
    }
};

module.exports = { resolvers };