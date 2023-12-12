// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const ACCOUNT_TABLE = "Accounts";
const NODE_TABLE = "Nodes2";
const CHOICE_TABLE = "Choices";
const FEEDBACK_TABLE = "Feedback";
const NOTIFICATION_TABLE = "Notifications";
const VIEW_TABLE = "Views";
const REACTION_TABLE = "Reactions";
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

    saveFullDbLocally: async () => {
        try {
            fs.mkdirSync("savedDb", {});
        } catch (err) {}

        for (const table of [
            ACCOUNT_TABLE,
            NODE_TABLE,
            CHOICE_TABLE,
            FEEDBACK_TABLE,
            NOTIFICATION_TABLE,
            VIEW_TABLE,
            REACTION_TABLE,
            SORTED_NODE_TABLE,
        ]) {
            fs.writeFileSync(
                `savedDb/${table}.json`,
                JSON.stringify(await getFullTable(table))
            );
        }
    },

    getAccount: async (accountScreenName) =>
        await getItem(ACCOUNT_TABLE, { screenName: accountScreenName }),
    getNode: async (nodeID) => await getItem(NODE_TABLE, { ID: nodeID }),
    getChoice: async (choiceID) =>
        await getItem(CHOICE_TABLE, { ID: choiceID }),
    getFeedback: async (feedbackID) =>
        await getItem(FEEDBACK_TABLE, { ID: feedbackID }),
    getReaction: async (reactionID) =>
        await getItem(REACTION_TABLE, { ID: reactionID }),
    getNotification: async (notificationID) =>
        await getItem(NOTIFICATION_TABLE, { ID: notificationID }),
    getView: async (viewID) => await getItem(VIEW_TABLE, { ID: viewID }),

    addAccount: async (account) => await addItem(ACCOUNT_TABLE, account),
    addNode: async (node) => {
        await addItem(SORTED_NODE_TABLE, {
            idx: "Node",
            ID: node.ID,
            lastUpdated:
                node.lastUpdated || new Date("September 16, 2020").getTime(),
            hidden: node.hidden || node.pictureUnsafe || false,
            featured: node.featured || false,
        });
        return await addItem(NODE_TABLE, node);
    },
    addChoice: async (choice) => await addItem(CHOICE_TABLE, choice),
    addFeedback: async (feedback) => await addItem(FEEDBACK_TABLE, feedback),
    addReaction: async (reaction) => await addItem(REACTION_TABLE, reaction),
    addNotification: async (notification) =>
        await addItem(NOTIFICATION_TABLE, notification),
    addView: async (view) => await addItem(VIEW_TABLE, view),

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
    removeReaction: async (reactionID) =>
        await removeItem(REACTION_TABLE, { ID: reactionID }),
    removeNotification: async (notificationID) =>
        await removeItem(NOTIFICATION_TABLE, { ID: notificationID }),

    // New calls

    getNodesOwnedByAccount: async (screenName) => {
        return await filter(NODE_TABLE, "owner", screenName);
    },
    getChoicesSuggestedByAccount: async (screenName) => {
        return await filter(CHOICE_TABLE, "suggestedBy", screenName);
    },
    getNotificationsForAccount: async (screenName) => {
        return await filter(NOTIFICATION_TABLE, "account", screenName);
    },
    getFeaturedNodesOwnedByAccount: async (screenName) => {
        return await multiFilter(NODE_TABLE, {
            ExpressionAttributeNames: {
                "#o": "owner",
            },
            ExpressionAttributeValues: {
                ":sn": screenName,
                ":t": true,
            },
            FilterExpression: `#o = :sn AND featured = :t`,
        });
    },
    getLikedByForChoice: async (choiceID) => {
        return await multiFilter(REACTION_TABLE, {
            ExpressionAttributeNames: {
                "#l": "like",
            },
            ExpressionAttributeValues: {
                ":ci": choiceID,
                ":t": true,
            },
            FilterExpression: `choice = :ci AND #l = :t`,
        });
    },
    getDisikedByForChoice: async (choiceID) => {
        return await multiFilter(REACTION_TABLE, {
            ExpressionAttributeNames: {
                "#l": "like",
            },
            ExpressionAttributeValues: {
                ":ci": choiceID,
                ":f": false,
            },
            FilterExpression: `choice = :ci AND #l = :f`,
        });
    },
    getReactionByAccountAndChoice: async (screenName, choiceID) => {
        return (
            await multiFilter(REACTION_TABLE, {
                ExpressionAttributeNames: {
                    "#c": "choice",
                    "#a": "account",
                },
                ExpressionAttributeValues: {
                    ":ci": choiceID,
                    ":sn": screenName,
                },
                FilterExpression: `#c = :ci AND #a = :sn`,
            })
        )[0];
    },
    getViewsForNode: async (nodeID) => {
        return await filter(VIEW_TABLE, "node", nodeID);
    },
    getCanonChoicesForNode: async (nodeID) => {
        return await multiFilter(CHOICE_TABLE, {
            ExpressionAttributeNames: {
                "#n": "from",
                "#ic": "isCanon",
            },
            ExpressionAttributeValues: {
                ":ni": nodeID,
                ":t": true,
            },
            FilterExpression: `#n = :ni AND #ic = :t`,
        });
    },
    getNonCanonChoicesForNode: async (nodeID) => {
        return await multiFilter(CHOICE_TABLE, {
            ExpressionAttributeNames: {
                "#n": "from",
                "#ic": "isCanon",
            },
            ExpressionAttributeValues: {
                ":ni": nodeID,
                ":f": false,
            },
            FilterExpression: `#n = :ni AND #ic = :f`,
        });
    },
    getViewByNodeAndIP: async (nodeID, IP) => {
        return await multiFilter(VIEW_TABLE, {
            ExpressionAttributeNames: {
                "#n": "node",
                "#ip": "IP",
            },
            ExpressionAttributeValues: {
                ":ni": nodeID,
                ":ip": IP,
            },
            FilterExpression: `#n = :ni AND #ip = :ip`,
        });
    },
    searchNodes: async (query, pageSize) => {
        return (
            (
                await docClient
                    .scan({
                        TableName: NODE_TABLE,
                        FilterExpression: `contains(#a, :r)`,
                        ExpressionAttributeValues: {
                            ":r": query,
                        },
                        ExpressionAttributeNames: {
                            "#a": "searchTitle",
                        },
                    })
                    .promise()
            ).Items.slice(0, pageSize) || []
        );
    },
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

// const removeMultiple = async (tableName, keys) =>
//     await docClient
//         .batchWrite({
//             RequestItems: {
//                 [tableName]: keys.map((key) => ({
//                     DeleteRequest: { Key: key },
//                 })),
//             },
//         })
//         .promise()
//         .then(() => true)
//         .catch((err) => {
//             console.log(err);
//             return err;
//         });

const multiFilter = async (tableName, filterExpression) => {
    if (!DBON) return [];

    return await docClient
        .scan({
            TableName: tableName,
            ...filterExpression,
        })
        .promise()
        .then((data) => data.Items)
        .catch((err) => {
            console.log(err);
            return err;
        });
};

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

export default databaseCalls;
