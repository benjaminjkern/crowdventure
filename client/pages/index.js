import React, { useEffect, useState } from "react";
import CrowdventureButton from "../lib/components/CrowdventureButton";
import NodeViewer from "../lib/nodes/NodeViewer";

const Home = () => {
    const [topNodes, setTopNodes] = useState(undefined);
    const [recentNodes, setRecentNodes] = useState(undefined);
    const [page, setPage] = useState(1);

    const getRecentNodes = () => {
        // query_call(
        //     "recentlyUpdatedNodes",
        //     {
        //         pageNum: page,
        //         allowHidden:
        //             (loggedInAs && loggedInAs.unsafeMode) ||
        //             new Cookies().get("unsafeMode") === "true" ||
        //             false,
        //     },
        //     {
        //         hidden: 0,
        //         ID: 0,
        //         title: 0,
        //         owner: { screenName: 0, profilePicURL: 0 },
        //         views: 0,
        //         size: 0,
        //         pictureURL: 0,
        //         pictureUnsafe: 0,
        //     },
        //     (res) => setRecentNodes(res)
        // );
    };

    useEffect(() => {
        // Refresh on switch unsafe mode
    }, []);

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
                    setPage(page + 1);
                    getRecentNodes();
                }}
            >
                Next &gt;
            </CrowdventureButton>

            <CrowdventureButton
                onClick={() => {
                    // query_call(
                    //     "randomNode",
                    //     {
                    //         allowHidden:
                    //             loggedInAs && loggedInAs.unsafeMode,
                    //     },
                    //     {
                    //         ID: 0,
                    //     },
                    //     (res) => {
                    //         setRedirect(
                    //             <Redirect to={`/node/${res.ID}`} />
                    //         );
                    //     }
                    // );
                }}
            >
                Play a random adventure!
            </CrowdventureButton>
        </>
    );
};

// if (!topNodes) {
//     query_call(
//         "featuredNodes",
//         {
//             allowHidden:
//                 (loggedInAs && loggedInAs.unsafeMode) ||
//                 new Cookies().get("unsafeMode") === "true" ||
//                 false,
//         },
//         {
//             hidden: 0,
//             ID: 0,
//             title: 0,
//             owner: { screenName: 0, profilePicURL: 0 },
//             views: 0,
//             size: 0,
//             pictureURL: 0,
//             pictureUnsafe: 0,
//         },
//         (res) => setTopNodes(res)
//     );
// }
// export const getStaticProps = async () => {
//     return {};
// };

export default Home;
