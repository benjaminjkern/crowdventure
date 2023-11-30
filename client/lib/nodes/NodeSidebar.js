import React, { useContext } from "react";
import CrowdventureButton from "../components/CrowdventureButton";
import { UserContext } from "../user";
import CreateNodeModal from "./CreateNodeModal";
import AccountPreview from "../accounts/AccountPreview";
import { ModalContext } from "../modal";
import ActionCard from "../actions/ActionCard";
import ChoiceModal from "../actions/ChoiceModal";
import { PaletteContext } from "../colorPalette";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const NodeSidebar = ({ node, setNode }) => {
    const { user } = useContext(UserContext);
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

    const loggedInAsOwner = node.owner.screenName === user?.screenName;
    return (
        <div style={{ paddingInline: 10 }}>
            <div
                style={{
                    gap: 20,
                    marginInline: 20,
                    marginTop: 30,
                }}
            >
                <h1 style={{ textAlign: "center", display: "block" }}>
                    {node.title}
                </h1>

                {node.content.split("\n").map((line, i) => (
                    <div
                        key={i}
                        style={{
                            // justifyContent: ''
                            textAlign: "justify",
                            textIndent: "5%",
                        }}
                    >
                        {line}
                    </div>
                ))}
                {node.canonChoices.length === 0 && (
                    <span style={{ color: mutedTextColor }}>
                        By decree of {node.owner.screenName}, this journey ends
                        here.
                    </span>
                )}
            </div>
            <hr />
            <div
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <span>Views: {node.views}</span>
                <span style={{ gap: 5 }}>
                    Author: <AccountPreview account={node.owner} />
                </span>
            </div>
            <div
                style={{
                    flexDirection: "row",
                    marginTop: 10,
                    gap: 10,
                }}
            >
                {loggedInAsOwner || user?.isAdmin ? (
                    <CrowdventureButton
                        onClick={() => {
                            openModal(
                                <CreateNodeModal
                                    node={node}
                                    setNode={setNode}
                                />
                            );
                        }}
                    >
                        Edit Page
                    </CrowdventureButton>
                ) : null}
                <CrowdventureButton
                    onClick={() => {
                        openModal(<ChoiceModal fromNode={node} />);
                    }}
                    requireSignedIn
                >
                    Suggest New Choice
                </CrowdventureButton>
                <CrowdventureButton category="error" onClick={reportNode}>
                    Report Page
                </CrowdventureButton>
            </div>
            <hr />
            {choices.length > 0 ? (
                <ResponsiveMasonry
                    columnsCountBreakPoints={
                        node.pictureURL
                            ? { 0: 1, 1400: 2 }
                            : { 0: 1, 600: 2, 900: 3 }
                    }
                >
                    <Masonry>
                        {choices.map((choice, idx) => (
                            <ActionCard choice={choice} key={idx} />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            ) : (
                <span
                    style={{
                        color: mutedTextColor,
                        textAlign: "center",
                        marginBottom: 10,
                    }}
                >
                    There are currently no options! You can help expand the
                    story by adding to it!
                </span>
            )}
        </div>
    );
};

export default NodeSidebar;
