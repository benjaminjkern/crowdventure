import React, { useState } from "react";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useDebounce } from "../hooks";
import { type Node } from "@/types/models";

const NodeSearch = ({
    onSelectNode,
    toNode,
}: {
    readonly onSelectNode: (node: Node) => void;
    readonly toNode: Node;
}) => {
    const [resultNodes, setResultNodes] = useState<Node[]>(undefined);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(toNode?.title);

    const selectNode = (node: Node) => {
        setQuery(node.title);
        setOpen(false);
        onSelectNode(node);
    };

    const searchNodes = useDebounce((newQuery) => {
        queryCall("searchNodes", NODE_PREVIEW_GQL, { query: newQuery }).then(
            setResultNodes
        );
    });

    if (!resultNodes) return <div>Loading...</div>;

    return (
        <>
            <CrowdventureTextInput
                onBlur={() => setOpen(false)}
                onChangeText={searchNodes}
                onFocus={() => setOpen(true)}
                placeholder="(Leave Empty to Create New Page)"
                value={query}
            />
            {open ? (
                <div style={{ maxHeight: 200 }}>
                    {resultNodes.map((node, i) => (
                        <div key={i} onClick={() => selectNode(node)}>
                            {node.title}
                            <AccountPreview account={node.owner} />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default NodeSearch;
