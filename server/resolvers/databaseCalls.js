// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const ACCOUNT_TABLE = "Accounts";
const NODE_TABLE = "Nodes2";
const CHOICE_TABLE = "Choices";
const FEEDBACK_TABLE = "Feedback";
const SORTED_NODE_TABLE = "SortedNodes";
const DBON = true;

const databaseCalls = {
    filterFeatured: async (allowHidden) => {
        if (allowHidden) return await filter(NODE_TABLE, "featured", true);
        return await filterVisible(NODE_TABLE, "featured", true);
    },
    filterParents: async (nodeID, allowHidden) => {
        if (allowHidden) return await filter(CHOICE_TABLE, "to", nodeID);
        return await filterVisible(CHOICE_TABLE, "to", nodeID);
    },

    sortedNodes: async (pageSize, pageNum, allowHidden) => {
        if (allowHidden)
            return await getPaginatedTable(
                SORTED_NODE_TABLE,
                pageSize,
                pageNum
            );
        return await getPaginatedFilteredTable(
            SORTED_NODE_TABLE,
            pageSize,
            pageNum,
            "hidden",
            false
        );
        // if (allowHidden) return await getPaginatedFilteredTable(SORTED_NODE_TABLE, pageSize, pageNum, 'featured', true);
        // return await getPaginatedFilteredVisibleTable(SORTED_NODE_TABLE, pageSize, pageNum, 'featured', true);
    },
    randomNode: async (max = 1000, allowHidden) => {
        let recentNodes;
        if (allowHidden) {
            recentNodes = await getPaginatedTable(SORTED_NODE_TABLE, max, 0);
        } else {
            recentNodes = await getPaginatedFilteredTable(
                SORTED_NODE_TABLE,
                max,
                0,
                "hidden",
                false
            );
        }
        return recentNodes[Math.floor(Math.random() * recentNodes.length)];
    },

    allAccounts: async () => await getFullTable(ACCOUNT_TABLE),
    allNodes: async () => await getFullTable(NODE_TABLE),
    allChoices: async () => await getFullTable(CHOICE_TABLE),
    allFeedback: async () => await getFullTable(FEEDBACK_TABLE),

    getAccount: async (accountScreenName) =>
        await getItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    getNode: async (nodeID) => await getItem(NODE_TABLE, { ID: nodeID }),
    getChoice: async (choiceID) =>
        await getItem(CHOICE_TABLE, { ID: choiceID }),
    getFeedback: async (feedbackID) =>
        await getItem(FEEDBACK_TABLE, { ID: feedbackID }),

    addAccount: async (account) => await addItem(ACCOUNT_TABLE, account),
    addNode: async (node) => {
        await addItem(SORTED_NODE_TABLE, {
            idx: "Node",
            ID: node.ID,
            lastUpdated:
                node.lastUpdated || new Date(node.dateCreated).getTime(),
            hidden: node.hidden || node.pictureUnsafe || false,
            featured: node.featured || false,
        });
        return await addItem(NODE_TABLE, node);
    },
    addChoice: async (choice) => await addItem(CHOICE_TABLE, choice),
    addFeedback: async (feedback) => await addItem(FEEDBACK_TABLE, feedback),

    removeAccount: async (accountScreenName) =>
        await removeItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    removeNode: async (nodeID) => {
        await removeItem(NODE_TABLE, { ID: nodeID });
        await removeItem(SORTED_NODE_TABLE, { ID: nodeID });
    },
    removeChoice: async (choiceID) =>
        await removeItem(CHOICE_TABLE, { ID: choiceID }),
    removeFeedback: async (feedbackID) =>
        await removeItem(FEEDBACK_TABLE, { ID: feedbackID }),
};

const getPaginatedFilteredTable = async (
    tableName,
    pageSize,
    pageNumber,
    arg,
    value,
    lastKey,
    limit
) => {
    if (!DBON) return [];

    const items = await docClient
        .query({
            TableName: tableName,
            IndexName: "idx-lastUpdated-index",
            KeyConditionExpression: "idx = :yyyy",
            FilterExpression: `#a = :r`,
            ExpressionAttributeValues: {
                ":yyyy": "Node",
                ":r": value,
            },
            ExpressionAttributeNames: {
                "#a": arg,
            },
            Limit: limit || pageSize,
            ExclusiveStartKey: lastKey,
            ScanIndexForward: false,
        })
        .promise()
        .catch((err) => console.log(err));

    if (items.Count < (limit || pageSize)) {
        if (pageNumber > 0) {
            if (items.LastEvaluatedKey === undefined) return [];
            return await getPaginatedFilteredTable(
                tableName,
                pageSize,
                pageNumber - 1,
                arg,
                value,
                items.LastEvaluatedKey
            );
        }
        if (items.LastEvaluatedKey === undefined) return items.Items;
        return [
            ...items.Items,
            ...(await getPaginatedFilteredTable(
                tableName,
                pageSize,
                pageNumber,
                arg,
                value,
                items.LastEvaluatedKey,
                (limit || pageSize) - items.Count
            )),
        ];
    }

    if (pageNumber > 0) {
        if (items.LastEvaluatedKey === undefined) return [];
        return await getPaginatedFilteredTable(
            tableName,
            pageSize,
            pageNumber - 1,
            arg,
            value,
            items.LastEvaluatedKey
        );
    }

    return items.Items;
};

const getPaginatedTable = async (tableName, pageSize, pageNumber, lastKey) => {
    if (!DBON) return [];

    const items = await docClient
        .query({
            TableName: tableName,
            IndexName: "idx-lastUpdated-index",
            KeyConditionExpression: "idx = :yyyy",
            ExpressionAttributeValues: {
                ":yyyy": "Node",
            },
            Limit: pageSize,
            ExclusiveStartKey: lastKey,
            ScanIndexForward: false,
        })
        .promise()
        .catch((err) => console.log(err));

    if (pageNumber > 0) {
        if (items.LastEvaluatedKey === undefined) return [];
        return getPaginatedTable(
            tableName,
            pageSize,
            pageNumber - 1,
            items.LastEvaluatedKey
        );
    }

    return items.Items;
};

const getFullTable = async (tableName, lastEvaluatedKey) => {
    const items = await docClient
        .scan({
            TableName: tableName,
            ExclusiveStartKey: lastEvaluatedKey,
        })
        .promise()
        .catch((err) => console.log(err));

    if (items.LastEvaluatedKey === undefined) return items.Items;
    return DBON
        ? [
              ...items.Items,
              ...(await getFullTable(tableName, items.LastEvaluatedKey)),
          ]
        : [];
};

const getItem = async (tableName, key) =>
    DBON
        ? await docClient
              .get({
                  TableName: tableName,
                  Key: key,
              })
              .promise()
              .then((data) => data.Item)
              .catch((err) => {
                  console.log(err);
                  return err;
              })
        : undefined;

const addItem = async (tableName, item) =>
    await docClient
        .put({ TableName: tableName, Item: item })
        .promise()
        .then(() => item)
        .catch((err) => {
            console.log(err);
            return err;
        });

const removeItem = async (tableName, key) =>
    await docClient
        .delete({ TableName: tableName, Key: key })
        .promise()
        .then(() => true)
        .catch((err) => {
            console.log(err);
            return err;
        });

const filter = async (tableName, arg, value) =>
    DBON
        ? await docClient
              .scan({
                  TableName: tableName,
                  ExpressionAttributeValues: {
                      ":r": value,
                  },
                  ExpressionAttributeNames: {
                      "#a": arg,
                  },
                  FilterExpression: `#a = :r`,
              })
              .promise()
              .then((data) => data.Items)
              .catch((err) => {
                  console.log(err);
                  return err;
              })
        : [];

const filterVisible = async (tableName, arg, value) =>
    DBON
        ? await docClient
              .scan({
                  TableName: tableName,
                  ExpressionAttributeValues: {
                      ":r": value,
                      ":t": true,
                  },
                  ExpressionAttributeNames: {
                      "#a": arg,
                      "#h": "hidden",
                  },
                  FilterExpression: `#a = :r AND #h <> :t AND pictureUnsafe <> :t`,
              })
              .promise()
              .then((data) => data.Items)
              .catch((err) => {
                  console.log(err);
                  return err;
              })
        : [];

module.exports = { databaseCalls };

// (async() => {
//     console.log(await databaseCalls.sortedNodes(20, 0, false));
// })();
