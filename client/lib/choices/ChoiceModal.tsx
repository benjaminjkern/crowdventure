import React, { useContext, useState } from "react";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import NodeModal from "../nodes/NodeModal";
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
    const [toNodeId, setToNodeId] = useState(choice?.toNodeId ?? null);
    const choiceForm = useInputForm({
        action: choice?.action ?? "",
        hidden: choice?.action ?? false,
    });

    const { user } = useContext(UserContext);
    const { openModal, closeAllModals } = useContext(ModalContext);

    const verifyForm = () => {
        if (!choiceForm.getValues().action) {
            choiceForm.setError("Action cannot be empty!");
            return false;
        }
        return true;
    };

    const openNodeModal = (callback: (n: number) => unknown) => {
        openModal(
            <NodeModal
                callback={(node) => callback(node.id)}
                featured={false}
                pictureURL={fromNode.pictureURL}
                pictureUnsafe={fromNode.pictureUnsafe}
            />
        );
    };

    const editChoice = async (newNodeId: number | null) => {
        if (!choice) return;
        if (!verifyForm()) return;

        if (!newNodeId) return openNodeModal(editChoice);

        const { action, hidden } = choiceForm.getValues();

        const choiceResponse = await apiClient.provide(
            "patch",
            "/choice/editChoice",
            {
                id: choice.id,
                action,
                toNodeId: newNodeId ?? toNodeId,
                hidden: hidden as boolean,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        // TODO: DO stuff

        closeAllModals();
    };

    const createChoice = async (newToNodeId: number | null) => {
        if (!verifyForm()) return;

        if (!newToNodeId) return openNodeModal(createChoice);

        const { action } = choiceForm.getValues();

        const choiceResponse = await apiClient.provide(
            "post",
            "/choice/createChoice",
            {
                fromNodeId: fromNode.id,
                action,
                toNodeId: newToNodeId,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        // TODO: DO stuff

        closeAllModals();
    };

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `${choice ? "Edit" : "Submit New"} Choice`,
                    onClick: () => {
                        if (choice) editChoice(toNodeId);
                        else createChoice(toNodeId);
                    },
                },
            ]}
            modalTitle={`${choice ? "Editing" : "Suggesting New"} Choice`}
        >
            Action:
            <CrowdventureTextInput formElement={choiceForm.action} />
            Go to Page:
            <NodeSearch setToNodeId={setToNodeId} toNodeId={toNodeId} />
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
