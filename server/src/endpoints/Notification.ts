// Nothing here I think

// export const getUnseenNotificationCount = async (accountScreenName: string) => {
//     return (
//         (
//             await docClient
//                 .scan({
//                     TableName: TABLES.NOTIFICATION_TABLE,
//                     FilterExpression: `#a = :a AND #b = :b`,
//                     ExpressionAttributeValues: {
//                         ":a": accountScreenName,
//                         ":b": false,
//                     },
//                     ExpressionAttributeNames: {
//                         "#a": "account",
//                         "#b": "seen",
//                     },
//                 })
//                 .promise()
//         ).Count ?? 0
//     );
// };
// createNotification: async (parent, args) => {
//     let account;
//     if (parent) {
//         account = parent;
//     } else {
//         account = await databaseCalls.getAccount(args.accountScreenName);
//         if (!account) {
//             throw new UserInputError(`Account doesn't exist!`, {
//                 invalidArgs: Object.keys(args),
//             });
//         }
//     }

//     const newNotification = {
//         ID: await uniqueID(databaseCalls.getNotification),
//         time: new Date().getTime(),
//         content: args.content,
//         link: args.link,
//         seen: false,
//         account: account.screenName,
//     };

//     return await databaseCalls.addNotification(newNotification);
// },
// seeNotification: async (parent, args) => {
//     throw new UserInputError(`No longer supported, sorry!`, {
//         invalidArgs: Object.keys(args),
//     });
//     // const notification = await databaseCalls.getNotification(
//     //     args.notificationID
//     // );

//     // if (!notification) {
//     //     throw new UserInputError(`Notification doesn't exist!`, {
//     //         invalidArgs: Object.keys(args),
//     //     });
//     // }
//     // notification.seen =
//     //     args.force !== undefined ? args.force : !notification.seen;

//     // return await databaseCalls.addNotification(notification);
// },
// clearNotifications: async (parent, args) => {
//     const account = await databaseCalls.getAccount(args.accountScreenName);
//     if (!account) {
//         throw new UserInputError(`Account doesn't exist!`, {
//             invalidArgs: Object.keys(args),
//         });
//     }
//     for (const { ID } of await AccountResolvers.notifications(
//         account.screenName
//     )) {
//         await databaseCalls.removeNotification(ID);
//     }
//     return true;
// },
