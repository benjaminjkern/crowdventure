import React, { useContext } from "react";
import { faMinusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "../accounts/AccountPreview";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCard from "../components/CrowdventureCard";
import { ModalContext } from "../modal";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { type Node } from "@/types/models";

// import ConfirmModal from "./Modals/ConfirmModal";

const NodeCard = ({
    node,
    onDeleteNode,
    onEditNode,
}: {
    readonly node: Node;
    readonly onDeleteNode?: () => void;
    readonly onEditNode?: (newNode: Node) => void;
}) => {
    const { user } = useContext(UserContext);
    const { openModal, closeModal } = useContext(ModalContext);
    const { unsafeMode } = useContext(UnsafeModeContext);

    const hideNode = async (hidden: boolean) => {
        const response = await apiClient.provide("patch", "/node/editNode", {
            id: node.id,
            hidden,
        });
        if (response.status === "error") return alert(response.error.message);
        onEditNode?.(response.data);
    };

    const featureNode = async (featured: boolean) => {
        const response = await apiClient.provide("patch", "/node/editNode", {
            id: node.id,
            featured,
        });
        if (response.status === "error") return alert(response.error.message);
        onEditNode?.(response.data);
    };
    const deleteNode = async () => {
        const response = await apiClient.provide("delete", "/node/deleteNode", {
            id: String(node.id),
        });
        if (response.status === "error") return alert(response.error.message);

        onDeleteNode?.();
        closeModal();
    };

    const userOwnsNode = user?.id === node.ownerId;

    return (
        <CrowdventureCard
            dropdownOptions={[
                {
                    active: user?.isAdmin || userOwnsNode,
                    onClick: () => featureNode(!node.featured),
                    text: `${node.featured ? "Un-f" : "F"}eature page`,
                },
                {
                    active: user?.isAdmin || userOwnsNode,
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
                    text: "Delete",
                },
                { active: user?.isAdmin ?? false },
                {
                    active: user?.isAdmin ?? false,
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
                    tooltip: `This page has been starred by ${
                        node.owner?.screenName ?? "its owner"
                    }!`,
                    icon: faStar,
                    iconColor: "yellow",
                },
                {
                    active:
                        (node.hidden ||
                            node.owner?.hidden ||
                            node.pictureUnsafe) &&
                        !unsafeMode,
                    tooltip: (
                        <span>
                            This page is hidden, because it has been marked as
                            unsafe! You can see it because you are the owner.
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

export default NodeCard;
