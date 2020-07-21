// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const ACCOUNT_TABLE = "Accounts";
const NODE_TABLE = "Nodes";
const CHOICE_TABLE = "Choices";
const REPORT_TABLE = "Reports";

const databaseCalls = {
    filterFeatured: async() => await filter(NODE_TABLE, "featured", true),

    allAccounts: async() => await getFullTable(ACCOUNT_TABLE),
    allNodes: async() => await getFullTable(NODE_TABLE),
    allChoices: async() => await getFullTable(CHOICE_TABLE),
    allReports: async() => await getFullTable(REPORT_TABLE),

    getAccount: async(accountScreenName) =>
        await getItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    getNode: async(nodeID) => await getItem(NODE_TABLE, { ID: nodeID }),
    getChoice: async(choiceID) => await getItem(CHOICE_TABLE, { ID: choiceID }),
    getReport: async(reportID) => await getItem(REPORT_TABLE, { ID: reportID }),

    addAccount: async(account) => await addItem(ACCOUNT_TABLE, account),
    addNode: async(node) => await addItem(NODE_TABLE, node),
    addChoice: async(choice) => await addItem(CHOICE_TABLE, choice),
    addReport: async(report) => await addItem(REPORT_TABLE, report),

    removeAccount: async(accountScreenName) =>
        await removeItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    removeNode: async(nodeID) => await removeItem(NODE_TABLE, { ID: nodeID }),
    removeChoice: async(choiceID) =>
        await removeItem(CHOICE_TABLE, { ID: choiceID }),
    removeReport: async(reportID) =>
        await removeItem(REPORT_TABLE, { ID: reportID }),
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

const filter = async(tableName, arg, value) =>
    await docClient
    .scan({
        TableName: tableName,
        ExpressionAttributeValues: {
            ":r": value,
        },
        FilterExpression: `${arg} = :r`,
    })
    .promise()
    .then((data) => data.Items)
    .catch((err) => {
        console.log(err);
        return err;
    });

module.exports = { databaseCalls };