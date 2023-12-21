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
export const docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
});

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
            JSON.stringify(await getMany(table as TABLES))
        );
    }
};

type GetManyOptions = {
    filters?: Record<string, unknown>;
    amount?: number;
    scanLimit?: number;
};

type PaginatedResults<T> = {
    results: T[];
    lastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
};

const getFilterExpressionFromFilters = (filters?: Record<string, unknown>) => {
    if (!filters) return {};
    const filterExpressionsList = [];
    const keys = Object.keys(filters);
    if (keys.length > 26)
        throw new Error(
            "DONT DO THAT MANY FILTERS (Right now relying on a-z, lol)"
        );

    const filterExpression = {
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
    return filterExpression;
};

export const getMany = async <T>(
    tableName: TABLES,
    options: GetManyOptions = {},
    lastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<PaginatedResults<T>> => {
    const { filters, amount = -1, scanLimit = 100 } = options;
    const filterExpression = getFilterExpressionFromFilters(filters);
    const { Items, LastEvaluatedKey } = await docClient
        .query({
            TableName: tableName,
            Limit: scanLimit,
            ExclusiveStartKey: lastEvaluatedKey,
            ...filterExpression,
        })
        .promise();

    const items = (Items ?? []) as T[];

    if (amount < 0) {
        if (LastEvaluatedKey === undefined) return { results: items };
    } else {
        if (items.length >= amount || LastEvaluatedKey === undefined)
            return {
                results: items.slice(0, amount),
                lastEvaluatedKey: LastEvaluatedKey,
            };
    }

    const { results, lastEvaluatedKey: finalKey } = await getMany<T>(
        tableName,
        { ...options, amount: amount < 0 ? -1 : amount - items.length },
        LastEvaluatedKey
    );
    return { results: [...items, ...results], lastEvaluatedKey: finalKey };
};

export const addItem = async <T>(tableName: TABLES, item: T) =>
    await docClient
        .put({ TableName: tableName, Item: item as PutItemInputAttributeMap })
        .promise()
        .then(() => item);

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

export const deleteItem = async (
    tableName: TABLES,
    key: AWS.DynamoDB.DocumentClient.Key
) =>
    await docClient
        .delete({ TableName: tableName, Key: key })
        .promise()
        .then(() => true)
        .catch(() => false);

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
