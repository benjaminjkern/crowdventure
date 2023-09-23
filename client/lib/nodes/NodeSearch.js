import React, { useState, useEffect } from "react";
import AccountPreview from "../accounts/AccountPreview";
import { queryCall } from "../apiUtils";
import CrowdventureTextInput from "../components/CrowdventureTextInput";

const NodeSearch = ({ onSelectNode, toNode }) => {
    const [allNodes, setAllNodes] = useState(undefined);
    const [options, setOptions] = useState([]);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(toNode?.title);

    const processNodeTitle = (newQuery) => {
        setOptions(
            allNodes.filter(
                (node) =>
                    !newQuery.length ||
                    node.title.toLowerCase().includes(newQuery.toLowerCase()) ||
                    node.owner.screenName
                        .toLowerCase()
                        .includes(newQuery.toLowerCase())
            )
        );
        setQuery(newQuery);
    };

    const selectNode = (node) => {
        setQuery(node.title);
        setOpen(false);
        onSelectNode(node);
    };

    useEffect(() => {
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
                onBlur={() => setOpen(false)}
                onChangeText={processNodeTitle}
                onFocus={() => setOpen(true)}
                placeholder="(Leave Empty to Create New Page)"
                value={query}
            />
            {open ? (
                <div style={{ maxHeight: 200 }}>
                    {options.map((node, i) => (
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
