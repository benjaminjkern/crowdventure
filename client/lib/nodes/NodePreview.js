import React, { useContext } from "react";
import AccountPreview from "../accounts/AccountPreview";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCard from "../components/CrowdventureCard";
import { ModalContext } from "../modal";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";

// import ConfirmModal from "./Modals/ConfirmModal";

const NodePreview = ({ node }) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { unsafeMode } = useContext(UnsafeModeContext);

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
    const deleteNode = (node) => {
        // mutation_call("deleteNode", { nodeID: node.ID }, 0, () => {
        //     window.location.reload(false);
        // });
    };

    return (
        <CrowdventureCard
            dropdownOptions={[
                {
                    active: user && node.featured,
                    onClick: () => featurePage(node, node.featured),
                    disabled: user?.screenName !== node.owner.screenName,
                    text: `${node.featured ? "Un-f" : "F"}eature page`,
                },
                {
                    active: user && node.featured,
                    onClick: () => {
                        openModal(
                            <ConfirmModal
                                content={
                                    <span>
                                        This will erase all suggested choices of
                                        this page, and their associated scores.
                                        This will NOT delete sub-pages of this
                                        page. Are you sure you wish to continue?
                                    </span>
                                }
                                onConfirm={() => deleteNode(node)}
                                title="Delete Page"
                            />
                        );
                    },
                    // showModal(
                    //
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
            href={`/node/${node.ID}`}
            overlayIcons={[
                {
                    active: node.featured,
                    tooltip: `This page has been starred by ${node.owner.screenName}!`,
                    icon: "stay",
                    iconColor: "yellow",
                },
                {
                    active: node.hidden,
                    tooltip: (
                        <span>
                            This page is hidden, because it has been marked as
                            unsafe! You can see it because you are{" "}
                            {unsafeMode ? "in Unsafe Mode." : "the owner."}
                        </span>
                    ),
                    icon: "minus-circle",
                    iconColor: "red",
                },
            ]}
            picture={node.pictureURL}
            pictureUnsafe={node.pictureUnsafe}
            text={node.title}
        >
            <span
                style={{
                    gap: 5,
                }}
            >
                Author: <AccountPreview account={node.owner} scale={3 / 4} />
            </span>
            Views: {node.views}
        </CrowdventureCard>
    );
};

export default NodePreview;
