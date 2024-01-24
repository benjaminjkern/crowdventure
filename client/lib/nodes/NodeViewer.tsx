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
}) => {
    const splitNodes1 = nodes.slice(0, Math.floor(nodes.length / 2));
    const splitNodes2 = nodes.slice(Math.floor(nodes.length / 2));
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}>
        <Masonry
            style={{
                marginTop: 5,
                marginBottom: 5,
            }}
        >
            {splitNodes1.map((node, i) => (
                <NodeCard
                    key={i}
                    node={node}
                    onDeleteNode={() => onDeleteNode(node.id)}
                    onEditNode={onEditNode}
                />
            ))}
            <script
                async
                crossOrigin="anonymous"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3556492457867678"
            />
            <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-3556492457867678"
                data-ad-format="fluid"
                data-ad-layout-key="-73+ez-1k-38+c0"
                data-ad-slot="8616021842"
                // @ts-ignore
                style="display:block" // eslint-disable-line
            />
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            {splitNodes2.map((node, i) => (
                <NodeCard
                    key={i}
                    node={node}
                    onDeleteNode={() => onDeleteNode(node.id)}
                    onEditNode={onEditNode}
                />
            ))}
        </Masonry>
    </ResponsiveMasonry>;
};

export default NodeViewer;
