import React, { useContext, useEffect, useState } from "react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";
import LikeDislikeController from "../components/LikeDislikeController";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { ModalContext } from "../modal";
import { EditChoiceModal } from "./ChoiceModal";
import { type Choice } from "@/types/models";

const ChoiceCard = ({ choice: initChoice }: { readonly choice: Choice }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);

    const [choice, setChoice] = useState(initChoice);
    const { openModal, closeAllModals } = useContext(ModalContext);

    useEffect(() => {
        setChoice(initChoice);
    }, [initChoice]);

    // const like = () => {
    //     if (!user) return;

    //     const oChoice = { ...choice };

    //     choice.dislikedBy = choice.dislikedBy.filter(
    //         (account) => account.screenName !== user?.screenName
    //     );

    //     if (choice.liked)
    //         choice.likedBy = choice.likedBy.filter(
    //             (account) => account.screenName !== user?.screenName
    //         );
    //     else choice.likedBy.push(user);

    //     setChoice({ ...choice });

    //     apiClient.provide("post", "")

    //     mutationCall(
    //         "likeSuggestion",
    //         { ID: 0 },
    //         {
    //             accountScreenName: user.screenName,
    //             choiceID: choice.ID,
    //         }
    //     ).catch(() => {
    //         setChoice(oChoice);
    //     });
    // };

    // const dislike = () => {
    //     if (!user) return;

    //     const oChoice = { ...choice };

    //     choice.likedBy = choice.likedBy.filter(
    //         (account) => account.screenName !== user?.screenName
    //     );

    //     if (choice.disliked)
    //         choice.dislikedBy = choice.dislikedBy.filter(
    //             (account) => account.screenName !== user?.screenName
    //         );
    //     else choice.dislikedBy.push(user);

    //     setChoice({ ...choice });

    //     mutationCall(
    //         "dislikeSuggestion",
    //         { ID: 0 },
    //         {
    //             accountScreenName: user.screenName,
    //             choiceID: choice.ID,
    //         }
    //     ).catch(() => {
    //         setChoice(oChoice);
    //     });
    // };

    const reactToChoice = async (like: boolean) => {
        const response = await apiClient.provide(
            "post",
            "/choice/reactToChoice",
            {
                id: choice.id,
                like: like === choice.reactionStatus ? null : like,
            }
        );
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
    };

    const deleteChoice = () => {
        apiClient.provide("delete", "/choice/deleteChoice", {
            id: String(choice.id),
        });
        // TODO: Do stuff after
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
                    onClick: deleteChoice,
                },
                {
                    disabled: !(
                        userIsAdmin ||
                        (choice.isCanon && userOwnsFromNode) ||
                        (!choice.isCanon && userOwnsChoice)
                    ),
                    text: "Edit",
                    onClick: () => {
                        openModal(<EditChoiceModal choice={choice} />);
                    },
                },
            ]}
            href={choice.toNode ? `/node/${choice.toNode.id}` : undefined}
            overlayIcons={[
                {
                    active: choiceHidden,
                    tooltip: (
                        <span>
                            This action is hidden, because it has been marked as
                            unsafe! You can see it because you are{" "}
                            {unsafeMode ? "in Unsafe Mode." : "the owner."}
                            {/* TODO: Lol not specifying the owner of the choice or the node */}
                        </span>
                    ),
                    icon: faMinusCircle,
                    iconColor: "red",
                },
                {
                    active: toNodeHidden,
                    tooltip: (
                        <span>
                            This page this action leads to is hidden, because it
                            has been marked as unsafe!
                            {!disabled ? (
                                ""
                            ) : (
                                <>
                                    {" "}
                                    You will be able to see it because you are{" "}
                                    {unsafeMode
                                        ? "in Unsafe Mode."
                                        : "the owner."}
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
                disliked={choice.reactionStatus === false}
                liked={choice.reactionStatus === true}
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
