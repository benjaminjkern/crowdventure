import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import {
  Navbar,
  Container,
  Button,
  Modal,
  Form,
  Alert,
  CardGroup,
  Card,
  CardColumns,
} from "react-bootstrap";

import app_fetch from "./index";

const Account = (props) => {
  const [account, setAccount] = useState(undefined);
  const [loggedInAs, setLoggedInAs] = useState(new Cookies().get("account"));

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [info, setInfo] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [showProfilePic, setShowProfilePic] = useState(false);

  useEffect(() => {
    app_fetch({
      query: `query{getAccount(screenName:"${props.match.params.id}"){bio,screenName,nodes{title,views},suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{ID,title,views}}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setAccount(res.data.getAccount);
      else alert("Something went wrong when retrieving account");
    });
  }, []);

  const createNode = () => {
    if (title.includes('"'))
      setInfo(
        <p style={{ color: "red" }}>
          The title cannot contain (") character! Try using (') or (`) instead!
        </p>
      );
    else if (content.includes('"'))
      setInfo(
        <p style={{ color: "red" }}>
          The content cannot contain (") character! Try using (') or (`)
          instead!
        </p>
      );
    else
      app_fetch({
        query: `mutation{createNode(accountScreenName:"${account.screenName}",title:"${title}",content:"${content}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.createNode) setShowCreateNode(false);
        else alert("Something went wrong when creating node");
      });
  };

  const deleteAccount = () => {
    new Cookies().set("account", "", { path: "/" });
    app_fetch({
      query: `mutation{deleteAccount(screenName:"${props.match.params.id}")}`,
    });
  };

  if (account === undefined) {
    return (
      <Alert variant="light">
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );
  }

  if (account === null)
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You ran into an error</Alert.Heading>
        <p>
          This page does not exist, or maybe our database is down. Who knows?
          Not you. Hahahaha
        </p>
      </Alert>
    );

  return (
    <Container>
      <h1 style={{ position: "relative", left: "5px" }}>
        {account.screenName}
      </h1>
      {account.bio ? <p>Bio</p> : ""}
      <h3>Pages:</h3>
      <CardColumns>
        {account.nodes.map((node) => (
          <Card>
            <a href={`/crowdventure/node/${node.ID}`}>
              <Card.Body>
                <Card.Title>{node.title}</Card.Title>
              </Card.Body>
            </a>
            <Card.Footer>
              Created by: {account.screenName}
              <br />
              Views:{" " + node.views}
            </Card.Footer>
          </Card>
        ))}
      </CardColumns>
      <p />
      {loggedInAs === account.screenName ? (
        <Container>
          <Button onClick={() => setShowCreateNode(true)}>
            Create new Page
          </Button>{" "}
          <Button
            href="/crowdventure/"
            variant="danger"
            onClick={() => {
              new Cookies().set("account", "", { path: "/" });
            }}
          >
            Log out
          </Button>{" "}
          <Button variant="danger" onClick={() => setShowConfirm(true)}>
            Delete
          </Button>
          <Modal show={showCreateNode} onHide={() => setShowCreateNode(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Creating New Page</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createNode}>
              <Modal.Body>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
                <Form.Label>Content:</Form.Label>
                <Form.Control
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></Form.Control>
                {info ? info : ""}
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Create Page!</Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => setShowConfirm(false)}>
                No!
              </Button>
              <Button
                variant="primary"
                onClick={deleteAccount}
                href="/crowdventure/"
              >
                Yes!
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Account;
