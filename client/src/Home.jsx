import React, { useState, useEffect } from "react";
import { Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import NodeViewer from "./NodeViewer";

import { query_call, palette } from "./index";
import { Redirect } from "react-router-dom";
import CreateNodeModal from "./Modals/CreateNodeModal";

const Home = (props) => {
  const { loggedInAs } = props;

  const [topNodes, setTopNodes] = useState(undefined);
  const [showingModal, showModal] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);

  useEffect(() => {
    query_call(
      "featuredNodes",
      {},
      {
        hidden: 0,
        ID: 0,
        title: 0,
        owner: { screenName: 0, profilePicURL: 0 },
        views: 0,
        size: 0,
        pictureURL: 0,
      },
      (res) => setTopNodes(res)
    );
  }, []);

  return (
    <Container>
      <title>Crowdventure!</title>
      <h1 className="display-4 text-center">Welcome!</h1>
      <Container className="text-center">
        Crowdventure is a Crowd-Sourced
        Choose-and-Create-Your-Own-Adventure-Game!
      </Container>
      <p />

      <OverlayTrigger
        overlay={
          !loggedInAs ? (
            <Tooltip id="tooltip-disabled">You must be signed in!</Tooltip>
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
                    setRedirect(<Redirect to={`/node/${res.ID}`} />)
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
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
          >
            Create a New Adventure!
          </Button>
        </span>
      </OverlayTrigger>
      <p />

      <h3>Featured Pages:</h3>
      <NodeViewer nodes={topNodes} loggedInAs={loggedInAs} />
      {showingModal || ""}
      {redirect || ""}
    </Container>
  );
};

export default Home;
