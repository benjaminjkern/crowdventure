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

import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

import { app_fetch, escape } from "./index";

const Home = () => {
  const [topNodes, setTopNodes] = useState(undefined);
  const [topAccounts, setTopAccounts] = useState(undefined);
  const [allNodes, setAllNodes] = useState(undefined);
  const [searchNodes, setSearchNodes] = useState("");
  const [searchNodesList, setSearchNodesList] = useState(undefined);
  const [account, setAccount] = useState(false);

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [info, setInfo] = useState("");

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

    // app_fetch({
    //   query: `query{allNodes{ID,title,owner{screenName},views}}`,
    // }).then((res, err) => {
    //   if (err) alert(err);
    //   if (res.data && res.data.allNodes) setAllNodes(res.data.allNodes);
    //   else alert("Something went wrong when retrieving nodes");
    // });

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

    // app_fetch({
    //   query: `query{allAccounts{screenName,totalNodeViews,totalSuggestionScore}}`,
    // }).then((res, err) => {
    //   if (err) alert(err);
    //   if (res.data && res.data.allAccounts)
    //     setTopAccounts(res.data.allAccounts);
    //   else alert("Something went wrong when retrieving accounts");
    // });
  }, []);

  const createNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content);
    app_fetch({
      query: `mutation{createNode(accountScreenName:"${account.screenName}",title:"${esTitle}",content:"${esContent}",featured:true){ID}}`,
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
      <h1>Welcome!</h1>
      <Container>
        Crowdventure is a Crowd-Sourced
        Choose-and-Create-Your-Own-Adventure-Game!
      </Container>
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
                      padding: "0px",
                    }}
                  >
                    <Card.Img
                      src={node.pictureURL}
                      style={{
                        "max-height": "56.25vw",
                        "object-fit": "cover",
                      }}
                    />
                  </Card.Header>
                ) : (
                  ""
                )}
                <Card.Body>
                  <Card.Title>{node.title}</Card.Title>
                </Card.Body>
              </a>
              <Card.Footer>
                <small className="text-muted">
                  Created by:{" "}
                  <a href={`/crowdventure/#/account/${node.owner.screenName}`}>
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
                    {node.owner.screenName}
                  </a>
                  <br />
                  Story Size: {node.size}
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
            onClick={() => setShowCreateNode(true)}
            disabled={!account}
            style={{
              width: "100%",
              pointerEvents: account ? "auto" : "none",
            }}
          >
            Create New!
          </Button>
        </span>
      </OverlayTrigger>
      {/* <h3>Featured Accounts:</h3>
      {topAccounts ? (
        <CardColumns>
          {topAccounts.map((account) => (
            <Card>
              <a href={`/crowdventure/#/account/${account.screenName}`}>
                <Card.Body>
                  <Card.Title>{account.screenName}</Card.Title>
                </Card.Body>
              </a>
              <Card.Footer>
                Total Views:{account.totalNodeViews}
                <br />
                Total Score:{account.totalSuggestionScore}
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ) : (
        ""
      )} */}
      <Modal show={showCreateNode} onHide={() => setShowCreateNode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Creating New Page</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={createNode}>Create Page!</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {redirect ? redirect : ""}
    </Container>
  );
};

export default Home;
