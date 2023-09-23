export const deepCopy = (object) => {
    if (typeof object !== "object") return object;
    if (object === null) return object;
    if (object.length !== undefined) return object.map(deepCopy);
    return Object.keys(object).reduce(
        (p, c) => ({ ...p, [c]: deepCopy(object[c]) }),
        {}
    );
};

export const splitIntoRows = (list, numPerRow) =>
    list.reduce(
        (p, c, i) =>
            i % numPerRow === 0
                ? [...p, [c]]
                : [...p.slice(0, -1), [...p[p.length - 1], c]],
        []
    );
