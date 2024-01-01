import React from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NodeCard from "./NodeCard";
import { type Node } from "@/types/models";

const NodeViewer = ({ nodes }: { readonly nodes: Node[] }) => (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}>
        <Masonry
            style={{
                marginTop: "5px",
                marginBottom: "5px",
            }}
        >
            {nodes.map((node, i) => (
                <NodeCard key={i} node={node} />
            ))}
        </Masonry>
    </ResponsiveMasonry>
);

export default NodeViewer;
