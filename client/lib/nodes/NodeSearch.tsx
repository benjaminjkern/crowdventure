import React, { useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { useDebounce } from "../hooks";
import apiClient from "../apiClient";
import { PaletteContext, type PaletteType } from "../colorPalette";
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
    const { backgroundColor } = useContext(PaletteContext);

    const selectNode = (node: Node | null) => {
        setQuery(node?.title ?? "");
        setOpen(false);
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
        <div style={{ position: "relative", zIndex: 1 }}>
            <CrowdventureTextInput
                includeClearButton
                onBlur={() => setTimeout(() => setOpen(false), 100)} // Delay this so it can register a click
                onChangeText={(newQuery) => {
                    if (newQuery.length === 0) return selectNode(null);
                    setOpen(true);
                    setQuery(newQuery);
                    setFetching(true);
                    searchNodes(newQuery);
                }}
                onFocus={() => {
                    if (query.length > 0) setOpen(true);
                }}
                placeholder="(Leave Empty to Create New Page)"
                value={query}
            />
            {open ? (
                <div
                    style={{
                        maxHeight: 300,
                        overflow: "scroll",
                        position: "absolute",
                        alignItems: "center",
                        padding: 5,
                        paddingTop: 33,
                        width: "100%",
                        zIndex: -1,
                        borderRadius: 10,
                        backgroundColor: backgroundColor[2],
                    }}
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
                </div>
            ) : null}
        </div>
    );
};

export default NodeSearch;
