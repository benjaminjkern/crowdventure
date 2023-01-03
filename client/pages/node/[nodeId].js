import { gql } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import AccountPreview from "../../lib/accounts/AccountPreview";
import CrowdventureAlert from "../../lib/components/CrowdventureAlert";
import CrowdventureButton from "../../lib/components/CrowdventureButton";

// import PictureModal from "../Modals/PictureModal";
// import EditNodeModal from "../Modals/EditNodeModal";
// import SuggestChoiceModal from "../Modals/SuggestChoiceModal";

// import ChoiceColumns from "./ChoiceColumns";

import { graphqlClient, UserContext } from "../_app";

const NodePage = ({ node }) => {
    const BLURAMOUNT = 40;

    const { user } = useContext(UserContext);

    const router = useRouter();

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

    const unsafeMode = false;

    if (!node) return <div>WTF</div>;

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
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: "1px",
                        border: "1px solid #eee",
                        borderRadius: 8,
                        width: "90%",
                        maxHeight: "30vh",
                        objectFit: "cover",
                        cursor: "pointer",
                        ...(node.pictureUnsafe
                            ? {
                                  "-webkit-filter":
                                      "blur(" + BLURAMOUNT + "px)",
                                  filter: "blur(" + BLURAMOUNT + "px)",
                              }
                            : {}),
                    }}
                    onClick={
                        () => {}
                        // showModal(
                        //     <PictureModal
                        //         loggedInAs={loggedInAs}
                        //         pictureURL={node.pictureURL}
                        //         title={node.title}
                        //         close={() => showModal(undefined)}
                        //     />
                        // )
                    }
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
            {node.canonChoices.length ? (
                <div>Choice Columns</div>
            ) : (
                // <ChoiceColumns
                //     node={node}
                //     canon={true}
                // />
                <p className="text-muted">
                    By decree of <strong>{node.owner.screenName}</strong>, this
                    journey ends here.
                </p>
            )}
            <hr />
            <h3>Other options:</h3>
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
            {node.nonCanonChoices.length ? (
                <div>Choice Columns</div>
            ) : (
                // <ChoiceColumns
                //     node={node}
                //     loggedInAs={loggedInAs}
                //     canon={false}
                // />
                <p className="text-muted">
                    There are currently no options! You can help expand the
                    story by adding to it!
                </p>
            )}
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

export const getStaticProps = async ({ params: { nodeId } }) => {
    const node = await graphqlClient
        .query({
            query: gql`
                query GetNode($ID: String!) {
                    getNode(ID: $ID) {
                        hidden
                        pictureURL
                        pictureUnsafe
                        fgColor
                        bgColor
                        ID
                        title
                        content
                        views
                        owner {
                            screenName
                            profilePicURL
                            hidden
                        }
                        canonChoices {
                            ID
                        }
                        nonCanonChoices {
                            ID
                        }
                    }
                }
            `,
            variables: { ID: nodeId },
        })
        .then(({ data = {} }) => {
            return data.getNode;
        });

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
