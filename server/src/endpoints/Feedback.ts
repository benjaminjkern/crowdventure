// export const reporting = async (parent) => {
//     if (!parent.reporting.type) return null;
//     switch (parent.reporting.type) {
//         case "Account":
//         case "Node":
//         case "Choice":
//             return parent.reporting.type + " : " + parent.reporting.ID;
//         default:
//     }

//     throw new Error("The parent's reporting object type is invalid");
// };

// createFeedback: async (parent, args, context) => {
//     let account;
//     if (args.accountScreenName) {
//         account = await databaseCalls.getAccount(args.accountScreenName);
//         if (!account) {
//             throw new UserInputError("That account doesnt exist!", {
//                 invalidArgs: Object.keys(args),
//             });
//         }
//     }

//     if (
//         (args.reportingObjectType !== undefined) !==
//         (args.reportingObjectID !== undefined)
//     ) {
//         throw new UserInputError(
//             "Invalid input, make sure you report both object type and ID",
//             {
//                 invalidArgs: Object.keys(args),
//             }
//         );
//     }

//     const IP = context.headers
//         ? context.headers["X-Forwarded-For"].split(",")[0]
//         : undefined;
//     const feedback = {
//         ID: await uniqueID(databaseCalls.getFeedback),
//         submittedBy: args.accountScreenName || "",
//         IP,
//         reporting: "",
//         dateCreated: new Date().toJSON(),
//         info: args.info,
//     };

//     if (args.reportingObjectType && args.reportingObjectID) {
//         feedback.reporting = {
//             type: args.reportingObjectType,
//             ID: args.reportingObjectID,
//         };

//         // Hide nodes and choices that are being reported
//         switch (args.reportingObjectType) {
//             case "Node":
//                 databaseCalls
//                     .getNode(args.reportingObjectID)
//                     .then((reporting) => {
//                         if (reporting.hidden === undefined)
//                             reporting.hidden = true;
//                         databaseCalls.addNode(reporting);
//                     });
//                 break;
//             case "Choice":
//                 databaseCalls
//                     .getChoice(args.reportingObjectID)
//                     .then((reporting) => {
//                         if (reporting.hidden === undefined)
//                             reporting.hidden = true;
//                         databaseCalls.addChoice(reporting);
//                     });
//                 break;
//         }
//     }
//     return await databaseCalls.addFeedback(feedback);
// },
