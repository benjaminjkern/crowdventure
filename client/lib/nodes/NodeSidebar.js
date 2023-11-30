import React, { useContext } from "react";
import CrowdventureButton from "../components/CrowdventureButton";
import { useRouter } from "next/router";
import { UserContext } from "../user";
import CreateNodeModal from "./CreateNodeModal";
import AccountPreview from "../accounts/AccountPreview";
import { ModalContext } from "../modal";
import ActionCard from "../actions/ActionCard";
import ChoiceModal from "../actions/ChoiceModal";
import { PaletteContext } from "../colorPalette";

const NodeSidebar = ({ node, setNode }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const { openModal } = useContext(ModalContext);
    const { mutedTextColor } = useContext(PaletteContext);
    const reportNode = () => {
        // mutation_call(
        //     "createFeedback",
        //     {
        //         ...(loggedInAs
        //             ? { accountScreenName: loggedInAs.screenName }
        //             : {}),
        //         info: "This is inappropriate",
        //         reportingObjectType: "Node",
        //         reportingObjectID: node.ID,
        //     },
        //     { info: 0, reporting: 0 },
        //     () => {
        //         alert("Successfully reported page!");
        //         window.location.reload(false);
        //     }
        // );
    };

    const choices = [
        ...node.canonChoices,
        ...node.nonCanonChoices,
        ...node.canonChoices,
        ...node.nonCanonChoices,
        ...node.canonChoices,
        ...node.nonCanonChoices,
        ...node.canonChoices,
        ...node.nonCanonChoices,
    ];
    return (
        <div style={{ paddingInline: 10 }}>
            <h1>{node.title}</h1>
            {node.content.split("\n").map((line, i) => (
                <p key={i} style={{ textIndent: "5%" }}>
                    {line}
                </p>
            ))}
            <hr />
            <CrowdventureButton
                // Should be off to the side
                onClick={() => {
                    router.back();
                }}
            >
                Go back!
            </CrowdventureButton>
            {node.canonChoices.length === 0 && (
                <span style={{ color: mutedTextColor }}>
                    By decree of <strong>{node.owner.screenName}</strong>, this
                    journey ends here.
                </span>
            )}
            <span style={{ gap: 5 }}>
                Author: <AccountPreview account={node.owner} />
            </span>
            Views: {node.views}
            {node.owner.screenName === user?.screenName || user?.isAdmin ? (
                <CrowdventureButton
                    onClick={() => {
                        openModal(
                            <CreateNodeModal node={node} setNode={setNode} />
                        );
                    }}
                >
                    Edit Page
                </CrowdventureButton>
            ) : null}
            {choices.length > 0 ? (
                <div>
                    {choices.map((choice, idx) => (
                        <ActionCard choice={choice} key={idx} />
                    ))}
                </div>
            ) : (
                <span style={{ color: mutedTextColor }}>
                    There are currently no options! You can help expand the
                    story by adding to it!
                </span>
            )}
            <CrowdventureButton
                onClick={() => {
                    openModal(<ChoiceModal fromNode={node} />);
                }}
                requireSignedIn
            >
                Suggest New Choice
            </CrowdventureButton>
            <CrowdventureButton onClick={reportNode}>
                Report Page
            </CrowdventureButton>
        </div>
    );
};

export default NodeSidebar;
