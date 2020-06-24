// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const ACCOUNT_TABLE = "Accounts";
const NODE_TABLE = "Nodes";
const CHOICE_TABLE = "Choices";

const databaseCalls = {
    allAccounts: async() => {
        console.log(`DATABASE: CALLING ALL ACCOUNTS`);
        return await getFullTable(ACCOUNT_TABLE);
    },
    allNodes: async() => {
        console.log(`DATABASE: CALLING ALL NODES`);
        return await getFullTable(NODE_TABLE);
    },
    allChoices: async() => {
        console.log(`DATABASE: CALLING ALL CHOICES`);
        return await getFullTable(CHOICE_TABLE);
    },
    getAccount: async(accountScreenName) => {
        console.log(
            `DATABASE: CALLING ACCOUNT (SCREEN NAME: ${accountScreenName})`
        );
        return await getItem(ACCOUNT_TABLE, { screenName: accountScreenName });
    },
    getNode: async(nodeID) => {
        console.log(`DATABASE: CALLING NODE (ID: ${nodeID})`);
        return await getItem(NODE_TABLE, { ID: nodeID });
    },
    getChoice: async(choiceID) => {
        console.log(`DATABASE: CALLING CHOICE (ID: ${choiceID})`);
        return await getItem(CHOICE_TABLE, { ID: choiceID });
    },
    addAccount: async(account) => {
        console.log(
            `DATABASE: ADDING NEW ACCOUNT (SCREEN NAME: ${account.screenName})`
        );
        return await addItem(ACCOUNT_TABLE, account);
    },
    addNode: async(node) => {
        console.log(`DATABASE: ADDING NEW NODE (ID: ${node.ID})`);
        return await addItem(NODE_TABLE, node);
    },
    addChoice: async(choice) => {
        console.log(`DATABASE: ADDING NEW CHOICE (ID: ${choice.ID})`);
        return await addItem(CHOICE_TABLE, choice);
    },
    removeAccount: async(accountScreenName) => {
        console.log(
            `DATABASE: REMOVING ACCOUNT (SCREEN NAME: ${accountScreenName})`
        );
        return await removeItem(ACCOUNT_TABLE, { screenName: accountScreenName });
    },
    removeNode: async(nodeID) => {
        console.log(`DATABASE: REMOVING NODE (ID: ${nodeID})`);
        return await removeItem(NODE_TABLE, { ID: nodeID });
    },
    removeChoice: async(choiceID) => {
        console.log(`DATABASE: REMOVING CHOICE (ID: ${choiceID})`);
        return await removeItem(CHOICE_TABLE, { ID: choiceID });
    },
};

const getFullTable = async(tableName, lastEvaluatedKey) => {
    let items = await docClient
        .scan({
            TableName: tableName,
            ExclusiveStartKey: lastEvaluatedKey,
        })
        .promise()
        .catch((err) => console.log(err));

    if (items.LastEvaluatedKey === undefined) return items.Items;
    return [
        ...items.Items,
        ...(await scanTable(tableName, items.LastEvaluatedKey)),
    ];
};

const getItem = async(tableName, key) =>
    await docClient
    .get({
        TableName: tableName,
        Key: key,
    })
    .promise()
    .then((data) => data.Item)
    .catch((err) => {
        console.log(err);
        return err;
    });

const addItem = async(tableName, item) =>
    await docClient
    .put({ TableName: tableName, Item: item })
    .promise()
    .then(() => item)
    .catch((err) => {
        console.log(err);
        return err;
    });

const removeItem = async(tableName, key) =>
    await docClient
    .delete({ TableName: tableName, Key: key })
    .promise()
    .then(() => true)
    .catch((err) => {
        console.log(err);
        return err;
    });

module.exports = { databaseCalls };