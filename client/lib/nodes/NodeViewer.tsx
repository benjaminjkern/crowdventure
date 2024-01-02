import React from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}>
        <Masonry
            style={{
                marginTop: "5px",
                marginBottom: "5px",
            }}
        >
            {nodes.map((node, i) => (
                <NodeCard
                    key={i}
                    node={node}
                    onDeleteNode={() => onDeleteNode(node.id)}
                    onEditNode={onEditNode}
                />
            ))}
        </Masonry>
    </ResponsiveMasonry>
);

export default NodeViewer;
