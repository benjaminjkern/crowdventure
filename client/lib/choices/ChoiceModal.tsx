import React, {
    type Dispatch,
    type SetStateAction,
    useContext,
    useState,
} from "react";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import CrowdventureModal, {
    type ModalButton,
} from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

import NodeSearch from "../nodes/NodeSearch";
import { UserContext } from "../user";
import apiClient from "../apiClient";
import { type FormWithValues, useInputForm } from "../hooks";
import { CreateNodeModal } from "../nodes/NodeModal";
import { type Node, type Choice } from "@/types/models";

const ChoiceModal = ({
    choiceForm,
    setToNode,
    toNode,
    modalTitle,
    modalButtons,
}: {
    readonly choiceForm: FormWithValues<{ hidden: boolean; action: string }>;
    readonly setToNode: Dispatch<SetStateAction<Node | null>>;
    readonly toNode: Node | null;
    readonly modalTitle: string;
    readonly modalButtons: ModalButton[];
}) => {
    const { user } = useContext(UserContext);

    return (
        <CrowdventureModal modalButtons={modalButtons} modalTitle={modalTitle}>
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
    onCreateChoice,
}: {
    readonly fromNode: Node;
    readonly onCreateChoice?: (c: Choice) => unknown;
}) => {
    const choiceForm = useInputForm({
        action: "",
        hidden: false,
    });
    const [toNode, setToNode] = useState<Node | null>(null);
    const { openModal, closeAllModals } = useContext(ModalContext);
    const createChoice = async (newToNode: Node | null) => {
        const { action, hidden } = choiceForm.getValues(); // TODO: Unsure about having hidden be here in create choice

        if (!action) return choiceForm.setError("Action cannot be empty!");

        if (!newToNode)
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
                toNodeId: newToNode.id,
                hidden,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        onCreateChoice?.(choiceResponse.data);
        closeAllModals();
    };
    return (
        <ChoiceModal
            choiceForm={choiceForm}
            modalButtons={[
                {
                    text: `Suggest New Choice`,
                    onClick: () => createChoice(toNode),
                },
            ]}
            modalTitle="Suggesting Choice"
            setToNode={setToNode}
            toNode={toNode}
        />
    );
};

export const EditChoiceModal = ({
    choice,
    onEditChoice,
}: {
    readonly choice: Choice;
    readonly onEditChoice?: (c: Choice) => unknown;
}) => {
    const choiceForm = useInputForm({
        action: choice.action,
        hidden: choice.hidden,
    });
    const [toNode, setToNode] = useState<Node | null>(null);
    const { openModal, closeAllModals } = useContext(ModalContext);
    const editChoice = async (newToNode: Node | null) => {
        const { action, hidden } = choiceForm.getValues();
        if (!action) return choiceForm.setError("Action cannot be empty!");

        if (!newToNode)
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
                hidden,
            }
        );
        if (choiceResponse.status === "error")
            return choiceForm.setError(choiceResponse.error.message);

        onEditChoice?.(choiceResponse.data);
        closeAllModals();
    };

    return (
        <ChoiceModal
            choiceForm={choiceForm}
            modalButtons={[
                {
                    text: `Edit Choice`,
                    onClick: () => editChoice(toNode),
                },
            ]}
            modalTitle="Editing Choice"
            setToNode={setToNode}
            toNode={toNode}
        />
    );
};
