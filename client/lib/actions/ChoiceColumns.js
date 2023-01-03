import React, { useState, useEffect, createRef } from "react";
import ActionCard from "./ActionCard";

// import EditChoiceModal from "../Modals/EditChoiceModal";

const ChoiceColumns = ({ node, loggedInAs, canon }) => {
    const [choices, setChoices] = useState(
        (canon ? node.canonChoices : node.nonCanonChoices).map(() => null)
    );

    const refs = [];

    const [showingModal, showModal] = useState(undefined);

    const like = (idx) => {
        if (loggedInAs) {
            const choice = choices[idx];

            if (choice.liked) {
                choice.liked = false;
                choice.score--;
            } else {
                choice.liked = true;
                choice.score++;
                if (choice.disliked) choice.score++;
            }
            choice.disliked = false;
            setChoices([
                ...choices.slice(0, idx),
                choice,
                ...choices.slice(idx + 1, choices.length),
            ]);

            mutation_call(
                "likeSuggestion",
                {
                    accountScreenName: loggedInAs.screenName,
                    choiceID: choice.ID,
                },
                { ID: 0 },
                () => {}
            );
        }
    };

    const dislike = (idx) => {
        if (loggedInAs) {
            const choice = choices[idx];

            if (choice.disliked) {
                choice.disliked = false;
                choice.score++;
            } else {
                choice.disliked = true;
                choice.score--;
                if (choice.liked) choice.score--;
            }
            choice.liked = false;
            setChoices([
                ...choices.slice(0, idx),
                choice,
                ...choices.slice(idx + 1, choices.length),
            ]);

            mutation_call(
                "dislikeSuggestion",
                {
                    accountScreenName: loggedInAs.screenName,
                    choiceID: choice.ID,
                },
                { ID: 0 },
                () => {}
            );
        }
    };

    const makeCanon = (choiceID) => {
        mutation_call("makeCanon", { choiceID: choiceID }, { ID: 0 }, () =>
            setTimeout(() => window.location.reload(false), 100)
        );
    };

    const makeNonCanon = (choiceID) => {
        mutation_call("makeNonCanon", { choiceID: choiceID }, { ID: 0 }, () =>
            setTimeout(() => window.location.reload(false), 100)
        );
    };

    const removeSuggestion = (choiceID) => {
        mutation_call("removeSuggestion", { choiceID: choiceID }, {}, () =>
            window.location.reload(false)
        );
    };

    const reportSuggestion = (choiceID) => {
        mutation_call(
            "createFeedback",
            {
                ...(loggedInAs
                    ? { accountScreenName: loggedInAs.screenName }
                    : {}),
                info: "This is inappropriate",
                reportingObjectType: "Choice",
                reportingObjectID: choiceID,
            },
            { info: 0, reporting: 0 },
            () => {
                alert("Successfully reported action!");
                window.location.reload(false);
            }
        );
    };

    useEffect(() => {
        if (
            choices.length !==
                (canon ? node.canonChoices : node.nonCanonChoices).length ||
            choices.some(
                (choice, i) =>
                    choice !== null &&
                    choice.ID !==
                        (canon ? node.canonChoices : node.nonCanonChoices)[i].ID
            )
        )
            setChoices(
                (canon ? node.canonChoices : node.nonCanonChoices).map(
                    () => null
                )
            );

        if (choices.some((choice) => choice === null)) {
            (canon ? node.canonChoices : node.nonCanonChoices).forEach(
                (choiceID, i) => {
                    if (choices[i] !== null) return;

                    query_call(
                        "getChoice",
                        { ID: choiceID.ID },
                        {
                            ID: 0,
                            action: 0,
                            likedBy: { screenName: 0 },
                            dislikedBy: { screenName: 0 },
                            score: 0,
                            suggestedBy: {
                                hidden: 0,
                                screenName: 0,
                                profilePicURL: 0,
                            },
                            hidden: 0,
                            to: {
                                owner: {
                                    screenName: 0,
                                    hidden: 0,
                                },
                                ID: 0,
                                hidden: 0,
                            },
                            from: {
                                ID: 0,
                            },
                        },
                        (choice) => {
                            choice.liked =
                                loggedInAs &&
                                choice.likedBy.some(
                                    (account) =>
                                        account.screenName ===
                                        loggedInAs.screenName
                                );
                            choice.disliked =
                                loggedInAs &&
                                choice.dislikedBy.some(
                                    (account) =>
                                        account.screenName ===
                                        loggedInAs.screenName
                                );
                            choices[i] = choice;
                            showModal({});
                        }
                    );
                }
            );
        }
    });

    if (choices.length === 0) return <></>;

    return (
        <div>
            {choices.map((choice, idx) => {
                if (
                    (choice.hidden || choice.suggestedBy.hidden) &&
                    (!user ||
                        (!unsafeMode &&
                            user.screenName !== choice.suggestedBy.screenName &&
                            (user.screenName !== node.owner.screenName ||
                                !canon)))
                )
                    return <span />;

                return <ActionCard choice={choice} key={idx} />;
            })}
            {showingModal && Object.keys(showingModal).length > 0
                ? showingModal
                : ""}
        </div>
    );
};

export default ChoiceColumns;
