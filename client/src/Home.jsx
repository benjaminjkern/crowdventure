import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardColumns,
  Form,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  Alert,
} from "react-bootstrap";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import "react-aspect-ratio/aspect-ratio.css";

import { app_fetch, escape, palette, SearchImage } from "./index";

const Home = () => {
  const [topNodes, setTopNodes] = useState(undefined);
  const [account, setAccount] = useState(false);

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [info, setInfo] = useState("");

  const [showChangePic, setShowChangePic] = useState(false);

  const [redirect, setRedirect] = useState(undefined);

  useEffect(() => {
    app_fetch({
      query: `query{featuredNodes{ID,title,owner{screenName,profilePicURL},views,size,pictureURL}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.featuredNodes)
        setTopNodes(res.data.featuredNodes);
      else alert("Something went wrong when retrieving featured nodes");
    });

    const cookies = new Cookies();
    const loggedInAs = escape(cookies.get("account"));

    app_fetch({
      query: `mutation{loginAccount(screenName:"${loggedInAs}"){screenName}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setAccount(res.data.loginAccount);
      else {
        alert("Something went wrong when retrieving account, logging out");
        cookies.set("account", "", { path: "/" });
      }
    });
  }, []);

  const createNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content);
    const esPicture = escape(picture);
    app_fetch({
      query: `mutation{createNode(accountScreenName:"${account.screenName}",title:"${esTitle}",content:"${esContent}",featured:true,pictureURL:"${esPicture}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.createNode) {
        setShowCreateNode(false);
        setRedirect(<Redirect to={`/node/${res.data.createNode.ID}`} />);
      } else alert("Something went wrong when creating node");
    });
  };

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
          !account ? (
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
              setShowCreateNode(true);
              setTitle("");
              setContent("");
              setPicture("");
              setInfo("");
            }}
            disabled={!account}
            style={{
              width: "100%",
              pointerEvents: account ? "auto" : "none",
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
      {topNodes ? (
        <CardColumns>
          {topNodes.map((node) => (
            <Card className="text-center">
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
                <Card.Body style={{ paddingTop: "2em" }}>
                  <Card.Title>{node.title}</Card.Title>
                </Card.Body>
              </a>
              <Card.Footer>
                <small className="text-muted">
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
                  Views: {node.views}
                </small>
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ) : (
        <Alert variant="light">
          <Alert.Heading>Loading...</Alert.Heading>
        </Alert>
      )}
      <Modal show={showCreateNode} onHide={() => setShowCreateNode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Creating New Page</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {picture ? (
              <>
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={picture}
                    onError={(e) => {
                      setInfo(
                        <span style={{ color: "red" }}>Picture not found!</span>
                      );
                      setPicture("");
                    }}
                    alt="This shouldn't have happened"
                    style={{
                      padding: "1px",
                      width: "100%",
                      "object-fit": "contain",
                      borderRadius: "8px",
                    }}
                  />
                  <span
                    class="fa fa-times"
                    style={{
                      position: "absolute",
                      top: "1.5em",
                      right: "1.5em",
                      color: "#888",
                      cursor: "pointer",
                      textShadow:
                        "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#555")}
                    onMouseLeave={(e) => (e.target.style.color = "#888")}
                    onClick={() => {
                      setPicture("");
                    }}
                  />
                </div>

                <br />
              </>
            ) : (
              ""
            )}

            <div class="row no-gutters">
              <div class="col">Picture:</div>
              <div class="col small text-muted text-center">
                {!picture ? "(Don't use any picture)" : "(Use new picture)"}
              </div>
              <div class="col text-right">
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setShowChangePic(true)}
                >
                  {picture ? "Change" : "Select"} Picture
                </Button>
              </div>
            </div>
            {showChangePic ? (
              <SearchImage
                callback={(url) => {
                  setPicture(url);
                  setShowChangePic(false);
                }}
              />
            ) : (
              ""
            )}
            <Form.Label>Title:</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                title
                  ? content
                    ? createNode()
                    : setInfo(
                        <span style={{ color: "red" }}>
                          Content cannot be empty!
                        </span>
                      )
                  : setInfo(
                      <span style={{ color: "red" }}>
                        Title cannot be empty!
                      </span>
                    )
              }
            >
              Create Page!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {redirect ? redirect : ""}
    </Container>
  );
};

export default Home;
