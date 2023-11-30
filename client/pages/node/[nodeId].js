import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AccountPreview from "../../lib/accounts/AccountPreview";
import ActionCard from "../../lib/actions/ActionCard";
import ChoiceModal from "../../lib/actions/ChoiceModal";
import { queryCall } from "../../lib/apiUtils";
import CrowdventureAlert from "../../lib/components/CrowdventureAlert";
import CrowdventureButton from "../../lib/components/CrowdventureButton";
import LoadingBox from "../../lib/components/LoadingBox";
import PictureModal from "../../lib/components/PictureModal";
import { ModalContext } from "../../lib/modal";
import CreateNodeModal from "../../lib/nodes/CreateNodeModal";
import { UnsafeModeContext } from "../../lib/unsafeMode";
import { UserContext } from "../../lib/user";
import { deepCopy } from "../../lib/utils";
import { PaletteContext } from "../../lib/colorPalette";

// import EditNodeModal from "../Modals/EditNodeModal";
// import SuggestChoiceModal from "../Modals/SuggestChoiceModal";

// import ChoiceColumns from "./ChoiceColumns";

const NodePage = ({ node: initNode }) => {
    const BLURAMOUNT = 40;

    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const { lightBackgroundColor } = useContext(PaletteContext);
    const router = useRouter();

    const [node, setNode] = useState(deepCopy(initNode));

    useEffect(() => {
        setNode(deepCopy(initNode));
    }, [initNode]);

    const reportNode = () => {
        // mutation_call(
        //     "createFeedback",
        //     {
        //         ...(loggedInAs
        //             ? { accountScreenName: loggedInAs.screenName }
        //             : {}),
        //         info: "This is inappropriate",
        //         reportingObjectType: "Node",
        //         reportingObjectID: node.ID,
        //     },
        //     { info: 0, reporting: 0 },
        //     () => {
        //         alert("Successfully reported page!");
        //         window.location.reload(false);
        //     }
        // );
    };

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
        <div style={{ flexDirection: "row" }}>
            {node.pictureURL ? (
                <div style={{ flex: 3, position: "relative" }}>
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
            ) : null}
            <div style={{ flex: 2 }}>
                <h1>{node.title}</h1>
                {node.content.split("\n").map((line, i) => (
                    <p key={i} style={{ textIndent: "5%" }}>
                        {line}
                    </p>
                ))}
                <hr />
                <CrowdventureButton
                    // Should be off to the side
                    onClick={() => {
                        router.back();
                    }}
                >
                    Go back!
                </CrowdventureButton>
                {node.canonChoices.length === 0 && (
                    <p className="text-muted">
                        By decree of <strong>{node.owner.screenName}</strong>,
                        this journey ends here.
                    </p>
                )}
                Author: <AccountPreview account={node.owner} />
                Views: {node.views}
                {node.owner.screenName === user?.screenName || user?.isAdmin ? (
                    <CrowdventureButton
                        onClick={() => {
                            openModal(
                                <CreateNodeModal
                                    node={node}
                                    setNode={setNode}
                                />
                            );
                        }}
                    >
                        Edit Page
                    </CrowdventureButton>
                ) : null}
                {node.canonChoices.length + node.nonCanonChoices.length > 0 ? (
                    <div>
                        {[...node.canonChoices, ...node.nonCanonChoices].map(
                            (choice, idx) => (
                                <ActionCard choice={choice} key={idx} />
                            )
                        )}
                    </div>
                ) : (
                    <p className="text-muted">
                        There are currently no options! You can help expand the
                        story by adding to it!
                    </p>
                )}
                <CrowdventureButton
                    onClick={() => {
                        openModal(<ChoiceModal fromNode={node} />);
                    }}
                    requireSignedIn
                >
                    Suggest New Choice
                </CrowdventureButton>
                <CrowdventureButton onClick={reportNode}>
                    Report Page
                </CrowdventureButton>
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
