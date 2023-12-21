export const scramble = <T>(list: T[]) => {
    const newList = [...list];
    for (let i = 0; i < newList.length; i++) {
        const r = Math.floor(Math.random() * list.length);
        const switcher = newList[r];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newList[r] = newList[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newList[i] = switcher;
    }
    return newList;
};

export const uniqueID = async <T>(
    fetchFunc: (id: string) => Promise<T | undefined>,
    prefix = "",
    upperCase = true
) => {
    let ID;
    while (ID === undefined || (await fetchFunc(ID))) {
        ID = Math.random().toString(36).substring(2, 12);
        if (upperCase) ID = ID.toUpperCase();
        ID = `${prefix}${ID}`;
    }
    return ID;
};

// ABSOLUTELY FIX THIS AT SOME POINT BUT WHATEVER
export const encrypt = (word: string) => word;

const BAD_WORDS = new RegExp(
    ["nigg", "fag"].map((word) => word.split("").join(".{0,4}")).join("|")
);

export const flagContent = (content: string) =>
    content.toLowerCase().match(BAD_WORDS) !== null;
