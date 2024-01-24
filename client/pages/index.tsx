import React, { useContext } from "react";

import { type GetStaticPropsResult } from "next";
import { type DefaultPageProps } from "./_app";
import CrowdventureButton from "+/lib/components/CrowdventureButton";
import { ModalContext } from "+/lib/modal";
import NodeViewer from "+/lib/nodes/NodeViewer";
import { CreateNodeModal } from "+/lib/nodes/NodeModal";

import { type Node } from "@/types/models";
import apiClient from "+/lib/apiClient";
import { useSafeGuardedNodes } from "+/lib/specialHooks";
import { UserContext } from "+/lib/user";

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
    const [featuredNodes, setFeaturedNodes] = useSafeGuardedNodes(
        initFeaturedNodes,
        () => getFeaturedNodes(true)
    );
    const { user } = useContext(UserContext);

    return (
        <>
            {user ? (
                <CrowdventureButton
                    onClick={() => openModal(<CreateNodeModal />)}
                    requireSignedIn
                    style={{ marginBlock: 10 }}
                >
                    Create a New Adventure!
                </CrowdventureButton>
            ) : null}

            <h3>Featured Stories:</h3>
            <NodeViewer
                nodes={featuredNodes}
                onDeleteNode={(nodeId) => {
                    setFeaturedNodes((currNodes) => ({
                        safeNodes: currNodes.safeNodes.filter(
                            (currNode) => currNode.id !== nodeId
                        ),
                        allNodes: currNodes.allNodes.filter(
                            (currNode) => currNode.id !== nodeId
                        ),
                    }));
                }}
                onEditNode={(node) => {
                    setFeaturedNodes((currNodes) => ({
                        safeNodes: currNodes.safeNodes.map((currNode) => {
                            if (currNode.id !== node.id) return currNode;
                            return node;
                        }),
                        allNodes: currNodes.allNodes.map((currNode) => {
                            if (currNode.id !== node.id) return currNode;
                            return node;
                        }),
                    }));
                }}
            />
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
