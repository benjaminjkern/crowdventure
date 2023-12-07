export const scramble = (list) => {
    const newList = [...list];
    for (const i in newList) {
        const r = Math.floor(Math.random() * list.length);
        const switcher = newList[r];
        newList[r] = newList[i];
        newList[i] = switcher;
    }
    return newList;
};

export const uniqueID = async (fetchFunc, prefix = "", upperCase = true) => {
    let ID;
    while (ID === undefined || (await fetchFunc(ID))) {
        ID = Math.random().toString(36).substring(2, 12);
        if (upperCase) ID = ID.toUpperCase();
        ID = `${prefix}${ID}`;
    }
    return ID;
};

// ABSOLUTELY FIX THIS AT SOME POINT BUT WHATEVER
export const encrypt = (word) => word;

const BAD_WORDS = new RegExp(
    ["nigg", "fag"].map((word) => word.split("").join(".{0,4}")).join("|")
);

export const flagContent = (content) =>
    typeof content === "string" &&
    content.toLowerCase().match(BAD_WORDS) !== null;

export const getIP = (context) => {
    return context?.headers?.["X-Forwarded-For"]?.split?.(",")?.[0]; // lol
};

// TODO: UNUSED
// const updateTime = async (
//     node,
//     time = new Date().getTime(),
//     seen = {},
//     first = true
// ) => {
//     if (seen[node.ID]) return;
//     console.log("Updating " + node.ID);
//     seen[node.ID] = true;
//     node.lastUpdated = time;
//     if (!first) databaseCalls.addNode(node);
//     const parents = await NodeResolvers.parents(node);
//     for (const parent of parents) {
//         updateTime(parent, time, seen, false);
//     }
// };
