import React, { useContext, useState } from "react";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import CreateNodeModal from "../nodes/CreateNodeModal";
import NodeSearch from "../nodes/NodeSearch";
import { UserContext } from "../user";
import { type Choice } from "@/types/models";

const ChoiceModal = ({
    fromNode,
    choice,
}: {
    readonly fromNode: Node;
    readonly choice: Choice;
}) => {
    const [info, setInfo] = useState("");

    const [toPage, setToPage] = useState(choice?.to.ID || "");
    const [suggestAction, setSuggestAction] = useState(choice?.action || "");
    const [hidden, setHidden] = useState(choice?.hidden);

    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);

    const verifyForm = () => {
        if (!suggestAction) {
            setInfo(
                <span style={{ color: "red" }}>Action cannot be empty!</span>
            );
            return false;
        }
        return true;
    };

    const openCreateNodeModal = (callback) => {
        openModal(
            <CreateNodeModal
                callback={(node) => callback(node.ID)}
                picture={fromNode.pictureURL}
                pictureUnsafe={fromNode.pictureUnsafe}
            />
        );
    };

    const editAction = () => {
        if (!verifyForm()) return;

        if (!toPage) return openCreateNodeModal(editAction);

        mutationCall(
            "editSuggestion",
            { ID: 0 },
            {
                choiceID: choice.ID,
                action: suggestAction,
                toID: toPage,
                ...(hidden !== undefined ? { hidden } : {}),
            }
        ).then(() => {});
    };

    const createNewAction = () => {
        if (!verifyForm()) return;

        if (!toPage) return openCreateNodeModal(createNewAction);

        mutationCall(
            "suggestChoice",
            { ID: 0 },
            {
                accountScreenName: user.screenName,
                fromID: fromNode.ID,
                action: suggestAction,
                toID: toPage,
            }
        ).then(() => {});
    };

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `${choice ? "Edit" : "Submit New"} Choice`,
                    onClick: () => (choice ? editAction : createNewAction)(),
                },
            ]}
            modalTitle={`${choice ? "Editing" : "Suggesting New"} Choice`}
        >
            Action:
            <CrowdventureTextInput
                onChange={setSuggestAction}
                value={suggestAction}
            />
            Go to Page:
            <NodeSearch callback={setToPage} toID={toPage} />
            {user?.isAdmin ? (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        label="Choice should be hidden"
                        onChange={setHidden}
                    />
                </>
            ) : null}
            {info}
        </CrowdventureModal>
    );
};

export default ChoiceModal;
