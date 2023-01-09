import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import AccountPreview from "../../lib/accounts/AccountPreview";
import ActionCard from "../../lib/actions/ActionCard";
import { queryCall } from "../../lib/apiUtils";
import CrowdventureAlert from "../../lib/components/CrowdventureAlert";
import CrowdventureButton from "../../lib/components/CrowdventureButton";
import LoadingBox from "../../lib/components/LoadingBox";
import PictureModal from "../../lib/components/PictureModal";
import { ModalContext } from "../../lib/modal";
import { UnsafeModeContext } from "../../lib/unsafeMode";
import { UserContext } from "../../lib/user";
import { deepCopy } from "../../lib/utils";

// import EditNodeModal from "../Modals/EditNodeModal";
// import SuggestChoiceModal from "../Modals/SuggestChoiceModal";

// import ChoiceColumns from "./ChoiceColumns";

const NodePage = ({ node: initNode }) => {
    const BLURAMOUNT = 40;

    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();

    const node = deepCopy(initNode);

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

    return (
        <>
            {(node.hidden || node.owner.hidden) &&
                node.owner.screenName === user?.screenName &&
                !unsafeMode && (
                    <CrowdventureAlert title="Unsafe!">
                        This page has been hidden from general users, because
                        the content has been deemed unsafe. Users in unsafe mode
                        can see this page and its content. Since you own this
                        page, you can see it. If you believe this page should be
                        considered safe, click <a href="">Here</a>.
                    </CrowdventureAlert>
                )}
            <h1>{node.title}</h1>
            {node.pictureURL && (
                <Image
                    width={200}
                    height={200}
                    src={node.pictureURL}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#eee",
                        borderRadius: 8,
                        cursor: "pointer",
                        ...(node.pictureUnsafe
                            ? {
                                  "-webkit-filter":
                                      "blur(" + BLURAMOUNT + "px)",
                                  filter: "blur(" + BLURAMOUNT + "px)",
                              }
                            : {}),
                    }}
                    onClick={() => {
                        openModal(
                            <PictureModal
                                pictureURL={node.pictureURL}
                                title={node.title}
                            />
                        );
                    }}
                />
            )}
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
                    By decree of <strong>{node.owner.screenName}</strong>, this
                    journey ends here.
                </p>
            )}
            Author: <AccountPreview account={node.owner} />
            Views: {node.views}
            {(node.owner.screenName === user?.screenName || user?.isAdmin) && (
                <CrowdventureButton
                    onClick={() => {
                        // showModal(<EditNodeModal node={node} />);
                    }}
                >
                    Edit Page
                </CrowdventureButton>
            )}
            {node.canonChoices.length + node.nonCanonChoices.length > 0 ? (
                <div>
                    {[...node.canonChoices, ...node.nonCanonChoices].map(
                        (choice, idx) => {
                            return <ActionCard choice={choice} key={idx} />;
                        }
                    )}
                </div>
            ) : (
                <p className="text-muted">
                    There are currently no options! You can help expand the
                    story by adding to it!
                </p>
            )}
            <CrowdventureButton
                requireSignedIn={true}
                onClick={() => {
                    // showModal(
                    //     <SuggestChoiceModal
                    //         loggedInAs={loggedInAs}
                    //         fromNode={node}
                    //         close={() => showModal(undefined)}
                    //     />
                    // );
                }}
            >
                Suggest New Choice
            </CrowdventureButton>
            <CrowdventureButton onClick={reportNode}>
                Report Page
            </CrowdventureButton>
        </>
    );
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

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
