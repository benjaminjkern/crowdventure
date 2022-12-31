import Link from "next/link";
import React, { useRef } from "react";
import AccountPreview from "../accounts/AccountPreview";
import { palette } from "../colorPalette";
import CrowdventureCard from "../components/CrowdventureCard";
import TooltipWrapper from "../components/TooltipWrapper";

// import ConfirmModal from "./Modals/ConfirmModal";

const NodePreview = ({ node }) => {
    const reportNode = (nodeID) => {
        // mutation_call(
        //     "createFeedback",
        //     {
        //         ...(loggedInAs
        //             ? { accountScreenName: loggedInAs.screenName }
        //             : {}),
        //         info: "This is inappropriate",
        //         reportingObjectType: "Node",
        //         reportingObjectID: nodeID,
        //     },
        //     { info: 0, reporting: 0 },
        //     () => {
        //         alert("Successfully reported page!");
        //         window.location.reload(false);
        //     }
        // );
    };

    const hidePage = (node) => {
        // mutation_call(
        //     "editNode",
        //     { nodeID: node.ID, hidden: !node.hidden },
        //     { title: 0 },
        //     () => window.location.reload(false)
        // );
    };

    const featurePage = (node, alreadyFeatured) => {
        // mutation_call(
        //     "editNode",
        //     { nodeID: node.ID, featured: !alreadyFeatured },
        //     { title: 0 },
        //     () => window.location.reload(false)
        // );
    };
    const deletePage = (node) => {
        // mutation_call("deleteNode", { nodeID: node.ID }, 0, () => {
        //     window.location.reload(false);
        // });
    };

    return (
        <CrowdventureCard
            href={`/node/${node.ID}`}
            picture={node.pictureURL}
            pictureUnsafe={node.pictureUnsafe}
            dropdownOptions={[]}
            text={node.title}
            overlayIcons={[
                {
                    active: node.featured,
                    tooltip: `This page has been starred by ${node.owner.screenName}!`,
                    icon: "stay",
                    iconColor: "yellow",
                },
                {
                    active: node.hidden,
                    tooltip: `This page is hidden, because it has been marked as unsafe! You can see it because you are ${
                        unsafeMode ? "in Unsafe Mode." : "the owner."
                    }`,
                    icon: "minus-circle",
                    iconColor: "red",
                },
            ]}
        >
            Author: <AccountPreview account={node.owner} />
            Views: {node.views}
        </CrowdventureCard>
    );
};

export default NodePreview;
