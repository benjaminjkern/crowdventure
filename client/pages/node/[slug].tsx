import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { type GetStaticPropsResult } from "next";
import { type DefaultPageProps } from "../_app";
import CrowdventureAlert from "+/lib/components/CrowdventureAlert";
import LoadingBox from "+/lib/components/LoadingBox";
import PictureModal from "+/lib/components/PictureModal";
import { ModalContext } from "+/lib/modal";
import { UnsafeModeContext } from "+/lib/unsafeMode";
import { PaletteContext } from "+/lib/colorPalette";
import { useMediaQuery, useWindowSize } from "+/lib/hooks";
import NodeSidebar from "+/lib/nodes/NodeSidebar";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import { blurImageStyle } from "+/lib/styles";

import { type Choice, type Node } from "@/types/models";
import apiClient from "+/lib/apiClient";
import { DEFAULT_TEXT_SIZE } from "+/lib/dynamicGlobalStyles";

const NAVBAR_HEIGHT = 100;
const FOOTER_HEIGHT = 78;

type NodePageProps = {
    readonly node: Node;
    readonly choices: Choice[];
};

const NodePage = ({ node: initNode, choices: initChoices }: NodePageProps) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const { lightBackgroundColor } = useContext(PaletteContext);

    const [node, setNode] = useState(initNode);
    const [choices, setChoices] = useState(initChoices);

    useEffect(() => {
        setNode(initNode);
        setChoices(initChoices);
    }, [initNode, initChoices]);

    const { effectiveContentWidth } = useWindowSize();

    const router = useRouter();

    const isMobile = useMediaQuery(`(max-width: 800px)`);

    if (!node) return <LoadingBox />;

    if (node.hidden && !unsafeMode)
        return (
            <CrowdventureAlert goBackButton title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    if (node.owner?.hidden && !unsafeMode)
        return (
            <CrowdventureAlert goBackButton title="Unsafe!">
                This page has been hidden from general users, because the author
                has been flagged as unsafe for the general public. If you would
                like to see it, log in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    // TODO: Figure out where to put this (Alert but still show page)
    // {(node.hidden || node.owner.hidden) &&
    //     node.owner.screenName === user?.screenName &&
    //     !unsafeMode ? (
    //         <CrowdventureAlert title="Unsafe!">
    //             This page has been hidden from general users, because the
    //             content has been deemed unsafe. Users in unsafe mode can see
    //             this page and its content. Since you own this page, you can
    //             see it. If you believe this page should be considered safe,
    //             click <Link href="">Here</Link>.
    //         </CrowdventureAlert>
    //     ) : null}

    return (
        <div style={{ flexDirection: !isMobile ? "row" : undefined, flex: 1 }}>
            {isMobile ? (
                <h1
                    style={{
                        textAlign: "center",
                        display: "block",
                        marginBottom: 20,
                        fontSize: DEFAULT_TEXT_SIZE * 2,
                    }}
                >
                    {node.title}
                </h1>
            ) : null}
            {node.pictureURL ? (
                <div
                    style={{
                        flex: 3,
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            height: isMobile
                                ? "50dvh"
                                : `calc(100dvh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                            ...(!isMobile && {
                                position: "fixed",
                                top: NAVBAR_HEIGHT,
                                width: (effectiveContentWidth * 3) / 5,
                            }),
                        }}
                    >
                        <CrowdventureButton
                            onClick={() => {
                                router.back();
                            }}
                            style={{
                                position: "absolute",
                                zIndex: 1,
                                width: "fit-content",
                                left: 20,
                                top: 20,
                            }}
                        >
                            Go back!
                        </CrowdventureButton>
                        <Image
                            alt="Image failed to load."
                            fill
                            key={node.id}
                            onClick={() => {
                                openModal(
                                    <PictureModal
                                        pictureURL={node.pictureURL!}
                                        title={node.title}
                                    />
                                );
                            }}
                            onError={() => {
                                console.error("ERROR");
                                setNode({ ...node, pictureURL: null });
                            }}
                            src={node.pictureURL}
                            style={{
                                objectFit: "cover",
                                marginLeft: "auto",
                                marginRight: "auto",
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: lightBackgroundColor,
                                borderRadius: 8,
                                cursor: "pointer",
                                ...blurImageStyle(node.pictureUnsafe, 40),
                            }}
                        />
                    </div>
                </div>
            ) : null}
            <div
                style={{
                    flex: 2,
                    paddingLeft: !node.pictureURL || isMobile ? 0 : 50,
                }}
            >
                {!node.pictureURL && (
                    <CrowdventureButton
                        onClick={() => {
                            router.back();
                        }}
                        style={{
                            width: "fit-content",
                        }}
                    >
                        Go back!
                    </CrowdventureButton>
                )}
                <NodeSidebar
                    choices={choices}
                    node={node}
                    setChoices={setChoices}
                    setNode={setNode}
                />
            </div>
        </div>
    );
};

export const getStaticPaths = () => ({
    paths: [],
    fallback: "blocking",
});

export const getStaticProps = async ({
    params: { slug },
}: {
    params: { slug: string };
}): Promise<GetStaticPropsResult<NodePageProps & DefaultPageProps>> => {
    const nodeResponse = await apiClient.provide("get", "/node/getNode", {
        slug,
    });

    if (nodeResponse.status === "error")
        throw new Error(nodeResponse.error.message);

    const node = nodeResponse.data.node;

    if (!node) return { notFound: true };

    const choicesResponse = await apiClient.provide(
        "get",
        "/choice/getChoicesForNode",
        {
            fromNodeId: String(node.id),
        }
    );
    if (choicesResponse.status === "error")
        throw new Error(choicesResponse.error.message);

    return {
        props: {
            node,
            choices: choicesResponse.data.choices,
            pageTitle: `Crowdventure! - ${node.title}`,
            previewImage: node.pictureURL,
        },
        revalidate: 1,
    };
};

export default NodePage;
