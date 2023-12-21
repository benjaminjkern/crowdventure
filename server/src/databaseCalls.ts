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
    filterExpressions?: Record<string, (v: string, a: string) => string>;
    amount?: number;
    scanLimit?: number;
};

type PaginatedResults<T> = {
    results: T[];
    lastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
};

const getFilterExpressionFromFilters = (
    filters?: Record<string, unknown>,
    filterExpressions?: Record<string, (v: string, a: string) => string>
) => {
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
        const key = keys[k]!;
        if (filters[key] === undefined) continue;
        // @ts-ignore
        filterExpression.ExpressionAttributeNames[`#${variable}`] = key; // eslint-disable-line
        // @ts-ignore
        filterExpression.ExpressionAttributeValues[`:${variable}`] = // eslint-disable-line
            filters[key];
        filterExpressionsList.push(
            filterExpressions?.[key]?.(`#${variable}`, `:${variable}`) ??
                `#${variable} = :${variable}`
        );
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
    const {
        filters,
        filterExpressions,
        amount = -1,
        scanLimit = 100,
    } = options;
    const filterExpression = getFilterExpressionFromFilters(
        filters,
        filterExpressions
    );
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

export const deleteMany = async <T extends AWS.DynamoDB.DocumentClient.Key>(
    tableName: TABLES,
    filters: Record<string, string>,
    forEach?: (t: T) => Promise<unknown>
) => {
    const { results: itemsToDelete } = await getMany<T>(tableName, { filters });

    if (forEach) await Promise.all(itemsToDelete.map(forEach));

    return await docClient
        .batchWrite({
            RequestItems: {
                [tableName]: itemsToDelete.map((key) => ({
                    DeleteRequest: { Key: key },
                })),
            },
        })
        .promise()
        .then(() => true)
        .catch(() => false);
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
