import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import CrowdventureButton from "../components/CrowdventureButton";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { UserContext } from "../../pages/_app";

// import SearchImage from "../SearchImage";

const CreateNodeModal = ({ callback, picture, pictureUnsafe, featured }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pictureField, setPictureField] = useState(picture);
    const [showImageSearch, setShowImageSearch] = useState(false);

    const [info, setInfo] = useState("");
    const [shouldHide, setShouldHide] = useState(pictureUnsafe);

    const { user } = useContext(UserContext);

    const router = useRouter();

    const [createNodeMutation, { data: { createNode: newNode } = {} }] =
        useMutation(gql`
            mutation CreateNode(
                $accountScreenName: String!,
                $title: String!,
                content: String!,
                featured: Boolean!,
                hidden: Boolean,
                pictureUnsafe: Boolean,
                pictureURL: String
            ) {
                createNode(
                    accountScreenName: $accountScreenName,
                    title: $title,
                    content: $content,
                    featured: $featured,
                    hidden: $hidden,
                    pictureUnsafe: $pictureUnsafe,
                    pictureURL: $pictureURL
                ) {
                    ID
                }
            }
        `);

    const createNode = () => {
        if (!title)
            return setInfo(
                <span style={{ color: "red" }}>Content cannot be empty!</span>
            );

        if (!content)
            return setInfo(
                <span style={{ color: "red" }}>Title cannot be empty!</span>
            );

        createNodeMutation({
            variables: {
                accountScreenName: user.screenName,
                title,
                content,
                featured: featured || false,
                pictureURL: pictureField,
                ...(shouldHide ? { hidden: true, pictureUnsafe: true } : {}),
            },
        });
    };

    useEffect(() => {
        if (newNode) router.push(`/node/${newNode.ID}`);
    }, [newNode]);

    return (
        <CrowdventureModal
            modalTitle="Creating New Page"
            modalButtons={[
                {
                    text: "Create Page!",
                    onClick: () => {
                        createNode();
                    },
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
                            width: "100%",
                            objectFit: "contain",
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
