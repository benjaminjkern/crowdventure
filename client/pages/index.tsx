import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import CrowdventureButton from "+/lib/components/CrowdventureButton";
import { ModalContext } from "+/lib/modal";
import NodeViewer from "+/lib/nodes/NodeViewer";
import CreateNodeModal from "+/lib/nodes/CreateNodeModal";
import { UnsafeModeContext } from "+/lib/unsafeMode";

import { type Node } from "@/types/models";

const HomePage = ({
    topNodes: initTopNodes,
    recentNodes: initRecentNodes,
}: {
    readonly topNodes: Node[];
    readonly recentNodes: Node[];
}) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { openModal } = useContext(ModalContext);
    const [page, setPage] = useState(1);
    const [topNodes, setTopNodes] = useState(initTopNodes);
    const [recentNodes, setRecentNodes] = useState(initRecentNodes);

    const router = useRouter();

    useEffect(() => {
        queryCall("featuredNodes", NODE_PREVIEW_GQL, {
            allowHidden: unsafeMode,
        }).then(setTopNodes);
    }, [unsafeMode]);

    useEffect(() => {
        // queryCall("recentlyUpdatedNodes", NODE_PREVIEW_GQL, {
        //     pageNum: page,
        //     allowHidden: unsafeMode,
        // }).then(setRecentNodes);
    }, [unsafeMode, page]);

    const goToRandomNode = () => {
        queryCall("randomNode", { ID: 0 }, { allowHidden: unsafeMode }).then(
            (randomNode) => router.push(`/node/${randomNode.ID}`)
        );
    };

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
            <NodeViewer nodes={topNodes} />

            <hr />

            {/* <h3>Recently added or updated:</h3>
            <NodeViewer nodes={recentNodes} />

            <hr />

            <CrowdventureButton
                // This button needs to be formatted off to the side
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Next &gt;
            </CrowdventureButton> */}

            <CrowdventureButton
                onClick={() => {
                    goToRandomNode();
                }}
            >
                Play a random adventure!
            </CrowdventureButton>
        </>
    );
};

export const getStaticProps = async () => {
    const unsafeMode = false;
    const page = 1;

    return {
        props: {
            topNodes: await queryCall("featuredNodes", NODE_PREVIEW_GQL, {
                allowHidden: unsafeMode,
            }),
            // recentNodes: await queryCall(
            //     "recentlyUpdatedNodes",
            //     NODE_PREVIEW_GQL,
            //     {
            //         pageNum: page,
            //         allowHidden: unsafeMode,
            //     }
            // ),
            recentNodes: [],
        },
    };
};

export default HomePage;
