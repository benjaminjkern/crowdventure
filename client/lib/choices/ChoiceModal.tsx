import React, { useContext, useState } from "react";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import CreateNodeModal from "../nodes/CreateNodeModal";
import NodeSearch from "../nodes/NodeSearch";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { useInputForm } from "../hooks";
import { type Node, type Choice } from "@/types/models";

const ChoiceModal = ({
    fromNode,
    choice,
}: {
    readonly fromNode: Node;
    readonly choice?: Choice;
}) => {
    const [toNodeId, setToNodeId] = useState(choice?.toNodeId);
    const choiceForm = useInputForm({
        action: choice?.action ?? "",
        hidden: choice?.action ?? false,
    });

    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);

    const verifyForm = () => {
        if (!choiceForm.getValues().action) {
            choiceForm.setError("Action cannot be empty!");
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

    const editChoice = () => {
        if (!choice) return;
        if (!verifyForm()) return;

        if (!toPage) return openCreateNodeModal(editChoice);

        const { action, toNodeId, hidden } = choiceForm.getValues();

        const choiceResponse = await apiClient.provide(
            "patch",
            "/choice/editChoice",
            { id: choice.id, action, toNodeId, hidden }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);
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
                        formElement={choiceForm.hidden}
                        label="Choice should be hidden"
                    />
                </>
            ) : null}
            {choiceForm.getError()}
        </CrowdventureModal>
    );
};

export default ChoiceModal;
