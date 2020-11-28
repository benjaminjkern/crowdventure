import { useState } from "react";

import { mutation_call } from "./index";

import {
  CardColumns,
  Card,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";

import ConfirmModal from "./Modals/ConfirmModal";

const NodeViewer = (props) => {
  const { nodes, loggedInAs } = props;

  const [showingModal, showModal] = useState(undefined);

  const reportNode = (nodeID) => {
    mutation_call(
      "createFeedback",
      {
        ...(loggedInAs ? { accountScreenName: loggedInAs.screenName } : {}),
        info: "This is inappropriate",
        reportingObjectType: "Node",
        reportingObjectID: nodeID,
      },
      { info: 0, reporting: 0 },
      () => {
        alert("Successfully reported page!");
        window.location.reload(false);
      }
    );
  };

  const featurePage = (node, alreadyFeatured) => {
    mutation_call(
      "editNode",
      { nodeID: node.ID, featured: !alreadyFeatured },
      { title: 0 },
      () => window.location.reload(false)
    );
  };

  const deletePage = (node) => {
    mutation_call("deleteNode", { nodeID: node.ID }, 0, () => {
      window.location.reload(false);
    });
  };

  return nodes ? (
    <CardColumns>
      {nodes
        .filter(
          (node) =>
            (loggedInAs &&
              (loggedInAs.unsafeMode ||
                loggedInAs.screenName === node.owner.screenName)) ||
            !node.hidden
        )
        .map((node) => {
          return (
            <Card>
              <a href={`/crowdventure/#/node/${node.ID}`}>
                {node.pictureURL ? (
                  <Card.Header
                    style={{
                      "background-color": "white",
                      padding: "1px",
                    }}
                  >
                    <Card.Img
                      src={node.pictureURL}
                      style={{
                        "max-height": "30vh",
                        "object-fit": "cover",
                      }}
                      onError={(e) => {
                        e.target.parentNode.style.display = "none";
                      }}
                    />
                  </Card.Header>
                ) : (
                  ""
                )}
                <Card.Body
                  className="text-center"
                  style={{ paddingTop: "2em" }}
                >
                  <Card.Title>{node.title}</Card.Title>
                </Card.Body>
              </a>

              {node.featured ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      This page has been starred by {node.owner.screenName}!
                    </Tooltip>
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "5px",
                      color: "yellow",
                      "-webkit-touch-callout": "none",
                      "-webkit-user-select": "none",
                      "-khtml-user-select": "none",
                      "-moz-user-select": "none",
                      "-ms-user-select": "none",
                      "user-select": "none",
                      "text-shadow": "0 0 1px black",
                    }}
                    class="fa"
                  >
                    &#xf005;
                  </div>
                </OverlayTrigger>
              ) : (
                ""
              )}

              {node.hidden ? (
                <OverlayTrigger
                  overlay={<Tooltip>This page is hidden!</Tooltip>}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: (node.featured ? "2" : "") + "5px",
                      left: "6.5px",
                      color: "red",
                      "-webkit-touch-callout": "none",
                      "-webkit-user-select": "none",
                      "-khtml-user-select": "none",
                      "-moz-user-select": "none",
                      "-ms-user-select": "none",
                      "user-select": "none",
                      "text-shadow": "0 0 1px black",
                    }}
                    class="fa"
                  >
                    &#xf056;
                  </div>
                </OverlayTrigger>
              ) : (
                ""
              )}

              <DropdownButton
                variant="light"
                style={{ position: "absolute", top: "0px", right: "0px" }}
                size="sm"
                drop="right"
                title={<span class="fa">&#xf013;</span>}
              >
                {loggedInAs ? (
                  <>
                    <Dropdown.Item
                      onClick={() => featurePage(node, node.featured)}
                      disabled={loggedInAs.screenName !== node.owner.screenName}
                    >
                      {node.featured ? "Un-f" : "F"}eature page
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        showModal(
                          <ConfirmModal
                            close={() => showModal(undefined)}
                            onConfirm={() => deletePage(node)}
                            title="Delete Page"
                            content="This will erase all suggested choices of this page, and their associated scores. This will NOT delete sub-pages of this page. Are you sure you wish to continue?"
                          />
                        )
                      }
                      disabled={loggedInAs.screenName !== node.owner.screenName}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item disabled>Make Private</Dropdown.Item>
                    <Dropdown.Divider />
                  </>
                ) : (
                  ""
                )}
                <Dropdown.Item onClick={() => reportNode(node.ID)}>
                  Report
                </Dropdown.Item>
              </DropdownButton>
              <Card.Footer className="text-muted text-center">
                <small>
                  Author:{" "}
                  <a href={`/crowdventure/#/account/${node.owner.screenName}`}>
                    <img
                      src={
                        node.owner.profilePicURL
                          ? node.owner.profilePicURL
                          : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
                      }
                      alt={node.owner.screenName + " Profile Pic"}
                      onError={(e) => {
                        e.target.src =
                          process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
                      }}
                      style={{
                        border: "1px solid #bbb",
                        height: "2em",
                        width: "2em",
                        "object-fit": "cover",
                        "border-radius": "50%",
                      }}
                    />{" "}
                    {node.owner.screenName}
                  </a>
                  <br />
                  Views:{" " + node.views}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      {showingModal || ""}
    </CardColumns>
  ) : (
    <Alert variant="light">
      <Alert.Heading>Loading...</Alert.Heading>
    </Alert>
  );
};

export default NodeViewer;
