import React from "react";
import GoogleAdList from "../components/GoogleAdList";
import NodeCard from "./NodeCard";
import { type Node } from "@/types/models";

const NodeViewer = ({
    nodes,
    onDeleteNode,
    onEditNode,
}: {
    readonly nodes: Node[];
    readonly onDeleteNode: (id: number) => void;
    readonly onEditNode: (node: Node) => void;
}) => (
    <GoogleAdList
        columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}
        data={nodes}
        render={(node, i) => (
            <NodeCard
                key={i}
                node={node as Node}
                onDeleteNode={() => onDeleteNode((node as Node).id)}
                onEditNode={onEditNode}
            />
        )}
        style={{
            marginTop: 5,
            marginBottom: 5,
        }}
    />
);

export default NodeViewer;
