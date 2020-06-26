import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import {
  Container,
  Button,
  Modal,
  Form,
  Alert,
  Card,
  CardColumns,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import app_fetch from "./index";

const Account = (props) => {
  const accountID = props.match.params.id;
  const [redirect, setRedirect] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [loggedInAs, setLoggedInAs] = useState(undefined);

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [info, setInfo] = useState("");

  const [showEditPage, setShowEditPage] = useState(false);
  const [bio, setBio] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [showProfilePic, setShowProfilePic] = useState(false);

  useEffect(() => {
    app_fetch({
      query: `query{getAccount(screenName:"${accountID}"){bio,screenName,nodes{title,views},suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{ID,title,views}}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setAccount(res.data.getAccount);
      else alert("Something went wrong when retrieving account");
    });

    const cookies = new Cookies();

    app_fetch({
      query: `mutation{loginAccount(screenName:"${cookies.get(
        "account"
      )}"){screenName}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setLoggedInAs(res.data.loginAccount);
      else {
        alert("Something went wrong when logging in account");
        cookies.set("account", "", { path: "/" });
      }
    });
  }, []);

  const editPage = () => {
    if (bio.includes('"'))
      setInfo(
        <p style={{ color: "red" }}>
          Your bio cannot contain (") character! Try using (') or (`) instead!
        </p>
      );
    else {
      app_fetch({
        query: `mutation{editAccount(screenName:"${account.screenName}",bio:"${bio}"){bio,screenName,nodes{title,views},suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{ID,title,views}}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.editAccount) {
          setAccount(res.data.editAccount);
          setShowEditPage(false);
          window.location.reload(false);
        } else alert("Something went wrong when editing account");
      });
    }
  };

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
        if (res.data && res.data.createNode) {
          setShowCreateNode(false);
          window.location.reload(false);
        } else alert("Something went wrong when creating node");
      });
  };

  const deleteAccount = () => {
    new Cookies().set("account", "", { path: "/" });
    app_fetch({
      query: `mutation{deleteAccount(screenName:"${accountID}")}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) {
        setRedirect(<Redirect to="/" />);
        window.location.reload(false);
      } else alert("Something went wrong when deleting account");
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
      <Container className="text-muted text-right">
        Total views: {account.totalNodeViews} Total score:{" "}
        {account.totalSuggestionScore}
      </Container>
      {account.bio ? <Container>{account.bio}</Container> : ""}
      <p />
      <h3>Featured Pages:</h3>
      <CardColumns>
        {account.nodes.map((node) => (
          <Card>
            <a href={`/crowdventure/#/node/${node.ID}`}>
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
      {loggedInAs && loggedInAs.screenName === account.screenName ? (
        <Container>
          <Button onClick={() => setShowCreateNode(true)}>
            Create new Page
          </Button>{" "}
          <Button
            variant="light"
            onClick={() => {
              setBio(account.bio);
              setShowEditPage(true);
            }}
          >
            Edit Account
          </Button>
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
          <Modal show={showEditPage} onHide={() => setShowEditPage(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editing Account</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <Form.Label>Bio:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></Form.Control>
                {info ? info : ""}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={editPage}>Edit Account</Button>
                <Button
                  href="/crowdventure"
                  onClick={() =>
                    new Cookies().set("account", "", { path: "/" })
                  }
                  variant="danger"
                >
                  Log out
                </Button>
                <Button onClick={() => setShowConfirm(true)} variant="danger">
                  Delete Account
                </Button>
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
              <Button variant="primary" onClick={deleteAccount}>
                Yes!
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        ""
      )}
      {redirect ? redirect : ""}
    </Container>
  );
};

export default Account;
