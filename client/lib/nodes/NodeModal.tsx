import Image from "next/image";
import React, {
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { useRouter } from "next/router";

import CrowdventureButton from "../components/CrowdventureButton";
import CrowdventureModal, {
    type ModalButton,
} from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import { ModalContext } from "../modal";
import ImageSearch from "../components/ImageSearch";
import CloseButton from "../components/CloseButton";
import { PaletteContext } from "../colorPalette";
import { type FormWithValues, useInputForm } from "../hooks";
import apiClient from "../apiClient";
import { type Node } from "@/types/models";

// import SearchImage from "../SearchImage";

type NodeForm = {
    title: string;
    content: string;
    pictureURL: string;
    pictureUnsafe: boolean;
    hidden: boolean;
    featured: boolean;
};

const validateInputs = (
    nodeForm: FormWithValues<{ title: string; content: string }>
) => {
    const { title, content } = nodeForm.getValues();
    if (!title) {
        nodeForm.setError("Content cannot be empty!");
        return false;
    }

    if (!content) {
        nodeForm.setError("Title cannot be empty!");
        return false;
    }

    return true;
};

const NodeModal = ({
    nodeForm,
    ...modalProps
}: {
    readonly nodeForm: FormWithValues<NodeForm>;
    readonly modalButtons: ModalButton[];
    readonly modalTitle: string;
}) => {
    const { user } = useContext(UserContext);
    const { lightBackgroundColor } = useContext(PaletteContext);

    const { pictureURL } = nodeForm.getValues();

    return (
        <CrowdventureModal {...modalProps}>
            {pictureURL ? (
                <div
                    style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: lightBackgroundColor,
                        borderRadius: 8,
                        position: "relative",
                    }}
                >
                    <img
                        alt="This text shouldnt be showing!"
                        src={pictureURL}
                        style={{
                            padding: 1,
                            borderRadius: 8,
                        }}
                    />
                    {/* <CloseButton
                        onClick={() => {
                            setPictureField("");
                            setShouldHide(false);
                        }}
                    /> */}
                </div>
            ) : null}
            {/* <div
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                }}
            >
                <span>Picture:</span>
                <span style={{ color: mutedTextColor }}>
                    {!pictureField
                        ? "(Don't use any picture)"
                        : pictureField === node?.pictureURL
                        ? "(Use existing picture)"
                        : "(Use new picture)"}
                </span>
            </div> */}
            {/* <CrowdventureButton
                onClick={() => setShowImageSearch(!showImageSearch)}
            >
                {pictureField ? "Change" : "Select"} Picture
            </CrowdventureButton> */}
            {/* {showImageSearch ? (
                <>
                    <br />
                    <ImageSearch
                        onSelectImage={(url, familyFriendly) => {
                            setPictureField(url);
                            // setShowChangePic(false);
                            setShowImageSearch(false);
                            setShouldHide(!familyFriendly);
                        }}
                    />
                </>
            ) : null} */}
            <hr />
            <div style={{ gap: 5 }}>
                Title:
                <CrowdventureTextInput formElement={nodeForm.title} />
                Content:
                <CrowdventureTextInput
                    formElement={nodeForm.content}
                    rows={3}
                />
            </div>
            {user?.isAdmin ? (
                <>
                    <hr />
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        formElement={nodeForm.hidden}
                        label="Page should be hidden"
                        style={{ marginTop: 10 }}
                    />
                </>
            ) : null}
            {nodeForm.getError()}
            {/* {shouldHide ? (
                <span style={{ color: "red" }}>
                    The image chosen will cause the page to automatically be
                    hidden. If you would like to not have this happen, change or
                    remove the image.
                </span>
            ) : null} */}
        </CrowdventureModal>
    );
};

export const CreateNodeModal = ({
    onCreateNode,
    pictureURL: initPictureURL,
    pictureUnsafe: initPictureUnsafe,
    featured: initFeatured,
}: {
    readonly onCreateNode?: (n: Node) => unknown;
    readonly pictureURL?: string | null;
    readonly pictureUnsafe?: boolean;
    readonly featured?: boolean;
}) => {
    const nodeForm = useInputForm({
        title: "",
        content: "",
        pictureURL: initPictureURL ?? "",
        pictureUnsafe: initPictureUnsafe ?? false,
        hidden: false,
        featured: initFeatured ?? false,
    });
    const { closeModal } = useContext(ModalContext);
    const createNode = async () => {
        if (!validateInputs(nodeForm)) return;
        const { title, content, featured, pictureURL } = nodeForm.getValues();

        const response = await apiClient.provide("post", "/node/createNode", {
            title,
            content,
            featured,
            pictureURL: pictureURL || undefined,
        });
        if (response.status === "error")
            return nodeForm.setError(response.error.message);

        onCreateNode?.(response.data);
        closeModal();
    };
    return (
        <NodeModal
            modalButtons={[
                {
                    text: `Create Page!`,
                    onClick: createNode,
                },
            ]}
            modalTitle="Creating New Page"
            nodeForm={nodeForm}
        />
    );
};

export const EditNodeModal = ({
    node,
    onEditNode,
    onDeleteNode,
}: {
    readonly node: Node;
    readonly onEditNode?: (n: Node) => unknown;
    readonly onDeleteNode?: () => unknown;
}) => {
    const nodeForm = useInputForm({
        title: node.title,
        content: node.title,
        pictureURL: node.pictureURL ?? "",
        pictureUnsafe: node.pictureUnsafe,
        hidden: node.hidden,
        featured: node.featured,
    });
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const editNode = async () => {
        if (!validateInputs(nodeForm)) return;

        const { title, content, featured, hidden, pictureURL, pictureUnsafe } =
            nodeForm.getValues();

        const response = await apiClient.provide("patch", "/node/editNode", {
            id: node.id,
            title,
            content,
            hidden,
            featured,
            pictureURL: pictureURL || null,
            pictureUnsafe,
        });
        if (response.status === "error")
            return nodeForm.setError(response.error.message);

        onEditNode?.(response.data);
        closeModal();
    };

    const deleteNode = async () => {
        if (!node) throw new Error("Shouldnt have gotten here");
        const response = await apiClient.provide("delete", "/node/deleteNode", {
            id: String(node.id),
        });
        if (response.status === "error")
            return nodeForm.setError(response.error.message);
        onDeleteNode?.();
        closeAllModals();
    };

    return (
        <NodeModal
            modalButtons={[
                {
                    text: `Edit Page`,
                    onClick: editNode,
                },
                {
                    active: Boolean(node),
                    text: "Delete",
                    category: "error",
                    onClick: () =>
                        openModal(
                            <ConfirmModal
                                onConfirm={deleteNode}
                                title="Delete Page"
                            >
                                This will erase all suggested choices of this
                                page as well as their associated scores. This
                                will NOT delete sub-pages of this page. Are you
                                sure you wish to continue?
                            </ConfirmModal>
                        ),
                },
            ]}
            modalTitle="Editing Page"
            nodeForm={nodeForm}
        />
    );
};
