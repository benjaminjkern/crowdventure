import databaseCalls from "./databaseCalls.js";

(async () => {
    const nodes = await databaseCalls.allNodes();
    for (const node of nodes) {
        node.searchTitle = node.title.toLowerCase();
        await databaseCalls.addNode(node);
    }
})();
