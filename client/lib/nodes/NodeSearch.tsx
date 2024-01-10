import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useDebounce } from "../hooks";
import apiClient from "../apiClient";
import { type PaletteType } from "../colorPalette";
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

    const { nodeClass } = useStyles();

    return (
        <>
            <CrowdventureTextInput
                onBlur={() => setTimeout(() => setOpen(false), 100)} // Delay this so it can register a click
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
                    <div
                        style={{
                            maxHeight: 200,
                            overflow: "auto",
                            margin: 5,
                        }}
                    >
                        {resultNodes.map((node, i) => (
                            <div
                                className={nodeClass}
                                key={i}
                                onClick={() => {
                                    selectNode(node);
                                }}
                            >
                                {node.title}
                                <AccountPreview
                                    account={node.owner}
                                    isLink={false}
                                    scale={0.75}
                                />
                            </div>
                        ))}
                    </div>
                )
            ) : null}
        </>
    );
};

export default NodeSearch;
