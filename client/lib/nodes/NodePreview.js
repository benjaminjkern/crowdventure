import React, { useContext } from "react";
import AccountPreview from "../accounts/AccountPreview";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCard from "../components/CrowdventureCard";
import { ModalContext } from "../modal";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import { faMinusCircle, faStar } from "@fortawesome/free-solid-svg-icons";

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

    const userOwnsNode = user?.screenName === node.owner.screenName;

    return (
        <CrowdventureCard
            dropdownOptions={[
                {
                    active: user,
                    onClick: () => featurePage(node, node.featured),
                    disabled: !(user?.isAdmin || userOwnsNode),
                    text: `${node.featured ? "Un-f" : "F"}eature page`,
                },
                {
                    active: user,
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
                    disabled: !(user?.isAdmin || userOwnsNode),
                    text: "Delete",
                },
                // {
                //     active: user,
                //     disabled: true,
                //     text: "Make Private",
                // },
                { active: user },
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
                    icon: faStar,
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
                    icon: faMinusCircle,
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
