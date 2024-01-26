import React, { useContext, useEffect, useState } from "react";
import { faBookOpen, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";
import LikeDislikeController from "../components/LikeDislikeController";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { ModalContext } from "../modal";
import ConfirmModal from "../components/ConfirmModal";
import { PaletteContext } from "../colorPalette";
import { EditChoiceModal } from "./ChoiceModal";
import { type Choice } from "@/types/models";

const ChoiceCard = ({
    choice: initChoice,
    onEditChoice,
    onDeleteChoice,
}: {
    readonly choice: Choice;
    readonly onEditChoice?: (c: Choice) => unknown;
    readonly onDeleteChoice?: (c: Choice) => unknown;
}) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);

    const [choice, setChoice] = useState(initChoice);
    const { openModal, closeModal } = useContext(ModalContext);
    const { rootColor } = useContext(PaletteContext);

    useEffect(() => {
        setChoice(initChoice);
    }, [initChoice]);

    const reactionStatus = choice.reactions[0]?.like ?? null;

    const reactToChoice = async (like: boolean) => {
        const nextLike = like === reactionStatus ? null : like;
        const response = await apiClient.provide(
            "post",
            "/choice/reactToChoice",
            {
                id: choice.id,
                like: nextLike,
            }
        );
        if (response.status === "error") return alert(response.error.message);

        setChoice({
            ...choice,
            score: response.data.score,
            reactions: nextLike !== null ? [{ like: nextLike }] : [],
        });
    };

    const toggleCanon = async () => {
        const response = await apiClient.provide(
            "patch",
            "/choice/editChoice",
            {
                id: choice.id,
                isCanon: !choice.isCanon,
            }
        );
        if (response.status === "error") return alert(response.error.message);
        onEditChoice?.(response.data);
    };

    const deleteChoice = async () => {
        const response = await apiClient.provide(
            "delete",
            "/choice/deleteChoice",
            {
                id: String(choice.id),
            }
        );
        if (response.status === "error") return alert(response.error.message);
        onDeleteChoice?.(choice);
        closeModal();
    };

    // Hide hidden actions, but show if you
    // 1. are in unsafeMode,
    // 2. suggested the action, or
    // 3. own the page and the action is canon

    const choiceHidden = choice.hidden || (choice.suggestedBy?.hidden ?? false);
    const toNodeHidden =
        choice.toNode?.hidden || (choice.toNode?.owner?.hidden ?? false);
    const userIsAdmin = user?.isAdmin ?? false;
    const userOwnsChoice = user && choice.suggestedByAccountId === user.id;
    const userOwnsFromNode = user && choice.fromNode.ownerId === user.id;
    const userOwnsToNode = user && choice.toNode?.ownerId === user.id;
    if (
        choiceHidden &&
        !unsafeMode &&
        !userOwnsChoice &&
        !(userOwnsFromNode && choice.isCanon)
    )
        return;

    const disabled =
        !choice.toNode || (toNodeHidden && !unsafeMode && !userOwnsToNode);

    return (
        <CrowdventureCard
            disabled={disabled}
            dropdownOptions={[
                {
                    disabled: !(userIsAdmin || userOwnsFromNode),
                    text: `Make ${choice.isCanon ? "Nonc" : "C"}anon`,
                    onClick: () => toggleCanon(),
                },
                {
                    // TODO: Synchronize these permissions with the backend
                    disabled: !(
                        userIsAdmin ||
                        userOwnsFromNode ||
                        userOwnsChoice
                    ),
                    text: "Delete",
                    onClick: () => {
                        openModal(
                            <ConfirmModal
                                onConfirm={() => deleteChoice()}
                                title="Delete Choice"
                            >
                                This will erase this choice from this page, and
                                its associated score from all score tracking.
                                This will NOT delete the page this choice leads
                                to. Are you sure you wish to continue?
                            </ConfirmModal>
                        );
                    },
                },
                {
                    disabled: !(
                        userIsAdmin ||
                        (choice.isCanon && userOwnsFromNode) ||
                        (!choice.isCanon && userOwnsChoice)
                    ),
                    text: "Edit",
                    onClick: () => {
                        openModal(
                            <EditChoiceModal
                                choice={choice}
                                onEditChoice={setChoice}
                            />
                        );
                    },
                },
            ]}
            href={choice.toNode ? `/node/${choice.toNode.slug}` : undefined}
            overlayIcons={[
                {
                    active: choice.isCanon,
                    tooltip: (
                        <span>
                            This choice is &quot;canon&quot; in this story,
                            according to{" "}
                            {choice.fromNode.owner?.screenName ?? "the owner"}.
                        </span>
                    ),
                    icon: faBookOpen,
                    iconColor: rootColor[2],
                },
                {
                    active: choiceHidden && !unsafeMode,
                    tooltip: (
                        <span>
                            This choice is hidden, because it has been marked as
                            unsafe! You can see it because you are the owner.
                            {/* Lol not specifying the owner of the choice or the node,
                            but it doesnt really matter I guess */}
                        </span>
                    ),
                    icon: faMinusCircle,
                    iconColor: "red",
                },
                {
                    active: toNodeHidden && !unsafeMode,
                    tooltip: (
                        <span>
                            The page this choice leads to is hidden, because it
                            has been marked as unsafe!
                            {disabled ? (
                                ""
                            ) : (
                                <>
                                    {" "}
                                    You will be able to see it because you are
                                    the owner.
                                </>
                            )}
                        </span>
                    ),
                    icon: faMinusCircle,
                    iconColor: "red",
                },
            ]}
            text={choice.action}
        >
            <LikeDislikeController
                count={choice.score}
                disliked={reactionStatus === false}
                liked={reactionStatus === true}
                onClickDislike={() => reactToChoice(false)}
                onClickLike={() => reactToChoice(true)}
            />
            <span style={{ gap: 5, marginTop: 5 }}>
                Suggested By:{" "}
                <AccountPreview account={choice.suggestedBy} scale={3 / 4} />
            </span>
        </CrowdventureCard>
    );
};

export default ChoiceCard;
