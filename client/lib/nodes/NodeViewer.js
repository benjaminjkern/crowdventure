import React from "react";

import NodePreview from "./NodePreview";

const NodeViewer = ({ nodes }) => {
    return (
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
                    <NodePreview node={node} key={i} />
                ))}
        </div>
    );
};

export default NodeViewer;
