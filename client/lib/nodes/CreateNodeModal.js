import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import CrowdventureButton from "../components/CrowdventureButton";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../user";
import { mutationCall } from "../apiUtils";
import ConfirmModal from "../components/ConfirmModal";
import CrowdventureCheckboxInput from "../components/CrowdventureCheckboxInput";
import { ModalContext } from "../modal";
import ImageSearch from "../components/ImageSearch";
import CloseButton from "../components/CloseButton";
import { PaletteContext } from "../colorPalette";
import { useStatelessValue } from "../hooks";

// import SearchImage from "../SearchImage";

const CreateNodeModal = ({
    callback,
    node,
    setNode,
    picture,
    pictureUnsafe,
    featured,
}) => {
    const title = useStatelessValue(node?.title || "");
    const content = useStatelessValue(node?.content || "");
    const hidden = useStatelessValue(node?.hidden || false);

    const [info, setInfo] = useState("");

    const { user } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const { lightBackgroundColor, mutedTextColor } = useContext(PaletteContext);
    const router = useRouter();

    const validateInputs = () => {
        if (!title.getValue()) {
            setInfo(
                <span style={{ color: "red" }}>Content cannot be empty!</span>
            );
            return false;
        }

        if (!content.getValue()) {
            setInfo(
                <span style={{ color: "red" }}>Title cannot be empty!</span>
            );
            return false;
        }

        return true;
    };

    const editNode = async () => {
        if (!validateInputs()) return;

        const newNode = await mutationCall(
            "editNode",
            { ID: 0 },
            {
                nodeID: node.ID,
                title,
                content,
                // pictureURL: pictureField,
                hidden:
                    // shouldHide ||
                    (hidden.getValue() !== undefined && !node.pictureUnsafe) ||
                    undefined,
                // pictureUnsafe: shouldHide,
            }
        );
        setNode(newNode);
        closeModal();
    };

    const createNode = async () => {
        if (!validateInputs()) return;

        const newNode = await mutationCall(
            "createNode",
            {
                ID: 0,
            },
            {
                accountScreenName: user.screenName,
                title,
                content,
                featured: featured || false,
                // pictureURL: pictureField,
                // hidden: shouldHide || undefined,
                // pictureUnsafe: shouldHide || undefined,
            }
        );
        router.push(`/node/${newNode.ID}`);
        closeModal();
    };

    const deleteNode = async () => {
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
                                content={
                                    <span>
                                        This will erase all suggested choices of
                                        this page, and their associated scores.
                                        This will NOT delete sub-pages of this
                                        page. Are you sure you wish to continue?
                                    </span>
                                }
                                onConfirm={deleteNode}
                                title="Delete Page"
                            />
                        ),
                },
            ]}
            modalTitle={`${node ? "Editing" : "Creating New"} Page`}
        >
            {node.pictureURL ? (
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
            {info || ""}
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
