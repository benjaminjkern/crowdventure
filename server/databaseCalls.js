// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const fs = require("fs");

let ACCOUNTS, NODES, CHOICES;

fs.readFile("./mock-data/mockAccounts.json", (err, data) => {
    if (err) throw err;
    ACCOUNTS = JSON.parse(data);
});
fs.readFile("./mock-data/mockNodes.json", (err, data) => {
    if (err) throw err;
    NODES = JSON.parse(data);
});
fs.readFile("./mock-data/mockChoices.json", (err, data) => {
    if (err) throw err;
    CHOICES = JSON.parse(data);
});

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

        fs.writeFile(
            "./mock-data/mockAccounts.json",
            JSON.stringify(ACCOUNTS),
            err => {
                if (err) throw err;
            }
        );

        return account;
    },
    addNode: node => {
        console.log(`DATABASE: ADDING NEW NODE (ID: ${node.ID})`);
        NODES[node.ID] = node;

        fs.writeFile("./mock-data/mockNodes.json", JSON.stringify(NODES), err => {
            if (err) throw err;
        });

        return node;
    },
    addChoice: choice => {
        console.log(`DATABASE: ADDING NEW CHOICE (ID: ${choice.ID})`);
        CHOICES[choice.ID] = choice;

        fs.writeFile(
            "./mock-data/mockChoices.json",
            JSON.stringify(CHOICES),
            err => {
                if (err) throw err;
            }
        );

        return choice;
    },
    removeAccount: accountID => {
        console.log(`DATABASE: REMOVING ACCOUNT (ID: ${accountID})`);
        delete ACCOUNTS[accountID];

        fs.writeFile(
            "./mock-data/mockAccounts.json",
            JSON.stringify(ACCOUNTS),
            err => {
                if (err) throw err;
            }
        );
    },
    removeNode: nodeID => {
        console.log(`DATABASE: REMOVING NODE (ID: ${nodeID})`);
        delete NODES[nodeID];

        fs.writeFile("./mock-data/mockNodes.json", JSON.stringify(NODES), err => {
            if (err) throw err;
        });
    },
    removeChoice: choiceID => {
        console.log(`DATABASE: REMOVING CHOICE (ID: ${choiceID})`);
        delete CHOICES[choiceID];

        fs.writeFile(
            "./mock-data/mockChoices.json",
            JSON.stringify(CHOICES),
            err => {
                if (err) throw err;
            }
        );
    }
};

module.exports = { databaseCalls };