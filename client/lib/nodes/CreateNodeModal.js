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

// import SearchImage from "../SearchImage";

const CreateNodeModal = ({
    callback,
    node,
    setNode,
    picture,
    pictureUnsafe,
    featured,
}) => {
    const [title, setTitle] = useState(node?.title);
    const [content, setContent] = useState(node?.content);
    const [pictureField, setPictureField] = useState(
        node?.pictureURL || picture
    );
    const [shouldHide, setShouldHide] = useState(pictureUnsafe);
    const [hidden, setHidden] = useState();

    const [showImageSearch, setShowImageSearch] = useState(false);
    const [info, setInfo] = useState("");

    const { user } = useContext(UserContext);
    const { openModal, closeModal, closeAllModals } = useContext(ModalContext);
    const router = useRouter();

    const validateInputs = () => {
        if (!title) {
            setInfo(
                <span style={{ color: "red" }}>Content cannot be empty!</span>
            );
            return false;
        }

        if (!content) {
            setInfo(
                <span style={{ color: "red" }}>Title cannot be empty!</span>
            );
            return false;
        }

        return true;
    };

    const editNode = () => {
        if (!validateInputs()) return;

        mutationCall(
            "editNode",
            { ID: 0 },
            {
                nodeID: node.ID,
                title,
                content,
                pictureURL: pictureField,
                hidden:
                    shouldHide ||
                    (hidden !== undefined && !node.pictureUnsafe) ||
                    undefined,
                pictureUnsafe: shouldHide,
            }
        ).then((newNode) => {
            setNode(newNode);
            closeModal();
        });
    };

    const createNode = () => {
        if (!validateInputs()) return;

        mutationCall(
            "createNode",
            {
                ID: 0,
            },
            {
                accountScreenName: user.screenName,
                title,
                content,
                featured: featured || false,
                pictureURL: pictureField,
                hidden: shouldHide || undefined,
                pictureUnsafe: shouldHide || undefined,
            }
        ).then((newNode) => {
            router.push(`/node/${newNode.ID}`);
            closeModal();
        });
    };

    const deleteNode = () => {
        mutationCall("deleteNode", undefined, { nodeID: node.ID }).then(() => {
            router.back();
            closeAllModals();
        });
    };

    return (
        <CrowdventureModal
            modalTitle={`${node ? "Editing" : "Creating New"} Page`}
            modalButtons={[
                {
                    text: `${node ? "Edit" : "Create"} Page!`,
                    onClick: () => {
                        if (node) editNode();
                        else createNode();
                    },
                },
                {
                    active: !!node,
                    text: "Delete",
                    onClick: () =>
                        openModal(
                            <ConfirmModal
                                onConfirm={deleteNode}
                                title="Delete Page"
                                content="This will erase all suggested choices of this page, and their associated scores. This will NOT delete sub-pages of this page. Are you sure you wish to continue?"
                            />
                        ),
                },
            ]}
        >
            {pictureField && (
                <div
                    style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#eee",
                        borderRadius: 8,
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={pictureField}
                        alt="This text shouldnt be showing!"
                        style={{
                            padding: 1,
                            borderRadius: 8,
                        }}
                    />
                    {/* <span
                        className="fa fa-times"
                        style={{
                            position: "absolute",
                            top: "1.5em",
                            right: "1.5em",
                            color: "#888",
                            cursor: "pointer",
                            textShadow:
                                "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#555")}
                        onMouseLeave={(e) => (e.target.style.color = "#888")}
                        onClick={() => {
                            setPictureField("");
                            setShouldHide(false);
                        }}
                    /> */}
                </div>
            )}
            Picture:
            <span>
                {!pictureField
                    ? "(Don't use any picture)"
                    : pictureField === node?.pictureURL
                    ? "(Use existing picture)"
                    : "(Use new picture)"}
            </span>
            <CrowdventureButton
                onClick={() => setShowImageSearch(!showImageSearch)}
            >
                {pictureField ? "Change" : "Select"} Picture
            </CrowdventureButton>
            {showImageSearch && (
                <>
                    <br />
                    (Image search goes here)
                    {/* <SearchImage
                            loggedInAs={loggedInAs}
                            callback={(url, familyFriendly) => {
                                setPictureField(url);
                                setShowChangePic(false);
                                setShouldHide(!familyFriendly);
                            }}
                        /> */}
                </>
            )}
            <hr />
            Title:
            <CrowdventureTextInput value={title} onChangeText={setTitle} />
            Content:
            <CrowdventureTextInput
                rows={3}
                value={content}
                onChangeText={setContent}
            />
            {node && user?.isAdmin && (
                <>
                    Admin Controls:
                    <CrowdventureCheckboxInput
                        checked={hidden}
                        onChange={setHidden}
                        label="Page should be hidden"
                    />
                </>
            )}
            {info || ""}
            {shouldHide && (
                <span style={{ color: "red" }}>
                    The image chosen will cause the page to automatically be
                    hidden. If you would like to not have this happen, change or
                    remove the image.
                </span>
            )}
        </CrowdventureModal>
    );
};

export default CreateNodeModal;
