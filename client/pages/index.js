import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CrowdventureButton from "../lib/components/CrowdventureButton";
import NodeViewer from "../lib/nodes/NodeViewer";
import { graphqlClient } from "./_app";

const Home = ({ topNodes, recentNodes: initRecentNodes }) => {
    const unsafeMode = false;
    const [page, setPage] = useState(1);

    const router = useRouter();

    const [
        getRecentNodes,
        { data: { recentlyUpdatedNodes: recentNodes = initRecentNodes } = {} },
    ] = useLazyQuery(RECENT_NODES_QUERY);

    const [goToRandomNode, { data: randomNodeData }] = useLazyQuery(gql`
        query RandomNode($allowHidden: Boolean!) {
            randomNode(allowHidden: $allowHidden) {
                ID
            }
        }
    `);

    useEffect(() => {
        if (!randomNodeData) return;
        router.push(`/node/${randomNodeData.randomNode.ID}`);
    }, [randomNodeData]);

    //allowHidden:
    //             loggedInAs && loggedInAs.unsafeMode,

    return (
        <>
            <CrowdventureButton
                requireSignedIn={true}
                onClick={() => {
                    // showModal(
                    //     <CreateNodeModal
                    //         featured={true}
                    //         loggedInAs={loggedInAs}
                    //         close={() => showModal(undefined)}
                    //         callback={(res) =>
                    //             setRedirect(
                    //                 <Redirect to={`/node/${res.ID}`} />
                    //             )
                    //         }
                    //     />
                    // );
                }}
            >
                Create a New Adventure!
            </CrowdventureButton>

            <hr />

            <h3>Featured Stories:</h3>
            <NodeViewer nodes={topNodes} />

            <hr />

            <h3>Recently added or updated:</h3>
            <NodeViewer nodes={recentNodes} />

            <hr />

            <CrowdventureButton
                // This needs to be off to the side
                onClick={() => {
                    getRecentNodes({
                        variables: {
                            pageNum: page + 1,
                            allowHidden: unsafeMode,
                        },
                    });
                    setPage(page + 1);
                }}
            >
                Next &gt;
            </CrowdventureButton>

            <CrowdventureButton
                onClick={() => {
                    goToRandomNode({ variables: { allowHidden: unsafeMode } });
                }}
            >
                Play a random adventure!
            </CrowdventureButton>
        </>
    );
};

const NODE_PREVIEW_GQL = `
    hidden
    ID
    title
    owner {
        screenName
        profilePicURL
    }
    views
    size
    pictureURL
    pictureUnsafe
`;

const RECENT_NODES_QUERY = gql`
query RecentNodes($pageNum: Int!, $allowHidden: Boolean!) {
    recentlyUpdatedNodes(pageNum: $pageNum, allowHidden: $allowHidden) {
        ${NODE_PREVIEW_GQL}
    }
}
`;

export const getStaticProps = async () => {
    const unsafeMode = false;
    const page = 1;

    return {
        props: {
            topNodes: await graphqlClient
                .query({
                    query: gql`
                        query TopNodes($allowHidden: Boolean!) {
                            featuredNodes(allowHidden: $allowHidden) {
                                ${NODE_PREVIEW_GQL}
                            }
                        }
                    `,
                    variables: { allowHidden: unsafeMode },
                })
                .then(({ data }) => data.featuredNodes),
            recentNodes: await graphqlClient
                .query({
                    query: RECENT_NODES_QUERY,
                    variables: {
                        pageNum: page,
                        allowHidden: unsafeMode,
                    },
                })
                .then(({ data }) => data.recentlyUpdatedNodes),
        },
    };
};

export default Home;
