// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const deepCopy: <T>(object: T) => T = <T>(object: T) => {
    if (typeof object !== "object") return object;
    if (object === null) return object;
    if (object.length !== undefined) return object.map((o) => deepCopy<T>(o));
    return Object.keys(object).reduce(
        (p, c) => ({ ...p, [c]: deepCopy(object[c]) }),
        {}
    );
};

export const splitIntoRows = <T>(list: T[], numPerRow: number): T[][] =>
    list.reduce(
        (p, c, i) =>
            i % numPerRow === 0
                ? [...p, [c]]
                : [...p.slice(0, -1), [...p[p.length - 1], c]],
        []
    );
