import {
    type StoredChoice,
    type StoredAccount,
    type StoredNode,
} from "@/types/storedTypes";
import { TABLES, getItem } from "./databaseCalls";
import { type Account } from "@/types/models";

export const getAccount = async (screenName: string) =>
    await getItem<StoredAccount>(TABLES.ACCOUNT_TABLE, {
        screenName,
    });

// TODO: Look into serializing on aws side
export const serializeAccount = (account: StoredAccount) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encryptedPassword, ...smallAccount } = account;
    return smallAccount as Account;
};

export const getChoice = async (ID: string) =>
    await getItem<StoredChoice>(TABLES.CHOICE_TABLE, {
        ID,
    });

export const getNode = async (ID: string) => {
    // await addItem(SORTED_NODE_TABLE, {
    //     idx: "Node",
    //     ID: node.ID,
    //     lastUpdated:
    //         node.lastUpdated || new Date("September 16, 2020").getTime(),
    //     hidden: node.hidden || node.pictureUnsafe || false,
    //     featured: node.featured || false,
    // });
    return await getItem<StoredNode>(TABLES.NODE_TABLE, {
        ID,
    });
};

// sortedNodes: async (pageSize, pageNum, allowHidden) => {
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
