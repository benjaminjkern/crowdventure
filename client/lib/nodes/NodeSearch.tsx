import React, { useState } from "react";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useDebounce } from "../hooks";
import apiClient from "../apiClient";
import { type Node } from "@/types/models";

const NodeSearch = ({
    onSelectNode,
    query: initQuery,
}: {
    readonly onSelectNode: (node: Node | null) => void;
    readonly query?: string;
}) => {
    const [resultNodes, setResultNodes] = useState<Node[]>([]);

    const [open, setOpen] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [query, setQuery] = useState(initQuery ?? "");

    const selectNode = (node: Node | null) => {
        setQuery(node?.title ?? "");
        setOpen(false);
        onSelectNode(node);
    };

    const searchNodes = useDebounce(async (newQuery: string) => {
        setFetching(true);
        const response = await apiClient.provide("get", "/node/searchNodes", {
            query: newQuery,
        });
        if (response.status === "error") return alert(response.error.message);
        setFetching(false);
        setResultNodes(response.data.nodes);
    });

    return (
        <>
            <CrowdventureTextInput
                onBlur={() => setOpen(false)}
                onChangeText={(newQuery) => {
                    if (newQuery.length === 0) return selectNode(null);
                    setOpen(true);
                    setQuery(newQuery);
                    searchNodes(newQuery);
                }}
                onFocus={() => {
                    if (query.length > 0) setOpen(true);
                }}
                placeholder="(Leave Empty to Create New Page)"
                value={query}
            />
            {open ? (
                fetching ? (
                    <>Loading...</>
                ) : (
                    <div style={{ maxHeight: 200 }}>
                        {resultNodes.map((node, i) => (
                            <div key={i} onClick={() => selectNode(node)}>
                                {node.title}
                                <AccountPreview account={node.owner} />
                            </div>
                        ))}
                    </div>
                )
            ) : null}
        </>
    );
};

export default NodeSearch;
