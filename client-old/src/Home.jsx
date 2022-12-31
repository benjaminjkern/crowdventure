import React, { useState, useEffect } from "react";
import { Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import NodeViewer from "./NodeViewer";
import Cookies from "universal-cookie";

import { query_call, palette } from "./index";
import { Redirect } from "react-router-dom";
import CreateNodeModal from "./Modals/CreateNodeModal";

let lastUnsafe = undefined;
let page = 0;

const Home = (props) => {
    const { loggedInAs } = props;

    const [topNodes, setTopNodes] = useState(undefined);
    const [recentNodes, setRecentNodes] = useState(undefined);
    const [showingModal, showModal] = useState(undefined);
    const [redirect, setRedirect] = useState(undefined);

    const getRecentNodes = () => {
        query_call(
            "recentlyUpdatedNodes",
            {
                pageNum: page,
                allowHidden:
                    (loggedInAs && loggedInAs.unsafeMode) ||
                    new Cookies().get("unsafeMode") === "true" ||
                    false,
            },
            {
                hidden: 0,
                ID: 0,
                title: 0,
                owner: { screenName: 0, profilePicURL: 0 },
                views: 0,
                size: 0,
                pictureURL: 0,
                pictureUnsafe: 0,
            },
            (res) => setRecentNodes(res)
        );
    };

    useEffect(() => {
        const unsafe =
            (loggedInAs && loggedInAs.unsafeMode) ||
            new Cookies().get("unsafeMode") === "true" ||
            false;
        if (!topNodes) {
            query_call(
                "featuredNodes",
                {
                    allowHidden:
                        (loggedInAs && loggedInAs.unsafeMode) ||
                        new Cookies().get("unsafeMode") === "true" ||
                        false,
                },
                {
                    hidden: 0,
                    ID: 0,
                    title: 0,
                    owner: { screenName: 0, profilePicURL: 0 },
                    views: 0,
                    size: 0,
                    pictureURL: 0,
                    pictureUnsafe: 0,
                },
                (res) => setTopNodes(res)
            );
        }
        if (!recentNodes) {
            getRecentNodes();
        }
        if (lastUnsafe !== unsafe) {
            if (lastUnsafe !== undefined) {
                setTopNodes(undefined);
                setRecentNodes(undefined);
            }
            lastUnsafe = unsafe;
        }
    });

    return (
        <Container>
            <title>Crowdventure!</title>

            <OverlayTrigger
                overlay={
                    !loggedInAs ? (
                        <Tooltip id="tooltip-disabled">
                            You must be signed in!
                        </Tooltip>
                    ) : (
                        <p />
                    )
                }
                style={{ width: "100%" }}
            >
                <span className="d-inline-block" style={{ width: "100%" }}>
                    <Button
                        onClick={() => {
                            showModal(
                                <CreateNodeModal
                                    featured={true}
                                    loggedInAs={loggedInAs}
                                    close={() => showModal(undefined)}
                                    callback={(res) =>
                                        setRedirect(
                                            <Redirect to={`/node/${res.ID}`} />
                                        )
                                    }
                                />
                            );
                        }}
                        disabled={!loggedInAs}
                        style={{
                            width: "100%",
                            pointerEvents: loggedInAs ? "auto" : "none",
                            border: `1px solid ${palette[2]}`,
                            backgroundColor: palette[0],
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = palette[2])
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = palette[0])
                        }
                    >
                        Create a New Adventure!
                    </Button>
                </span>
            </OverlayTrigger>
            <p />

            <hr
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: "rgb(225, 240, 255)" } }
                    : {})}
            />
            <h3>Featured Stories:</h3>
            <NodeViewer nodes={topNodes} loggedInAs={loggedInAs} />
            <hr
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: "rgb(225, 240, 255)" } }
                    : {})}
            />

            <h3>Recently added or updated:</h3>
            <NodeViewer nodes={recentNodes} loggedInAs={loggedInAs} />
            <div style={{ marginBottom: "3.5em" }}>
                <Button
                    className="float-right"
                    onClick={() => {
                        page++;
                        getRecentNodes();
                    }}
                    style={{
                        border: `1px solid ${palette[2]}`,
                        backgroundColor: palette[0],
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette[2])
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = palette[0])
                    }
                >
                    Next &gt;
                </Button>
            </div>
            <hr
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: "rgb(225, 240, 255)" } }
                    : {})}
            />
            <span className="d-inline-block" style={{ width: "100%" }}>
                <Button
                    onClick={() => {
                        query_call(
                            "randomNode",
                            {
                                allowHidden:
                                    loggedInAs && loggedInAs.unsafeMode,
                            },
                            {
                                ID: 0,
                            },
                            (res) => {
                                setRedirect(
                                    <Redirect to={`/node/${res.ID}`} />
                                );
                            }
                        );
                    }}
                    style={{
                        width: "100%",
                        pointerEvents: loggedInAs ? "auto" : "none",
                        border: `1px solid ${palette[2]}`,
                        backgroundColor: palette[0],
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette[2])
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = palette[0])
                    }
                >
                    Play a random adventure!
                </Button>
            </span>
            {showingModal || ""}
            {redirect || ""}
        </Container>
    );
};

export default Home;
