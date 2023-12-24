import React, { useContext } from "react";
import { faMinusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "../accounts/AccountPreview";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCard from "../components/CrowdventureCard";
import { ModalContext } from "../modal";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { type NodeWithOwner } from "@/types/models";

// import ConfirmModal from "./Modals/ConfirmModal";

const NodePreview = ({ node }: { readonly node: NodeWithOwner }) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { unsafeMode } = useContext(UnsafeModeContext);

    const hideNode = async (hidden: boolean) => {
        const response = await apiClient.provide("patch", "/node/editNode", {
            id: node.id,
            hidden,
        });
    };

    const featureNode = async (featured: boolean) => {
        const response = await apiClient.provide("patch", "/node/editNode", {
            id: node.id,
            featured,
        });
    };
    const deleteNode = async () => {
        const response = await apiClient.provide("delete", "/node/deleteNode", {
            id: String(node.id),
        });
    };

    const userOwnsNode = user?.id === node.ownerId;

    return (
        <CrowdventureCard
            dropdownOptions={[
                {
                    active: Boolean(user),
                    onClick: () => featureNode(!node.featured),
                    disabled: !(user?.isAdmin || userOwnsNode),
                    text: `${node.featured ? "Un-f" : "F"}eature page`,
                },
                {
                    active: Boolean(user),
                    onClick: () => {
                        openModal(
                            <ConfirmModal
                                onConfirm={() => deleteNode()}
                                title="Delete Page"
                            >
                                This will erase all suggested choices of this
                                page, and their associated scores. This will NOT
                                delete sub-pages of this page. Are you sure you
                                wish to continue?
                            </ConfirmModal>
                        );
                    },
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    disabled: !(user?.isAdmin || userOwnsNode),
                    text: "Delete",
                },
                // {
                //     active: user,
                //     disabled: true,
                //     text: "Make Private",
                // },
                { active: Boolean(user) },
                // { onClick: () => reportNode(), text: "Report" },
                { active: user?.isAdmin },
                {
                    active: user?.isAdmin,
                    onClick: () => hideNode(!node.hidden),
                    text: `${node.hidden ? "Un-h" : "H"}ide page`,
                },
            ]}
            href={`/node/${node.slug}`}
            onImageError={() => {
                // Set to null so it doesnt keep trying to recall image
                node.pictureURL = null;
            }}
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
            picture={node.pictureURL ?? undefined}
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
