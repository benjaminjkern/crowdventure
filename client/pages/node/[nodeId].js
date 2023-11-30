import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { queryCall } from "../../lib/apiUtils";
import CrowdventureAlert from "../../lib/components/CrowdventureAlert";
import LoadingBox from "../../lib/components/LoadingBox";
import PictureModal from "../../lib/components/PictureModal";
import { ModalContext } from "../../lib/modal";
import { UnsafeModeContext } from "../../lib/unsafeMode";
import { deepCopy } from "../../lib/utils";
import { PaletteContext } from "../../lib/colorPalette";
import { useWindowSize } from "../../lib/hooks";
import NodeSidebar from "../../lib/nodes/NodeSidebar";
import CrowdventureButton from "../../lib/components/CrowdventureButton";
import { useRouter } from "next/router";

// import EditNodeModal from "../Modals/EditNodeModal";
// import SuggestChoiceModal from "../Modals/SuggestChoiceModal";

// import ChoiceColumns from "./ChoiceColumns";

const NAVBAR_HEIGHT = 100;
const FOOTER_HEIGHT = 78;

const NodePage = ({ node: initNode }) => {
    const BLURAMOUNT = 40;

    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const { lightBackgroundColor } = useContext(PaletteContext);

    const [node, setNode] = useState(deepCopy(initNode));

    useEffect(() => {
        setNode(deepCopy(initNode));
    }, [initNode]);

    // if (node === null)
    //     return (
    //         <Alert variant="danger">
    //             <title>Error! Node: {match.params.id}</title>
    //             <Alert.Heading>Oh snap! You ran into an error</Alert.Heading>
    //             <p>
    //                 This page does not exist, or maybe our database is down. Who
    //                 knows? Not you. Hahahaha
    //             </p>
    //         </Alert>
    //     );

    const { effectiveContentWidth } = useWindowSize();

    const router = useRouter();

    if (!node) return <LoadingBox />;

    // Dumb hack because backend is bad
    if (node.pictureURL === "null") node.pictureURL = null;

    node.canonChoices.forEach((choice) => {
        choice.from = node;
        choice.canon = true;
    });
    node.nonCanonChoices.forEach((choice) => {
        choice.from = node;
        choice.canon = false;
    });

    if (node.hidden && !unsafeMode)
        return (
            <CrowdventureAlert title="Unsafe!">
                This page has been hidden from general users, because the
                content has been deemed unsafe. If you would like to see it, log
                in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

    if (node.owner.hidden && !unsafeMode)
        return (
            <CrowdventureAlert title="Unsafe!">
                This page has been hidden from general users, because the author
                has been flagged as unsafe for the general public. If you would
                like to see it, log in and turn on <b>Unsafe mode</b>!
            </CrowdventureAlert>
        );

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
        <div style={{ flexDirection: "row", flex: 1 }}>
            {node.pictureURL ? (
                <div
                    style={{
                        flex: 3,
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "fixed",
                            top: NAVBAR_HEIGHT,
                            height: `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
                            width: (effectiveContentWidth * 3) / 5,
                        }}
                    >
                        <CrowdventureButton
                            // Should be off to the side
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
                            fill
                            objectFit="cover"
                            onClick={() => {
                                openModal(
                                    <PictureModal
                                        pictureURL={node.pictureURL}
                                        title={node.title}
                                    />
                                );
                            }}
                            src={node.pictureURL}
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: lightBackgroundColor,
                                borderRadius: 8,
                                cursor: "pointer",
                                ...(node.pictureUnsafe
                                    ? {
                                          "-webkit-filter": `blur(${BLURAMOUNT}px)`,
                                          filter: `blur(${BLURAMOUNT}px)`,
                                      }
                                    : {}),
                            }}
                        />
                    </div>
                </div>
            ) : null}
            <div style={{ flex: 2 }}>
                <NodeSidebar node={node} setNode={setNode} />
            </div>
        </div>
    );
};

export const getStaticPaths = () => ({
    paths: [],
    fallback: "blocking",
});

const FULL_CHOICE_GQL = {
    ID: 0,
    action: 0,
    likedBy: { screenName: 0 },
    dislikedBy: { screenName: 0 },
    score: 0,
    suggestedBy: {
        hidden: 0,
        screenName: 0,
        profilePicURL: 0,
    },
    hidden: 0,
    to: {
        owner: {
            screenName: 0,
            hidden: 0,
        },
        ID: 0,
        hidden: 0,
    },
};

const FULL_NODE_GQL = {
    hidden: 0,
    pictureURL: 0,
    pictureUnsafe: 0,
    fgColor: 0,
    bgColor: 0,
    ID: 0,
    title: 0,
    content: 0,
    views: 0,
    owner: {
        screenName: 0,
        profilePicURL: 0,
        hidden: 0,
    },
    canonChoices: FULL_CHOICE_GQL,
    nonCanonChoices: FULL_CHOICE_GQL,
};

export const getStaticProps = async ({ params: { nodeId } }) => {
    const node = await queryCall("getNode", FULL_NODE_GQL, { ID: nodeId });

    if (!node) return { notFound: true };

    return {
        props: {
            node,
            pageTitle: `Crowdventure! - ${node.title}`,
            previewImage: node.pictureURL,
        },
    };
};

export default NodePage;
