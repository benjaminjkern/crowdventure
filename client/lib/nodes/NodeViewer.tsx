import React from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NodePreview from "./NodePreview";
import { type Node } from "@/types/models";

const NodeViewer = ({ nodes }: { readonly nodes: Node[] }) => (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}>
        <Masonry
            style={{
                marginTop: "5px",
                marginBottom: "5px",
            }}
        >
            {nodes
                // .filter(
                //     (node) =>
                //         (loggedInAs &&
                //             (loggedInAs.unsafeMode ||
                //                 user.screenName ===
                //                     node.owner.screenName)) ||
                //         !node.hidden
                // )
                .map((node, i) => (
                    <NodePreview key={i} node={node} />
                ))}
        </Masonry>
    </ResponsiveMasonry>
);

export default NodeViewer;
