import React, { useState, useEffect } from "react";
import AccountPreview from "../accounts/AccountPreview";
import { queryCall } from "../apiUtils";
import CrowdventureTextInput from "../components/CrowdventureTextInput";

const NodeSearch = ({ callback, toID }) => {
    const [allNodes, setAllNodes] = useState(undefined);
    const [options, setOptions] = useState([]);
    const [toNode, setToNode] = useState(undefined);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const processNodeTitle = (newQuery) => {
        setOptions(
            allNodes.filter((node) => {
                return (
                    !newQuery.length ||
                    node.title.toLowerCase().includes(newQuery.toLowerCase()) ||
                    node.owner.screenName
                        .toLowerCase()
                        .includes(newQuery.toLowerCase())
                );
            })
        );
        setQuery(newQuery);
    };

    const selectNode = (node) => {
        setQuery(node.title);
        setOpen(false);
    };

    useEffect(() => {
        if (toID) {
            queryCall("getNode", { title: 0, ID: 0 }, { ID: toID }).then(
                setToNode
            );
        }

        queryCall(
            "allNodes",
            { title: 0, owner: { screenName: 0, profilePicURL: 0 }, ID: 0 },
            (res) => setAllNodes(res)
        ).then(setAllNodes);
    }, []);

    if (!allNodes) return <div>Loading...</div>;

    return (
        <>
            <CrowdventureTextInput
                placeholder="(Leave Empty to Create New Page)"
                value={query}
                onChangeText={processNodeTitle}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            />
            {open && (
                <div style={{ maxHeight: 200 }}>
                    {options.map((node, i) => (
                        <div onClick={() => selectNode(node)} key={i}>
                            {node.title}
                            <AccountPreview account={node.owner} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default NodeSearch;
