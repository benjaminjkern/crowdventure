import Image from "next/image";
import React, {
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { useRouter } from "next/router";

import CrowdventureButton from "../components/CrowdventureButton";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import { ModalContext } from "../modal";
import ImageSearch from "../components/ImageSearch";
import CloseButton from "../components/CloseButton";
import { PaletteContext } from "../colorPalette";
import { useInputForm } from "../hooks";
import apiClient from "../apiClient";
import { type Node } from "@/types/models";

// import SearchImage from "../SearchImage";

const NodeModal = ({
    callback,
    featured: initFeatured,
    pictureURL: initPictureURL,
    pictureUnsafe: initPictureUnsafe,
    node,
    setNode,
}: {
    readonly callback?: (n: Node) => unknown;
} & (
    | {
          readonly node: Node;
          readonly setNode: Dispatch<SetStateAction<Node>>;

          readonly featured?: undefined;
          readonly pictureURL?: undefined;
          readonly pictureUnsafe?: undefined;
      }
    | {
          readonly node?: undefined;
          readonly setNode?: undefined;

          readonly featured: boolean;
          readonly pictureURL?: string | null;
          readonly pictureUnsafe?: boolean;
      }
)) => {
    const nodeForm = useInputForm(
        node
            ? {
                  title: node.title,
                  content: node.title,
                  pictureURL: node.pictureURL ?? "",
                  pictureUnsafe: node.pictureUnsafe,
                  hidden: node.hidden,
                  featured: node.featured,
              }
            : {
                  title: "",
                  content: "",
                  pictureURL: initPictureURL ?? "",
                  pictureUnsafe: initPictureUnsafe ?? false,
                  hidden: false,
                  featured: initFeatured,
              }
    );

    const { user } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const { lightBackgroundColor, mutedTextColor } = useContext(PaletteContext);
    const router = useRouter();

    const validateInputs = () => {
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

    const editNode = async () => {
        if (!node) return;
        if (!validateInputs()) return;

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

        setNode(response.data);
        closeModal();
    };

    const createNode = async () => {
        if (!validateInputs()) return;
        const { title, content, featured, pictureURL } = nodeForm.getValues();

        const response = await apiClient.provide("post", "/node/createNode", {
            title,
            content,
            featured,
            pictureURL: pictureURL || undefined,
        });
        if (response.status === "error")
            return nodeForm.setError(response.error.message);
        closeModal();
        router.push(`/node/${response.data.slug}`);
    };

    const deleteNode = async () => {
        if (!node) throw new Error("Shouldnt have gotten here");
        const response = await apiClient.provide("delete", "/node/deleteNode", {
            id: String(node.id),
        });
        if (response.status === "error")
            return nodeForm.setError(response.error.message);
        closeAllModals();
        router.back();
    };

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `${node ? "Edit" : "Create"} Page!`,
                    onClick: () => {
                        if (node) editNode();
                        else createNode();
                    },
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
                                page, and their associated scores. This will NOT
                                delete sub-pages of this page. Are you sure you
                                wish to continue?
                            </ConfirmModal>
                        ),
                },
            ]}
            modalTitle={`${node ? "Editing" : "Creating New"} Page`}
        >
            {node?.pictureURL ? (
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
                        src={node.pictureURL}
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
            {node && user?.isAdmin ? (
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

export default NodeModal;