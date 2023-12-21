// const ACCOUNTS = require("./mock-data/mockAccounts.js").MOCK_ACCOUNTS;
// const NODES = require("./mock-data/mockNodes.js").MOCK_NODES;
// const CHOICES = require("./mock-data/mockChoices.js").MOCK_CHOICES;

import AWS from "aws-sdk";
import {
    type AttributeMap,
    type PutItemInputAttributeMap,
} from "aws-sdk/clients/dynamodb";
import fs from "fs";

AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

export enum TABLES {
    ACCOUNT_TABLE = "Accounts",
    NODE_TABLE = "Nodes2",
    CHOICE_TABLE = "Choices",
    FEEDBACK_TABLE = "Feedback",
    NOTIFICATION_TABLE = "Notifications",
    VIEW_TABLE = "Views",
    REACTION_TABLE = "Reactions",
    SORTED_NODE_TABLE = "SortedNodes",
}

export const saveFullDbLocally = async () => {
    try {
        fs.mkdirSync("savedDb", {});
    } catch (err) {}

    for (const table of Object.keys(TABLES)) {
        fs.writeFileSync(
            `savedDb/${table}.json`,
            JSON.stringify(await getFullTable(table as TABLES))
        );
    }
};

//     sortedNodes: async (pageSize, pageNum, allowHidden) => {
//         if (allowHidden)
//             return await getPaginatedTable(
//                 SORTED_NODE_TABLE,
//                 pageSize,
//                 pageNum
//             );
//         return await getPaginatedFilteredTable(
//             SORTED_NODE_TABLE,
//             pageSize,
//             pageNum,
//             "hidden",
//             false
//         );
//         // if (allowHidden) return await getPaginatedFilteredTable(SORTED_NODE_TABLE, pageSize, pageNum, 'featured', true);
//         // return await getPaginatedFilteredVisibleTable(SORTED_NODE_TABLE, pageSize, pageNum, 'featured', true);
//     },
//     randomNode: async (max = 1000, allowHidden) => {
//         let recentNodes;
//         if (allowHidden) {
//             recentNodes = await getPaginatedTable(SORTED_NODE_TABLE, max, 0);
//         } else {
//             recentNodes = await getPaginatedFilteredTable(
//                 SORTED_NODE_TABLE,
//                 max,
//                 0,
//                 "hidden",
//                 false
//             );
//         }
//         return recentNodes[Math.floor(Math.random() * recentNodes.length)];
//     },

//     // New calls

//     getReactionByAccountAndChoice: async (screenName, choiceID) => {
//         return (
//             await multiFilter(REACTION_TABLE, {
//                 ExpressionAttributeNames: {
//                     "#c": "choice",
//                     "#a": "account",
//                 },
//                 ExpressionAttributeValues: {
//                     ":ci": choiceID,
//                     ":sn": screenName,
//                 },
//                 FilterExpression: `#c = :ci AND #a = :sn`,
//             })
//         )[0];
//     },
//     getViewByNodeAndIP: async (nodeID, IP) => {
//         return await multiFilter(VIEW_TABLE, {
//             ExpressionAttributeNames: {
//                 "#n": "node",
//                 "#ip": "IP",
//             },
//             ExpressionAttributeValues: {
//                 ":ni": nodeID,
//                 ":ip": IP,
//             },
//             FilterExpression: `#n = :ni AND #ip = :ip`,
//         });
//     },

//     //-------------- Definitely using

// };

// const getPaginatedFilteredTable = async (
//     tableName,
//     pageSize,
//     pageNumber,
//     arg,
//     value,
//     lastKey,
//     limit
// ) => {
//     if (!DBON) return [];

//     const items = await docClient
//         .query({
//             TableName: tableName,
//             IndexName: "idx-lastUpdated-index",
//             KeyConditionExpression: "idx = :yyyy",
//             FilterExpression: `#a = :r`,
//             ExpressionAttributeValues: {
//                 ":yyyy": "Node",
//                 ":r": value,
//             },
//             ExpressionAttributeNames: {
//                 "#a": arg,
//             },
//             Limit: limit || pageSize,
//             ExclusiveStartKey: lastKey,
//             ScanIndexForward: false,
//         })
//         .promise()
//         .catch((err) => console.log(err));

//     if (items.Count < (limit || pageSize)) {
//         if (pageNumber > 0) {
//             if (items.LastEvaluatedKey === undefined) return [];
//             return await getPaginatedFilteredTable(
//                 tableName,
//                 pageSize,
//                 pageNumber - 1,
//                 arg,
//                 value,
//                 items.LastEvaluatedKey
//             );
//         }
//         if (items.LastEvaluatedKey === undefined) return items.Items;
//         return [
//             ...items.Items,
//             ...(await getPaginatedFilteredTable(
//                 tableName,
//                 pageSize,
//                 pageNumber,
//                 arg,
//                 value,
//                 items.LastEvaluatedKey,
//                 (limit || pageSize) - items.Count
//             )),
//         ];
//     }

//     if (pageNumber > 0) {
//         if (items.LastEvaluatedKey === undefined) return [];
//         return await getPaginatedFilteredTable(
//             tableName,
//             pageSize,
//             pageNumber - 1,
//             arg,
//             value,
//             items.LastEvaluatedKey
//         );
//     }

//     return items.Items;
// };

// const getPaginatedTable = async (tableName, pageSize, pageNumber, lastKey) => {
//     if (!DBON) return [];

//     const items = await docClient
//         .query({
//             TableName: tableName,
//             IndexName: "idx-lastUpdated-index",
//             KeyConditionExpression: "idx = :yyyy",
//             ExpressionAttributeValues: {
//                 ":yyyy": "Node",
//             },
//             Limit: pageSize,
//             ExclusiveStartKey: lastKey,
//             ScanIndexForward: false,
//         })
//         .promise()
//         .catch((err) => console.log(err));

//     if (pageNumber > 0) {
//         if (items.LastEvaluatedKey === undefined) return [];
//         return getPaginatedTable(
//             tableName,
//             pageSize,
//             pageNumber - 1,
//             items.LastEvaluatedKey
//         );
//     }

//     return items.Items;
// };

export const addItem = async <T>(tableName: TABLES, item: T) =>
    await docClient
        .put({ TableName: tableName, Item: item as PutItemInputAttributeMap })
        .promise()
        .then(() => item);

//     addNode: async (node) => {
//         await addItem(SORTED_NODE_TABLE, {
//             idx: "Node",
//             ID: node.ID,
//             lastUpdated:
//                 node.lastUpdated || new Date("September 16, 2020").getTime(),
//             hidden: node.hidden || node.pictureUnsafe || false,
//             featured: node.featured || false,
//         });
//         return await addItem(NODE_TABLE, node);
//     },

type GetFullTableOptions = {
    lastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
    filters?: Record<string, unknown>;
};

export const getFullTable: (
    tableName: TABLES,
    options?: GetFullTableOptions
) => Promise<AttributeMap[]> = async (
    tableName,
    { lastEvaluatedKey, filters } = {}
) => {
    let filterExpression = {};
    if (filters) {
        const filterExpressionsList = [];
        const keys = Object.keys(filters);
        if (keys.length > 26) throw new Error("DONT DO THAT MANY FILTERS");

        filterExpression = {
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
        };

        for (let k = 0; k <= keys.length; k++) {
            const variable = String.fromCharCode(97 + k);
            const key = keys[k];
            // @ts-ignore
            filterExpression.ExpressionAttributeNames[`#${variable}`] = key; // eslint-disable-line
            // @ts-ignore
            filterExpression.ExpressionAttributeValues[`:${variable}`] = // eslint-disable-line
                // @ts-ignore
                filters[key];
            filterExpressionsList.push(`#${variable} = :${variable}`);
        }
        // @ts-ignore
        filterExpression.FilterExpression = filterExpressionsList.join(" AND ");
    }
    const { Items, LastEvaluatedKey } = await docClient
        .scan({
            TableName: tableName,
            ExclusiveStartKey: lastEvaluatedKey,
            ...filterExpression,
        })
        .promise();

    const items = (Items ?? []) as AttributeMap[];

    if (LastEvaluatedKey === undefined) return items;
    return [
        ...items,
        ...(await getFullTable(tableName, {
            lastEvaluatedKey: LastEvaluatedKey,
            filters,
        })),
    ];
};

export const getItem = async <T>(
    tableName: TABLES,
    key: AWS.DynamoDB.DocumentClient.Key
) =>
    await docClient
        .get({
            TableName: tableName,
            Key: key,
        })
        .promise()
        .then((data) => data.Item as T | undefined);

export const removeItem = async (
    tableName: TABLES,
    key: AWS.DynamoDB.DocumentClient.Key
) =>
    await docClient
        .delete({ TableName: tableName, Key: key })
        .promise()
        .then(() => true);

// // const removeMultiple = async (tableName, keys) =>
// //     await docClient
// //         .batchWrite({
// //             RequestItems: {
// //                 [tableName]: keys.map((key) => ({
// //                     DeleteRequest: { Key: key },
// //                 })),
// //             },
// //         })
// //         .promise()
// //         .then(() => true)
// //         .catch((err) => {
// //             console.log(err);
// //             return err;
// //         });

export const getUnseenNotificationCount = async (accountScreenName: string) => {
    return (
        (
            await docClient
                .scan({
                    TableName: TABLES.NOTIFICATION_TABLE,
                    FilterExpression: `#a = :a AND #b = :b`,
                    ExpressionAttributeValues: {
                        ":a": accountScreenName,
                        ":b": false,
                    },
                    ExpressionAttributeNames: {
                        "#a": "account",
                        "#b": "seen",
                    },
                })
                .promise()
        ).Count ?? 0
    );
};

export const searchNodes = async (query: string, pageSize: number) => {
    return (
        (
            await docClient
                .scan({
                    TableName: TABLES.NODE_TABLE,
                    FilterExpression: `contains(#a, :r)`,
                    ExpressionAttributeValues: {
                        ":r": query.toLowerCase(),
                    },
                    ExpressionAttributeNames: {
                        "#a": "searchTitle",
                    },
                })
                .promise()
        ).Items?.slice(0, pageSize) ?? []
    );
};
