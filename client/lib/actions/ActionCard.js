import React, { useContext, useState } from "react";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";
import LikeDislikeController from "../components/LikeDislikeController";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";

const ActionCard = ({ disabled, choice: initChoice, node }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);

    const [choice, setChoice] = useState(initChoice);

    choice.liked = choice.likedBy.some(
        (account) => account.screenName === user?.screenName
    );
    choice.disliked = choice.dislikedBy.some(
        (account) => account.screenName === user?.screenName
    );

    const like = () => {
        if (!user) return;

        const oChoice = { ...choice };

        if (choice.liked) {
            choice.liked = false;
            choice.score--;
        } else {
            choice.liked = true;
            choice.score++;
            if (choice.disliked) choice.score++;
        }

        choice.disliked = false;

        setChoice({ ...choice });

        mutationCall(
            "likeSuggestion",
            {
                accountScreenName: user.screenName,
                choiceID: choice.ID,
            },
            { ID: 0 }
        ).catch(() => {
            setChoice(oChoice);
        });
    };

    const dislike = () => {
        if (!user) return;

        const oChoice = { ...choice };

        if (choice.disliked) {
            choice.disliked = false;
            choice.score++;
        } else {
            choice.disliked = true;
            choice.score--;
            if (choice.liked) choice.score--;
        }
        choice.liked = false;

        setChoice({ ...choice });

        mutationCall(
            "dislikeSuggestion",
            {
                accountScreenName: user.screenName,
                choiceID: choice.ID,
            },
            { ID: 0 }
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

    const reportSuggestion = (choiceID) => {
        mutationCall(
            "createFeedback",
            {
                accountScreenName: user?.screenName,
                info: "This is inappropriate",
                reportingObjectType: "Choice",
                reportingObjectID: choiceID,
            },
            { info: 0, reporting: 0 }
        ).then(() => {
            alert("Successfully reported action!");
            window.location.reload(false);
        });
    };

    // Hide hidden actions, but show if you 1. are in unsafeMode, 2. suggested the action, or 3. own the page and the action is canon
    if (
        (choice.hidden || choice.suggestedBy.hidden) &&
        !(
            unsafeMode ||
            choice.suggestedBy.screenName === user?.screenName ||
            (choice.canon && node.owner.screenName === user?.screenName)
        )
    )
        return;

    return (
        <CrowdventureCard
            href={`/node/${choice.to.ID}`}
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                })
            }
            disabled={
                !choice.to ||
                ((choice.to.hidden || choice.to.owner.hidden) &&
                    (!user ||
                        (!user.unsafeMode &&
                            choice.to.owner.screenName !== user.screenName)))
            }
            text={choice.action} // { active, tooltip, icon, iconColor }
            overlayIcons={[
                {
                    active: choice.hidden || choice.suggestedBy.hidden,
                    tooltip: `This action is hidden, because it has been marked as unsafe! You can see it because you are ${
                        unsafeMode ? "in Unsafe Mode." : "the owner."
                    }`,
                    icon: "minus-circle",
                    iconColor: "red",
                },
                {
                    active:
                        !choice.hidden &&
                        choice.to &&
                        (choice.to.hidden || choice.to.owner.hidden) &&
                        !disabled,
                    tooltip: `This page this action leads to is hidden, because it has been marked as unsafe! You will be able to see it because you are ${
                        unsafeMode ? "in Unsafe Mode." : "the owner."
                    }`,
                    icon: "minus-circle",
                    iconColor: "red",
                },
            ]}
            dropdownOptions={[
                {
                    disabled:
                        !user ||
                        (user.screenName !== node.owner.screenName &&
                            !user.isAdmin),
                    text: `Make ${choice.canon ? "Nonc" : "C"}anon`,
                    onClick: () =>
                        choice.canon
                            ? makeNonCanon(choice.ID)
                            : makeCanon(choice.ID),
                },
                {
                    disabled:
                        !user ||
                        (user.screenName !== choice.suggestedBy.screenName &&
                            user.screenName !== node.owner.screenName &&
                            !user.isAdmin),
                    text: "Delete",
                    onClick: () => removeSuggestion(choice.ID),
                },
                {
                    disabled: !(
                        user &&
                        (user.isAdmin ||
                            (choice.canon &&
                                user.screenName === node.owner.screenName) ||
                            (!choice.canon &&
                                user.screenName ===
                                    choice.suggestedBy.screenName))
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
        >
            <LikeDislikeController
                count={choice.score}
                liked={choice.liked}
                disliked={choice.disliked}
                like={like}
                dislike={dislike}
            />
            Suggested By: <AccountPreview account={choice.suggestedBy} />
        </CrowdventureCard>
    );
};

export default ActionCard;
