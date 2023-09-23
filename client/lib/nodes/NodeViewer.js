import React from "react";

import NodePreview from "./NodePreview";

const NodeViewer = ({ nodes }) => (
    <div
        style={{
            marginTop: "5px",
            marginBottom: "5px",
            flexDirection: "row",
            flexWrap: "wrap",
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
    </div>
);

export default NodeViewer;
