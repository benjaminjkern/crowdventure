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

const CreateNodeModal = ({
    callback,
    node,
    setNode,
    featured: initFeatured,
}: {
    readonly node?: Node;
    readonly setNode?: Dispatch<SetStateAction<Node>>;
    readonly featured?: boolean;
}) => {
    const nodeForm = useInputForm({
        title: node?.title || "",
        content: node?.content || "",
        featured: node?.featured ?? (initFeatured || false),
        hidden: node?.content || "",
        pictureUnsafe: node?.pictureUnsafe || false,
    });

    const [error, setError] = useState("");

    const { user } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const { lightBackgroundColor, mutedTextColor } = useContext(PaletteContext);
    const router = useRouter();

    const validateInputs = () => {
        const { title, content } = nodeForm.getValues();
        if (!title) {
            setError("Content cannot be empty!");
            return false;
        }

        if (!content) {
            setError("Title cannot be empty!");
            return false;
        }

        return true;
    };

    const editNode = async () => {
        const { title, content, featured, hidden, pictureUnsafe } =
            nodeForm.getValues();

        const response = apiClient.provide("patch", "/node/editNode", {
            nodeID: node.ID,
            title,
            content,
            // pictureURL: pictureField,
            hidden,
            featured,
            pictureUnsafe,
        });
        setNode(newNode);
        closeModal();
    };

    const createNode = async () => {
        const { title, content, featured } = nodeForm.getValues();

        const newNode = (await mutationCall(
            "createNode",
            {
                ID: 0,
            },
            {
                title,
                content,
                featured,
                // pictureURL: pictureField,
            }
        )) as CrowdventureNode;
        void router.push(`/node/${newNode.ID}`);
        closeModal();
    };

    const deleteNode = async () => {
        if (!node) throw new Error("Shouldnt have gotten here");
        await mutationCall("deleteNode", undefined, { nodeID: node.ID });
        router.back();
        closeAllModals();
    };

    return (
        <CrowdventureModal
            modalButtons={[
                {
                    text: `${node ? "Edit" : "Create"} Page!`,
                    onClick: () => {
                        if (!validateInputs()) return;
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
                <CrowdventureTextInput value={title} />
                Content:
                <CrowdventureTextInput rows={3} value={content} />
            </div>
            {node && user?.isAdmin ? (
                <>
                    <hr />
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        label="Page should be hidden"
                        style={{ marginTop: 10 }}
                    />
                </>
            ) : null}
            {error ? <span style={{ color: "red" }}>{error}</span> : null}
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

export default CreateNodeModal;
