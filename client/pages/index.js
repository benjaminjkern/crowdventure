import React, { useContext, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

import CrowdventureButton from "../lib/components/CrowdventureButton";
import { ModalContext } from "../lib/modal";
import NodeViewer from "../lib/nodes/NodeViewer";
import { graphqlClient } from "./_app";
import CreateNodeModal from "../lib/nodes/CreateNodeModal";
import { UnsafeModeContext } from "../lib/unsafeMode";
import { userSessionServerSideProps } from "../lib/utils";

const HomePage = ({ topNodes: initTopNodes, recentNodes: initRecentNodes }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const [page, setPage] = useState(1);

    const router = useRouter();

    const [
        getTopNodes,
        { data: { featuredNodes: topNodes = initTopNodes } = {} },
    ] = useLazyQuery(TOP_NODES_QUERY);

    useEffect(() => {
        getTopNodes({ allowHidden: unsafeMode });
    }, [unsafeMode]);

    const [
        getRecentNodes,
        { data: { recentlyUpdatedNodes: recentNodes = initRecentNodes } = {} },
    ] = useLazyQuery(RECENT_NODES_QUERY);

    useEffect(() => {
        getRecentNodes({ allowHidden: unsafeMode, pageNum: page });
    }, [unsafeMode, page]);

    const [goToRandomNode, { data: { randomNode } = {} }] = useLazyQuery(gql`
        query RandomNode($allowHidden: Boolean!) {
            randomNode(allowHidden: $allowHidden) {
                ID
            }
        }
    `);

    useEffect(() => {
        if (!randomNode) return;
        router.push(`/node/${randomNode.ID}`);
    }, [randomNode]);

    return (
        <>
            <CrowdventureButton
                requireSignedIn={true}
                onClick={() => openModal(<CreateNodeModal />)}
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
                // This button needs to be formatted off to the side
                onClick={() => {
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

const TOP_NODES_QUERY = gql`
query TopNodes($allowHidden: Boolean!) {
    featuredNodes(allowHidden: $allowHidden) {
        ${NODE_PREVIEW_GQL}
    }
}
`;

export const getServerSideProps = userSessionServerSideProps;

export const getStaticProps = async () => {
    const unsafeMode = false;
    const page = 1;

    return {
        props: {
            topNodes: await graphqlClient
                .query({
                    query: TOP_NODES_QUERY,
                    variables: { allowHidden: unsafeMode },
                    // Always fetch new nodes
                    fetchPolicy: "network-only",
                })
                .then(({ data }) => data.featuredNodes),
            recentNodes: await graphqlClient
                .query({
                    query: RECENT_NODES_QUERY,
                    variables: {
                        pageNum: page,
                        allowHidden: unsafeMode,
                    },
                    // Always fetch new nodes
                    fetchPolicy: "network-only",
                })
                .then(({ data }) => data.recentlyUpdatedNodes),
        },
    };
};

export default HomePage;
