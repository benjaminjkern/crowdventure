import React, { useContext, useState } from "react";
import { mutationCall } from "../apiUtils";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import CreateNodeModal from "../nodes/CreateNodeModal";
import NodeSearch from "../nodes/NodeSearch";
import { UserContext } from "../user";

const ChoiceModal = ({ fromNode, choice }) => {
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
                picture={fromNode.pictureURL}
                pictureUnsafe={fromNode.pictureUnsafe}
                callback={(node) => callback(node.ID)}
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
            modalTitle={`${choice ? "Editing" : "Suggesting New"} Choice`}
            modalButtons={[
                {
                    text: `${choice ? "Edit" : "Submit New"} Choice`,
                    onClick: () => (choice ? editAction : createNewAction)(),
                },
            ]}
        >
            Action:
            <CrowdventureTextInput
                value={suggestAction}
                onChange={setSuggestAction}
            />
            Go to Page:
            <NodeSearch callback={setToPage} toID={toPage} />
            {user?.isAdmin && (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        onChange={setHidden}
                        label="Choice should be hidden"
                    />
                </>
            )}
            {info}
        </CrowdventureModal>
    );
};

export default ChoiceModal;
