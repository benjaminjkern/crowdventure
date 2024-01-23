import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import AccountPreview from "../accounts/AccountPreview";
import { useDebounce } from "../hooks";
import apiClient from "../apiClient";
import { type PaletteType } from "../colorPalette";
import SearchDropdown from "../components/SearchDropdown";
import { type Node } from "@/types/models";

const useStyles = createUseStyles(({ lightBackgroundColor }: PaletteType) => ({
    nodeClass: {
        cursor: "pointer",
        padding: 10,
        borderRadius: 5,
        "&:hover": {
            backgroundColor: lightBackgroundColor,
        },
    },
}));

const NodeSearch = ({
    onSelectNode,
    node: initNode,
}: {
    readonly onSelectNode: (node: Node | null) => void;
    readonly node: Node | null;
}) => {
    const [resultNodes, setResultNodes] = useState<Node[]>(
        initNode ? [initNode] : []
    );

    const [fetching, setFetching] = useState(false);
    const [query, setQuery] = useState(initNode?.title ?? "");

    const selectNode = (node: Node | null) => {
        setQuery(node?.title ?? "");
        setResultNodes(node ? [node] : []);
        onSelectNode(node);
    };

    const searchNodes = useDebounce(async (newQuery: string) => {
        const response = await apiClient.provide("get", "/node/searchNodes", {
            query: newQuery,
        });
        if (response.status === "error") return alert(response.error.message);
        setFetching(false);
        setResultNodes(response.data.nodes);
    });

    const { nodeClass } = useStyles();

    return (
        <SearchDropdown
            onChangeText={(newQuery) => {
                setQuery(newQuery);
                if (newQuery.length === 0) return selectNode(null);
                setFetching(true);
                searchNodes(newQuery);
            }}
            placeholder="(Leave Empty to Create New Page)"
            query={query}
        >
            {resultNodes.length ? (
                resultNodes.map((node, i) => (
                    <div
                        className={nodeClass}
                        key={i}
                        onClick={() => {
                            selectNode(node);
                        }}
                        style={{ width: "100%" }}
                    >
                        {node.title}
                        <AccountPreview
                            account={node.owner}
                            isLink={false}
                            scale={0.75}
                        />
                    </div>
                ))
            ) : fetching ? (
                <>Loading...</>
            ) : (
                <>No results!</>
            )}
        </SearchDropdown>
    );
};

export default NodeSearch;
