import React from "react";

import NodePreview from "./NodePreview";
import LoadingBox from "../components/LoadingBox";

const NodeViewer = ({ nodes }) => {
    if (!nodes) return <LoadingBox />;

    return (
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
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
