import React, { useContext } from "react";
import { UserContext } from "../../pages/_app";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";

// import ConfirmModal from "./Modals/ConfirmModal";

const NodePreview = ({ node }) => {
    const { user } = useContext(UserContext);

    const unsafeMode = false;

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
            dropdownOptions={[
                {
                    active: user && node.featured,
                    onClick: () => featurePage(node, node.featured),
                    disabled: user?.screenName !== node.owner.screenName,
                    text: `${node.featured ? "Un-f" : "F"}eature page`,
                },
                {
                    active: user && node.featured,
                    onClick: () => {},
                    // showModal(
                    //     <ConfirmModal
                    //         loggedInAs={loggedInAs}
                    //         close={() => showModal(undefined)}
                    //         onConfirm={() => deletePage(node)}
                    //         title="Delete Page"
                    //         content="This will erase all suggested choices of this page, and their associated scores. This will NOT delete sub-pages of this page. Are you sure you wish to continue?"
                    //     />
                    // ),
                    disabled: user?.screenName !== node.owner.screenName,
                    text: "Delete",
                },
                {
                    active: user && node.featured,
                    disabled: true,
                    text: "Make Private",
                },
                { active: user && node.featured },
                { onClick: () => reportNode(node.ID), text: "Report" },
                { active: user?.isAdmin },
                {
                    active: user?.isAdmin,
                    onClick: () => hidePage(node),
                    text: `${node.hidden ? "Un-h" : "H"}ide page`,
                },
            ]}
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
