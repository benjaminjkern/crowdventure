// ABSOLUTELY FIX THIS AT SOME POINT BUT WHATEVER
const encrypt = (word) => word;

// lil quick sort its neat
const sort = (list, compFunc) => {
    if (list.length === 0) return [];
    const tail = list.slice(1);
    const before = [];
    const same = [];
    const after = [];
    tail.forEach((item) => {
        switch (compFunc(item, list[0])) {
            case -1:
                before.push(item);
                break;
            case 0:
                same.push(item);
                break;
            case 1:
                after.push(item);
                break;
        }
    });

    return [
        ...sort(before, compFunc),
        list[0],
        ...same,
        ...sort(after, compFunc),
    ];
};

const scramble = (list) => {
    const newList = [...list];
    for (const i in newList) {
        const r = Math.floor(Math.random() * list.length);
        const switcher = newList[r];
        newList[r] = newList[i];
        newList[i] = switcher;
    }
    return newList;
};

const uniqueID = async (fetchFunc, prefix = "", upperCase = true) => {
    let ID;
    while (ID === undefined || (await fetchFunc(ID))) {
        ID = Math.random().toString(36).substring(2, 12);
        if (upperCase) ID = ID.toUpperCase();
        ID = `${prefix}${ID}`;
    }
    return ID;
};

const BAD_WORDS = new RegExp(
    ["nigg", "fag"].map((word) => word.split("").join(".{0,4}")).join("|")
);

const flagContent = (content) =>
    typeof content === "string" &&
    content.toLowerCase().match(BAD_WORDS) !== null;

module.exports = { encrypt, sort, scramble, flagContent, uniqueID };
