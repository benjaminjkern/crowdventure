export const deepCopy = (object) => {
    if (typeof object !== "object") return object;
    if (object === null) return object;
    if (object.length !== undefined) return object.map(deepCopy);
    return Object.keys(object).reduce(
        (p, c) => ({ ...p, [c]: deepCopy(object[c]) }),
        {}
    );
};
