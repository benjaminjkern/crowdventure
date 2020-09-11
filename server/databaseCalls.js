// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const ACCOUNT_TABLE = "Accounts";
const NODE_TABLE = "Nodes";
const CHOICE_TABLE = "Choices";
const FEEDBACK_TABLE = "Feedback";
const DBON = true;

const databaseCalls = {
    filterFeatured: async() => await filter(NODE_TABLE, "featured", true),

    allAccounts: async() => await getFullTable(ACCOUNT_TABLE),
    allNodes: async() => await getFullTable(NODE_TABLE),
    allChoices: async() => await getFullTable(CHOICE_TABLE),
    allFeedback: async() => await getFullTable(FEEDBACK_TABLE),

    getAccount: async(accountScreenName) =>
        await getItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    getNode: async(nodeID) => await getItem(NODE_TABLE, { ID: nodeID }),
    getChoice: async(choiceID) => await getItem(CHOICE_TABLE, { ID: choiceID }),
    getFeedback: async(feedbackID) =>
        await getItem(FEEDBACK_TABLE, { ID: feedbackID }),

    addAccount: async(account) => await addItem(ACCOUNT_TABLE, account),
    addNode: async(node) => await addItem(NODE_TABLE, node),
    addChoice: async(choice) => await addItem(CHOICE_TABLE, choice),
    addFeedback: async(feedback) => await addItem(FEEDBACK_TABLE, feedback),

    removeAccount: async(accountScreenName) =>
        await removeItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    removeNode: async(nodeID) => await removeItem(NODE_TABLE, { ID: nodeID }),
    removeChoice: async(choiceID) =>
        await removeItem(CHOICE_TABLE, { ID: choiceID }),
    removeFeedback: async(feedbackID) =>
        await removeItem(FEEDBACK_TABLE, { ID: feedbackID }),
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
    return DBON ? [
        ...items.Items,
        ...(await scanTable(tableName, items.LastEvaluatedKey)),
    ] : [];
};

const getItem = async(tableName, key) => DBON ?
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
    }) : undefined;

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

const filter = async(tableName, arg, value) => DBON ?
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
    }) : [];

module.exports = { databaseCalls };