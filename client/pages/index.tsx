import React, { useContext } from "react";

import { type GetStaticPropsResult } from "next";
import { type DefaultPageProps } from "./_app";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import { ModalContext } from "+/lib/modal";
import NodeViewer from "+/lib/nodes/NodeViewer";
import CreateNodeModal from "+/lib/nodes/CreateNodeModal";

import { type Node } from "@/types/models";
import apiClient from "+/lib/apiClient";
import { useSafeGuardedNodes } from "+/lib/specialHooks";

const getFeaturedNodes = async (unsafeMode: boolean) => {
    const response = await apiClient.provide("get", "/node/featuredNodes", {
        allowHidden: String(unsafeMode),
    });
    if (response.status === "error") throw new Error(response.error.message);
    return response.data.nodes;
};

type HomePageProps = {
    readonly featuredNodes: Node[];
};

const HomePage = ({ featuredNodes: initFeaturedNodes }: HomePageProps) => {
    const { openModal } = useContext(ModalContext);
    const featuredNodes = useSafeGuardedNodes(initFeaturedNodes, () =>
        getFeaturedNodes(true)
    );

    return (
        <>
            <CrowdventureButton
                onClick={() => openModal(<CreateNodeModal />)}
                requireSignedIn
            >
                Create a New Adventure!
            </CrowdventureButton>

            <hr />

            <h3>Featured Stories:</h3>
            <NodeViewer nodes={featuredNodes} />
        </>
    );
};

export const getStaticProps = async (): Promise<
    GetStaticPropsResult<HomePageProps & DefaultPageProps>
> => ({
    props: {
        featuredNodes: await getFeaturedNodes(false),
    },
});

export default HomePage;
