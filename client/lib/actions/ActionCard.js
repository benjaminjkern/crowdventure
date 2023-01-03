import React, { useContext } from "react";
import AccountPreview from "../accounts/AccountPreview";
import CrowdventureCard from "../components/CrowdventureCard";
import LikeDislikeController from "../components/LikeDislikeController";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";

const ActionCard = ({ disabled, choice }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);
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
                    text: `Make ${canon ? "Nonc" : "C"}anon`,
                    onClick: () =>
                        canon ? makeNonCanon(choice.ID) : makeCanon(choice.ID),
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
                            (canon &&
                                user.screenName === node.owner.screenName) ||
                            (!canon &&
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
            <LikeDislikeController count={choice.score} />
            Suggested By: <AccountPreview account={choice.suggestedBy} />
        </CrowdventureCard>
    );
};

export default ActionCard;
