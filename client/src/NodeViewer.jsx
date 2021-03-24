import React, { useState, createRef } from "react";

import { mutation_call, palette } from "./index";

import {
  CardColumns,
  Card,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown,
  Alert,
  Container,
} from "react-bootstrap";

import Cookies from "universal-cookie";
import ConfirmModal from "./Modals/ConfirmModal";

const NodeViewer = (props) => {
  const { nodes, loggedInAs } = props;

  const [showingModal, showModal] = useState(undefined);
  const refs = [];
  const BLURAMOUNT = 20;

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

  const hidePage = (node) => {
    mutation_call(
      "editNode",
      { nodeID: node.ID, hidden: !node.hidden },
      { title: 0 },
      () => window.location.reload(false)
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
    <CardColumns style={{ marginTop: "5px", marginBottom: "5px" }}>
      <Container />
      {nodes
        .filter(
          (node) =>
            (loggedInAs &&
              (loggedInAs.unsafeMode ||
                loggedInAs.screenName === node.owner.screenName)) ||
            !node.hidden
        )
        .map((node, i) => {
          refs.push(createRef());
          return (
            <Card
              className="mt-2"
              style={{
                boxShadow: `0 0 3px ${palette[0]}`,
                overflow: "hidden",
                ...(loggedInAs && loggedInAs.unsafeMode
                  ? { backgroundColor: palette[4] }
                  : {}),
              }}
              ref={refs[i]}
            >
              <a
                href={`/#/node/${node.ID}`}
                style={{
                  color:
                    loggedInAs && loggedInAs.unsafeMode
                      ? palette[0]
                      : palette[2],
                }}
                onMouseEnter={(e) => {
                  refs[i].current.style.boxShadow = `0 0 6px ${palette[2]}`;
                }}
                onMouseLeave={(e) => {
                  refs[i].current.style.boxShadow = `0 0 3px ${palette[0]}`;
                }}
              >
                {node.pictureURL ? (
                  <Card.Header
                    style={{
                      backgroundColor:
                        loggedInAs && loggedInAs.unsafeMode
                          ? palette[5]
                          : "white",
                      padding: "1px",
                    }}
                  >
                    <Card.Img
                      src={node.pictureURL}
                      style={{
                        "max-height": "30vh",
                        "object-fit": "cover",
                        ...(node.pictureUnsafe
                          ? {
                              "-webkit-filter": "blur(" + BLURAMOUNT + "px)",
                              filter: "blur(" + BLURAMOUNT + "px)",
                            }
                          : {}),
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

              {node.featured && node && node.owner ? (
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
                  overlay={
                    <Tooltip>
                      This page is hidden, because it has been marked as unsafe!
                      You can see it because you are{" "}
                      {loggedInAs && loggedInAs.unsafeMode
                        ? "in Unsafe Mode."
                        : "the owner."}
                    </Tooltip>
                  }
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
                variant={
                  loggedInAs && loggedInAs.unsafeMode ? "secondary" : "light"
                }
                style={{ position: "absolute", top: "0px", right: "0px" }}
                size="sm"
                drop="right"
                title={<span class="fa">&#xf013;</span>}
              >
                {loggedInAs && node.featured !== undefined ? (
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
                            loggedInAs={loggedInAs}
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
                {loggedInAs && loggedInAs.isAdmin ? (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => hidePage(node)}>
                      {node.hidden ? "Un-h" : "H"}ide page
                    </Dropdown.Item>
                  </>
                ) : (
                  ""
                )}
              </DropdownButton>
              <Card.Footer
                className="text-muted text-center"
                {...(loggedInAs && loggedInAs.unsafeMode
                  ? { style: { backgroundColor: palette[5] } }
                  : {})}
              >
                <small>
                  Author:{" "}
                  <a
                    href={`/#/account/${node.owner.screenName}`}
                    style={{
                      color:
                        loggedInAs && loggedInAs.unsafeMode
                          ? palette[0]
                          : palette[2],
                    }}
                  >
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
    <Alert
      variant={
        (loggedInAs && loggedInAs.unsafeMode) ||
        new Cookies().get("unsafeMode") === "true"
          ? "dark"
          : "light"
      }
    >
      <Alert.Heading>Loading...</Alert.Heading>
    </Alert>
  );
};

export default NodeViewer;
