import React, { useContext, useState } from "react";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import NodeSearch from "../nodes/NodeSearch";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { useInputForm } from "../hooks";
import { CreateNodeModal } from "../nodes/NodeModal";
import { type Node, type Choice } from "@/types/models";

const ChoiceModal = ({
    fromNode,
    choice,
}: {
    readonly fromNode: Node;
    readonly choice?: Choice;
}) => {
    const [toNode, setToNode] = useState<Node | null>(choice?.toNode ?? null);

    const { user } = useContext(UserContext);
    const { openModal, closeAllModals } = useContext(ModalContext);

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `${choice ? "Edit" : "Submit New"} Choice`,
                    onClick: () => {
                        if (choice) editChoice();
                        else createChoice();
                    },
                },
            ]}
            modalTitle={`${choice ? "Editing" : "Suggesting New"} Choice`}
        >
            Action:
            <CrowdventureTextInput formElement={choiceForm.action} />
            Go to Page:
            <NodeSearch onSelectNode={setToNode} query={toNode?.title} />
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

export const CreateChoiceModal = ({
    fromNode,
}: {
    readonly fromNode: Node;
}) => {
    const choiceForm = useInputForm({
        action: "",
        hidden: false,
    });
    const { openModal, closeAllModals } = useContext(ModalContext);
    const createChoice = async (toNode: Node) => {
        const { action, hidden } = choiceForm.getValues(); // TODO: Unsure about having hidden be here in create choice

        if (!action) return choiceForm.setError("Action cannot be empty!");

        if (!toNode)
            return openModal(
                <CreateNodeModal
                    featured={false}
                    onCreateNode={createChoice}
                    pictureURL={fromNode.pictureURL}
                    pictureUnsafe={fromNode.pictureUnsafe}
                />
            );

        const choiceResponse = await apiClient.provide(
            "post",
            "/choice/createChoice",
            {
                fromNodeId: fromNode.id,
                action,
                toNodeId: toNode.id,
                hidden,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        // TODO: DO stuff

        closeAllModals();
    };
    return (
        <ChoiceModal
            modalButtons={[
                {
                    text: `Suggest New Choice`,
                    onClick: createChoice,
                },
            ]}
            modalTitle="Suggesting Choice"
        />
    );
};

export const EditChoiceModal = ({ choice }: { readonly choice: Choice }) => {
    const choiceForm = useInputForm({
        action: choice.action,
        hidden: choice.hidden,
    });
    const { openModal, closeAllModals } = useContext(ModalContext);
    const editChoice = async (toNode: Node) => {
        const { action, hidden } = choiceForm.getValues();
        if (!action) return choiceForm.setError("Action cannot be empty!");

        if (!toNode)
            return openModal(
                <CreateNodeModal
                    featured={false}
                    onCreateNode={editChoice}
                    pictureURL={choice.fromNode.pictureURL}
                    pictureUnsafe={choice.fromNode.pictureUnsafe}
                />
            );

        const choiceResponse = await apiClient.provide(
            "patch",
            "/choice/editChoice",
            {
                id: choice.id,
                action,
                toNodeId: newToNode.id,
                hidden: hidden as boolean,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        // TODO: DO stuff

        closeAllModals();
    };

    return (
        <ChoiceModal
            modalButtons={[
                {
                    text: `${choice ? "Edit" : "Submit New"} Choice`,
                    onClick: () => {
                        if (choice) editChoice();
                        else createChoice();
                    },
                },
            ]}
            modalTitle={`${choice ? "Editing" : "Suggesting New"} Choice`}
        />
    );
};
