import React, { useState, useEffect } from "react";

import {
  Container,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Cookies from "universal-cookie";

import PictureModal from "../Modals/PictureModal";
import EditNodeModal from "../Modals/EditNodeModal";
import SuggestChoiceModal from "../Modals/SuggestChoiceModal";

import ChoiceColumns from "./ChoiceColumns";

import { escape, palette, query_call, mutation_call } from "../index";

const Node = (props) => {
  const { history, match, loggedInAs } = props;
  const [showingModal, showModal] = useState(undefined);
  const [node, setNode] = useState(undefined);
  const BLURAMOUNT = 40;

  const reportNode = () => {
    mutation_call(
      "createFeedback",
      {
        ...(loggedInAs ? { accountScreenName: loggedInAs.screenName } : {}),
        info: "This is inappropriate",
        reportingObjectType: "Node",
        reportingObjectID: node.ID,
      },
      { info: 0, reporting: 0 },
      () => {
        alert("Successfully reported page!");
        window.location.reload(false);
      }
    );
  };

  useEffect(() => {
    const pageID = escape(match.params.id);

    if (!node || pageID !== node.ID) {
      query_call(
        "getNode",
        { ID: pageID },
        {
          hidden: 0,
          pictureURL: 0,
          pictureUnsafe: 0,
          fgColor: 0,
          bgColor: 0,
          ID: 0,
          title: 0,
          content: 0,
          views: 0,
          owner: { screenName: 0, profilePicURL: 0, hidden: 0 },
          canonChoices: {
            ID: 0,
          },
          nonCanonChoices: {
            ID: 0,
          },
        },
        (returnNode) => {
          if (returnNode) setNode(returnNode);
          else setNode(null);
        }
      );
    }
  });

  if (node === undefined) {
    return (
      <Alert
        variant={
          (loggedInAs && loggedInAs.unsafeMode) ||
          new Cookies().get("unsafeMode") === "true"
            ? "dark"
            : "light"
        }
      >
        <title>Loading Page...</title>
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );
  }

  if (node === null)
    return (
      <Alert variant="danger">
        <title>Error! Node: {match.params.id}</title>
        <Alert.Heading>Oh snap! You ran into an error</Alert.Heading>
        <p>
          This page does not exist, or maybe our database is down. Who knows?
          Not you. Hahahaha
        </p>
      </Alert>
    );

  if (
    node.hidden &&
    (!loggedInAs ||
      (node.owner.screenName !== loggedInAs.screenName &&
        !loggedInAs.unsafeMode))
  )
    return (
      <Alert variant="danger">
        <title>Crowdventure! - {node.title}</title>
        <Alert.Heading>Unsafe!</Alert.Heading>
        <p>
          This page has been hidden from general users, because the content has
          been deemed unsafe. If you would like to see it, log in and turn on{" "}
          <b>Unsafe mode</b>!
        </p>
      </Alert>
    );

  if (
    node.owner.hidden &&
    (!loggedInAs ||
      (node.owner.screenName !== loggedInAs.screenName &&
        !loggedInAs.unsafeMode))
  )
    return (
      <Alert variant="danger">
        <title>Crowdventure! - {node.title}</title>
        <Alert.Heading>Unsafe!</Alert.Heading>
        <p>
          This page has been hidden from general users, because the author has
          been flagged as unsafe for the general public. If you would like to
          see it, log in and turn on <b>Unsafe mode</b>!
        </p>
      </Alert>
    );

  return (
    <Container>
      <title>Crowdventure! - {node.title}</title>

      {(node.hidden || node.owner.hidden) &&
      loggedInAs &&
      node.owner.screenName === loggedInAs.screenName &&
      !loggedInAs.unsafeMode ? (
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            setNode({ ...node, hidden: false });
          }}
        >
          <Alert.Heading>Unsafe!</Alert.Heading>
          <p>
            This page has been hidden from general users, because the content
            has been deemed unsafe. Users in unsafe mode can see this page and
            its content. Since you own this page, you can see it. If you believe
            this page should be considered safe, click <a href="">Here</a>.
          </p>
        </Alert>
      ) : (
        ""
      )}

      <h1 class="display-4 text-center">{node.title}</h1>
      {node.pictureURL ? (
        <img
          src={node.pictureURL}
          onLoad={(e) => {
            e.target.style.display = "block";
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1px",
            border: "1px solid #eee",
            "border-radius": "8px",
            width: "90%",
            maxHeight: "30vh",
            "object-fit": "cover",
            cursor: "pointer",
            ...(node.pictureUnsafe
              ? {
                  "-webkit-filter": "blur(" + BLURAMOUNT + "px)",
                  filter: "blur(" + BLURAMOUNT + "px)",
                }
              : {}),
          }}
          onClick={() =>
            showModal(
              <PictureModal
                loggedInAs={loggedInAs}
                pictureURL={node.pictureURL}
                title={node.title}
                close={() => showModal(undefined)}
              />
            )
          }
        />
      ) : (
        ""
      )}
      <br />
      <Container>
        {node.content.split("\n").map((line) => (
          <p style={{ textIndent: "5%" }}>{line}</p>
        ))}
      </Container>
      <Container
        className="row"
        style={{ paddingRight: "0px", paddingBottom: "5px" }}
      >
        <div class="col">
          <h3 class="text-muted">Choices:</h3>
        </div>
        <div class="col" style={{ paddingRight: "0px" }}>
          <Button
            onClick={() => {
              history.back();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            size="lg"
            className="float-right"
            style={{
              border: `1px solid ${palette[2]}`,
              backgroundColor: palette[0],
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
          >
            Go back!
          </Button>
        </div>
      </Container>
      {node.canonChoices.length ? (
        <ChoiceColumns node={node} loggedInAs={loggedInAs} canon={true} />
      ) : (
        <p className="text-muted">
          By decree of <strong>{node.owner.screenName}</strong>, this journey
          ends here.
        </p>
      )}

      <p />

      <Container className="row" style={{ paddingRight: "0px" }}>
        <div class="col align-bottom">
          <h3 class="align-bottom text-muted">Other options:</h3>
        </div>
        <div class="col text-right" style={{ paddingRight: "0px" }}>
          <small class="text-muted">
            Author:{" "}
            <a
              href={`/account/${node.owner.screenName}`}
              style={{
                color:
                  loggedInAs && loggedInAs.unsafeMode ? palette[0] : palette[2],
              }}
            >
              <img
                src={
                  node.owner.profilePicURL
                    ? node.owner.profilePicURL
                    : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
                }
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
              {node.owner.screenName}{" "}
            </a>{" "}
            <br />
            Views: {node.views}
          </small>
          {loggedInAs &&
          (node.owner.screenName === loggedInAs.screenName ||
            loggedInAs.isAdmin) ? (
            <p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  showModal(
                    <EditNodeModal
                      close={() => showModal(undefined)}
                      node={node}
                      loggedInAs={loggedInAs}
                    />
                  );
                }}
              >
                Edit Page
              </Button>
            </p>
          ) : (
            ""
          )}
        </div>
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
                <SuggestChoiceModal
                  loggedInAs={loggedInAs}
                  fromNode={node}
                  close={() => showModal(undefined)}
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
            Suggest New Choice
          </Button>
        </span>
      </OverlayTrigger>
      <p />

      {node.nonCanonChoices.length ? (
        <ChoiceColumns node={node} loggedInAs={loggedInAs} canon={false} />
      ) : (
        <p className="text-muted">
          There are currently no options! You can help expand the story by
          adding to it!
        </p>
      )}

      <Container>
        <Button
          style={{ marginRight: "0", marginLeft: "auto", display: "block" }}
          variant="danger"
          size="sm"
          onClick={reportNode}
        >
          Report Page
        </Button>
      </Container>

      {showingModal ? showingModal : ""}
    </Container>
  );
};

export default Node;
