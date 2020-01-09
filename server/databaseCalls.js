const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const databaseCalls = {
    allAccounts: () => {
        console.log(`DATABASE: CALLING ALL ACCOUNTS`);
        return ACCOUNTS;
    },
    allNodes: () => {
        console.log(`DATABASE: CALLING ALL NODES`);
        return NODES;
    },
    allChoices: () => {
        console.log(`DATABASE: CALLING ALL CHOICES`);
        return CHOICES;
    },
    getAccount: accountID => {
        console.log(`DATABASE: CALLING ACCOUNT (ID: ${accountID})`);
        return ACCOUNTS[accountID];
    },
    getNode: nodeID => {
        console.log(`DATABASE: CALLING NODE (ID: ${nodeID})`);
        return NODES[nodeID];
    },
    getChoice: choiceID => {
        console.log(`DATABASE: CALLING CHOICE (ID: ${choiceID})`);
        return CHOICES[choiceID];
    },
    addAccount: account => {
        console.log(`DATABASE: ADDING NEW ACCOUNT (ID: ${account.ID})`);
        ACCOUNTS[account.ID] = account;
        return account;
    },
    addNode: node => {
        console.log(`DATABASE: ADDING NEW NODE (ID: ${node.ID})`);
        NODES[node.ID] = node;
        return node;
    },
    addChoice: choice => {
        console.log(`DATABASE: ADDING NEW CHOICE (ID: ${choice.ID})`);
        CHOICES[choice.ID] = choice;
        return choice;
    },
    removeAccount: accountID => {
        console.log(`DATABASE: REMOVING ACCOUNT (ID: ${accountID})`);
        delete ACCOUNTS[accountID];
    },
    removeNode: nodeID => {
        console.log(`DATABASE: REMOVING NODE (ID: ${nodeID})`);
        delete NODES[nodeID];
    },
    removeChoice: choiceID => {
        console.log(`DATABASE: REMOVING CHOICE (ID: ${choiceID})`);
        delete CHOICES[choiceID];
    }
};

module.exports = { databaseCalls };