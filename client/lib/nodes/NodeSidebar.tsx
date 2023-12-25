import React, { type Dispatch, type SetStateAction, useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CrowdventureButton from "../components/CrowdventureButton";
import { UserContext } from "../user";
import AccountPreview from "../accounts/AccountPreview";
import { ModalContext } from "../modal";
import ChoiceCard from "../choices/ChoiceCard";
import ChoiceModal from "../choices/ChoiceModal";
import { PaletteContext } from "../colorPalette";
import ParagraphText from "../components/ParagraphText";
import NodeModal from "./NodeModal";
import { type Choice, type Node } from "@/types/models";

const NodeSidebar = ({
    node,
    setNode,
    choices,
}: {
    readonly node: Node;
    readonly setNode: Dispatch<SetStateAction<Node>>;
    readonly choices: Choice[];
}) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { mutedTextColor } = useContext(PaletteContext);

    const canonChoices = choices.filter((choice) => choice.isCanon);

    const loggedInAsOwner = node.ownerId === user?.id;
    return (
        <div>
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

                <ParagraphText text={node.content} />

                {canonChoices.length === 0 && (
                    <span style={{ color: mutedTextColor }}>
                        By decree of {node.owner?.screenName ?? "Crowdventure"},
                        this journey ends here.
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
                                <NodeModal node={node} setNode={setNode} />
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
                {/* <CrowdventureButton category="error" onClick={reportNode}>
                    Report Page
                </CrowdventureButton> */}
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
                            <ChoiceCard choice={choice} key={idx} />
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