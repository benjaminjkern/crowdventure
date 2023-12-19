import { allNodes, addNode } from "+/server/api/databaseCalls";

void (async () => {
    const nodes = await allNodes();
    for (const node of nodes) {
        node.searchTitle = node.title.toLowerCase();
        await addNode(node);
    }
})();
