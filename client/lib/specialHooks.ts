import {
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
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
    const [fetched, setFetched] = useState(false);

    const { unsafeMode } = useContext(UnsafeModeContext);

    useEffect(() => {
        if (!unsafeMode) return;
        if (fetched) return;
        getUnsafeNodes().then((unsafeNodes) => {
            setNodesLists({
                ...nodesLists,
                allNodes: unsafeNodes,
            });
            setFetched(true);
        });
    });
    return [
        unsafeMode ? nodesLists.allNodes : nodesLists.safeNodes,
        setNodesLists,
    ] as [Node[], Dispatch<SetStateAction<SafeGuardedNodesLists>>];
};
