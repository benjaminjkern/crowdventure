// ABSOLUTELY FIX THIS AT SOME POINT BUT WHATEVER
const encrypt = (word) => word;

// lil quick sort its neat
const sort = (list, compFunc) => {
    if (list.length === 0) return [];
    const tail = list.slice(1);
    let before = [],
        same = [],
        after = [];
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
    let newList = [...list];
    for (let i in newList) {
        const r = Math.floor(Math.random() * list.length);
        let switcher = newList[r];
        newList[r] = newList[i];
        newList[i] = switcher;
    }
    return newList;
};

const allConnected = async(node, visited = {}) => {
    const children = await resolvers.Node.canonChoices(node).then((choices) =>
        Promise.all(choices.map((choice) => resolvers.Choice.to(choice)))
    );
    let newVisited = {...visited, [node.ID]: node.ID };

    for (let childKey in children) {
        const child = children[childKey];
        if (!newVisited[child.ID] && !child.featured)
            newVisited = {
                ...newVisited,
                ...(await allConnected(child, newVisited)),
            };
    }
    return newVisited;
};
module.exports = { encrypt, sort, scramble, allConnected };