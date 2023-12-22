import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import CrowdventureAlert from "+/lib/components/CrowdventureAlert";
import LoadingBox from "+/lib/components/LoadingBox";
import PictureModal from "+/lib/components/PictureModal";
import { ModalContext } from "+/lib/modal";
import { UnsafeModeContext } from "+/lib/unsafeMode";
import { deepCopy } from "+/lib/utils";
import { PaletteContext } from "+/lib/colorPalette";
import { useMediaQuery, useWindowSize } from "+/lib/hooks";
import NodeSidebar from "+/lib/nodes/NodeSidebar";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import { blurImageStyle } from "+/lib/styles";

import { type Account, type Node } from "@/types/models";
import apiClient from "+/lib/apiClient";

const NAVBAR_HEIGHT = 100;
const FOOTER_HEIGHT = 78;

const NodePage = ({
    node: initNode,
    owner,
}: {
    readonly node: Node;
    readonly owner: Account;
}) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const { lightBackgroundColor } = useContext(PaletteContext);

    const [node, setNode] = useState(deepCopy(initNode));

    useEffect(() => {
        setNode(deepCopy(initNode));
    }, [initNode]);

    const { effectiveContentWidth } = useWindowSize();

    const router = useRouter();

    const isMobile = useMediaQuery(`(max-width: 800px)`);

    if (!node) return <LoadingBox />;

    if (node.hidden && !unsafeMode)
        return (
            <CrowdventureAlert title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    if (owner.hidden && !unsafeMode)
        return (
            <CrowdventureAlert title="Unsafe!">
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
                                ? "50vh"
                                : `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
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
                            onClick={() => {
                                openModal(
                                    <PictureModal
                                        pictureURL={node.pictureURL!}
                                        title={node.title}
                                    />
                                );
                            }}
                            onError={() => {
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
                <NodeSidebar node={node} setNode={setNode} />
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
}) => {
    const nodeResponse = await apiClient.provide("get", "/node/getNode", {
        slug,
    });

    if (nodeResponse.status === "error")
        throw new Error(nodeResponse.error.message);

    const node = nodeResponse.data.node;

    if (!node) return { notFound: true };

    const owner = nodeResponse.data.owner;

    return {
        props: {
            node,
            owner,
            pageTitle: `Crowdventure! - ${node.title}`,
            previewImage: node.pictureURL,
        },
    };
};

export default NodePage;
