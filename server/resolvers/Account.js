import databaseCalls from "../databaseCalls.js";

export const unseenNotifications = async (parent, args, context) => {
    if (
        !context.loggedInAccount?.isAdmin &&
        context.loggedInAccount?.screenName !== parent.screenName
    )
        return null; // No permission
    return await databaseCalls.getUnseenNotificationCount(parent.screenName);
};
