import { useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "./unsafeMode";
import { type Node } from "@/types/models";

type SafeGuardedNodesLists = {
    safeNodes: Node[];
    allNodes: Node[];
};

export const useSafeGuardedNodes = (
    safeNodes: Node[],
    getUnsafeNodes: () => Promise<Node[]>
) => {
    const [nodesLists, setNodesLists] = useState<SafeGuardedNodesLists>({
        safeNodes,
        allNodes: [],
    });

    const { unsafeMode } = useContext(UnsafeModeContext);

    useEffect(() => {
        if (!unsafeMode) return;
        if (nodesLists.allNodes.length) return;
        getUnsafeNodes().then((unsafeNodes) => {
            setNodesLists({
                ...nodesLists,
                allNodes: unsafeNodes,
            });
        });
    });
    return unsafeMode ? nodesLists.allNodes : nodesLists.safeNodes;
};
