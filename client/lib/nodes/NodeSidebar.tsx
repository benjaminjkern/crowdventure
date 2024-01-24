import React, { type Dispatch, type SetStateAction, useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRouter } from "next/router";
import CrowdventureButton from "../components/CrowdventureButton";
import { UserContext } from "../user";
import AccountPreview from "../accounts/AccountPreview";
import { ModalContext } from "../modal";
import ChoiceCard from "../choices/ChoiceCard";
import { PaletteContext } from "../colorPalette";
import ParagraphText from "../components/ParagraphText";
import { CreateChoiceModal } from "../choices/ChoiceModal";
import { useMediaQuery } from "../hooks";
import GoogleAdList from "../components/GoogleAdList";
import { EditNodeModal } from "./NodeModal";
import { type Choice, type Node } from "@/types/models";

const NodeSidebar = ({
    node,
    setNode,
    choices,
    setChoices,
}: {
    readonly node: Node;
    readonly setNode: Dispatch<SetStateAction<Node>>;
    readonly choices: Choice[];
    readonly setChoices: Dispatch<SetStateAction<Choice[]>>;
}) => {
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { mutedTextColor } = useContext(PaletteContext);

    const isMobile = useMediaQuery("(max-width: 800px)");

    const canonChoices = choices.filter((choice) => choice.isCanon);

    const router = useRouter();

    const loggedInAsOwner = node.ownerId === user?.id;
    return (
        <div>
            <div
                style={{
                    gap: 20,
                    margin: 20,
                    marginBottom: 15,
                    marginInline: isMobile ? 20 : 0,
                }}
            >
                {!isMobile && (
                    <h1 style={{ textAlign: "center", display: "block" }}>
                        {node.title}
                    </h1>
                )}

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
                    flexWrap: "wrap",
                }}
            >
                <span>Views: {node.views}</span>
                <span style={{ gap: 5, flexWrap: "wrap" }}>
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
                                <EditNodeModal
                                    node={node}
                                    onDeleteNode={() => {
                                        router.back();
                                    }}
                                    onEditNode={setNode}
                                />
                            );
                        }}
                    >
                        Edit Page
                    </CrowdventureButton>
                ) : null}
                <CrowdventureButton
                    onClick={() => {
                        openModal(
                            <CreateChoiceModal
                                fromNode={node}
                                onCreateChoice={(choice) => {
                                    setChoices([...choices, choice]);
                                }}
                            />
                        );
                    }}
                    requireSignedIn
                >
                    Suggest New Choice
                </CrowdventureButton>
            </div>
            <hr />
            {choices.length > 0 ? (
                <GoogleAdList
                    columnsCountBreakPoints={
                        node.pictureURL
                            ? { 0: 1, 1400: 2 }
                            : { 0: 1, 600: 2, 900: 3 }
                    }
                    data={choices}
                    render={(choice, idx) => (
                        <ChoiceCard
                            choice={choice}
                            key={idx}
                            onDeleteChoice={(newChoice) => {
                                setChoices(
                                    choices.filter(
                                        (otherChoice) =>
                                            otherChoice.id !== newChoice.id
                                    )
                                );
                            }}
                            onEditChoice={(newChoice) => {
                                setChoices(
                                    choices.map((otherChoice) =>
                                        otherChoice.id === newChoice.id
                                            ? newChoice
                                            : otherChoice
                                    )
                                );
                            }}
                        />
                    )}
                />
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
