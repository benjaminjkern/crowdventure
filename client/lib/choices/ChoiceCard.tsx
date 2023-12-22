import React, { useContext, useEffect, useState } from "react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";
import LikeDislikeController from "../components/LikeDislikeController";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import { type Choice } from "@/types/models";

const ChoiceCard = ({ choice: initChoice }: { readonly choice: Choice }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);

    const [choice, setChoice] = useState(initChoice);

    useEffect(() => {
        setChoice(initChoice);
    }, [initChoice]);

    const like = () => {
        if (!user) return;

        const oChoice = { ...choice };

        choice.dislikedBy = choice.dislikedBy.filter(
            (account) => account.screenName !== user?.screenName
        );

        if (choice.liked)
            choice.likedBy = choice.likedBy.filter(
                (account) => account.screenName !== user?.screenName
            );
        else choice.likedBy.push(user);

        setChoice({ ...choice });

        mutationCall(
            "likeSuggestion",
            { ID: 0 },
            {
                accountScreenName: user.screenName,
                choiceID: choice.ID,
            }
        ).catch(() => {
            setChoice(oChoice);
        });
    };

    const dislike = () => {
        if (!user) return;

        const oChoice = { ...choice };

        choice.likedBy = choice.likedBy.filter(
            (account) => account.screenName !== user?.screenName
        );

        if (choice.disliked)
            choice.dislikedBy = choice.dislikedBy.filter(
                (account) => account.screenName !== user?.screenName
            );
        else choice.dislikedBy.push(user);

        setChoice({ ...choice });

        mutationCall(
            "dislikeSuggestion",
            { ID: 0 },
            {
                accountScreenName: user.screenName,
                choiceID: choice.ID,
            }
        ).catch(() => {
            setChoice(oChoice);
        });
    };

    const makeCanon = (choiceID) => {
        mutationCall("makeCanon", { choiceID }, { ID: 0 }).then(() => {
            // Refresh page
        });
    };

    const makeNonCanon = (choiceID) => {
        mutationCall("makeNonCanon", { choiceID }, { ID: 0 }).then(() => {
            // Refresh page
        });
    };

    const removeSuggestion = (choiceID) => {
        mutationCall("removeSuggestion", { choiceID }).then(() => {
            // Refresh page
        });
    };

    // Hide hidden actions, but show if you
    // 1. are in unsafeMode,
    // 2. suggested the action, or
    // 3. own the page and the action is canon
    if (
        (choice.hidden || choice.suggestedBy.hidden) &&
        !(
            unsafeMode ||
            choice.suggestedBy.screenName === user?.screenName ||
            (choice.canon && choice.from.owner.screenName === user?.screenName)
        )
    )
        return;

    const disabled =
        !choice.to ||
        ((choice.to.hidden || choice.to.owner.hidden) &&
            (!user ||
                (!unsafeMode &&
                    choice.to.owner.screenName !== user.screenName)));

    return (
        <CrowdventureCard
            disabled={disabled}
            dropdownOptions={[
                {
                    disabled: !(
                        user?.isAdmin ||
                        user?.screenName === choice.from.owner.screenName
                    ),
                    text: `Make ${choice.canon ? "Nonc" : "C"}anon`,
                    onClick: () =>
                        choice.canon
                            ? makeNonCanon(choice.ID)
                            : makeCanon(choice.ID),
                },
                {
                    disabled: !(
                        user?.isAdmin ||
                        user?.screenName === choice.from.owner.screenName ||
                        user?.screenName === choice.suggestedBy.screenName
                    ),
                    text: "Delete",
                    onClick: () => removeSuggestion(choice.ID),
                },
                {
                    disabled: !(
                        user?.isAdmin ||
                        (choice.canon &&
                            user?.screenName ===
                                choice.from.owner.screenName) ||
                        (!choice.canon &&
                            user?.screenName === choice.suggestedBy.screenName)
                    ),
                    text: "Edit",
                    onClick: () => {
                        // showModal(
                        //     <EditChoiceModal
                        //         choice={choice}
                        //         loggedInAs={loggedInAs}
                        //         fromNode={node}
                        //         close={() =>
                        //             showModal(undefined)
                        //         }
                        //     />
                        // )
                    },
                },
                {},
                { onClick: () => reportSuggestion(choice.ID), text: "Report" },
            ]}
            href={`/node/${choice.to.ID}`}
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                })
            }
            overlayIcons={[
                {
                    active: choice.hidden || choice.suggestedBy.hidden,
                    tooltip: (
                        <span>
                            This action is hidden, because it has been marked as
                            unsafe! You can see it because you are{" "}
                            {unsafeMode ? "in Unsafe Mode." : "the owner."}
                        </span>
                    ),
                    icon: faMinusCircle,
                    iconColor: "red",
                },
                {
                    active:
                        !choice.hidden &&
                        choice.to &&
                        (choice.to.hidden || choice.to.owner.hidden) &&
                        !disabled,
                    tooltip: (
                        <span>
                            This page this action leads to is hidden, because it
                            has been marked as unsafe! You will be able to see
                            it because you are{" "}
                            {unsafeMode ? "in Unsafe Mode." : "the owner."}
                        </span>
                    ),
                    icon: faMinusCircle,
                    iconColor: "red",
                },
            ]}
            text={choice.action} // { active, tooltip, icon, iconColor }
        >
            <LikeDislikeController
                count={choice.score}
                dislike={dislike}
                disliked={choice.disliked}
                like={like}
                liked={choice.liked}
            />
            <span style={{ gap: 5, marginTop: 5 }}>
                Suggested By:{" "}
                <AccountPreview account={choice.suggestedBy} scale={3 / 4} />
            </span>
        </CrowdventureCard>
    );
};

export default ChoiceCard;
