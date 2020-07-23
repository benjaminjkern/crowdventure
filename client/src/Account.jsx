import React, { useState, useEffect, useRef } from "react";

import Cookies from "universal-cookie";
import {
  Container,
  Button,
  Modal,
  Form,
  Alert,
  Card,
  CardColumns,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { app_fetch, escape, palette } from "./index";

const Account = (props) => {
  const accountID = escape(props.match.params.id);
  const loggedInAsID = escape(new Cookies().get("account"));
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
  const [picture, setPicture] = useState("");

  const [showPicture, setShowPicture] = useState(false);

  useEffect(() => {
    app_fetch({
      // TODO: EITHER IMPLEMENT SUGGESTED CHOICES OR GET RID OF IT
      query: `query{getAccount(screenName:"${accountID}"){bio,screenName,profilePicURL,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views,pictureURL}}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setAccount(res.data.getAccount);
      else alert("Something went wrong when retrieving account");
    });

    const cookies = new Cookies();

    app_fetch({
      query: `mutation{loginAccount(screenName:"${loggedInAsID}"){screenName}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setLoggedInAs(res.data.loginAccount);
      else {
        alert("Something went wrong when logging in account, logging out");
        cookies.set("account", "", { path: "/" });
      }
    });
  }, []);

  const editPage = () => {
    const esBio = escape(bio, true);
    const esPicture = escape(picture);
    app_fetch({
      query: `mutation{editAccount(screenName:"${account.screenName}",bio:"""${esBio}""",profilePicURL:"${esPicture}"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.editAccount) {
        setAccount(res.data.editAccount);
        setShowEditPage(false);
        window.location.reload(false);
      } else alert("Something went wrong when editing account");
    });
  };

  const createNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content);
    app_fetch({
      query: `mutation{createNode(accountScreenName:"${account.screenName}",title:"${esTitle}",content:"${esContent}",featured:true){ID}}`,
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

  const featurePage = (node, alreadyFeatured) => {
    alert(alreadyFeatured);
    app_fetch({
      query: `mutation{editNode(nodeID:"${
        node.ID
      }", featured:${!alreadyFeatured}){title}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) window.location.reload(false);
      else alert("Something went wrong when featuring page");
    });
  };

  if (account === undefined) {
    return (
      <Alert variant="light">
        <title>Loading Account...</title>
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
      <title>{account.screenName} on Crowdventure!</title>
      <h1>
        <img
          src={
            account.profilePicURL
              ? account.profilePicURL
              : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
          }
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
          }}
          style={{
            border: "1px solid #bbb",
            height: "3em",
            width: "3em",
            "object-fit": "cover",
            "border-radius": "50%",
            "margin-right": "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowPicture(true)}
        />{" "}
        <span className="display-4 align-middle">{account.screenName}</span>
      </h1>
      {account.bio ? (
        <Container>
          {account.bio.split("\n").map((line) => (
            <p>{line}</p>
          ))}
        </Container>
      ) : (
        ""
      )}

      <Container>
        {loggedInAs && loggedInAs.screenName === account.screenName ? (
          <Button
            variant="light"
            onClick={() => {
              setBio(account.bio);
              setPicture(account.profilePicURL);
              setShowEditPage(true);
            }}
            size="sm"
          >
            Edit Account
          </Button>
        ) : (
          ""
        )}
        <div style={{ float: "right" }} class="text-muted">
          Total views: {account.totalNodeViews} Total score:{" "}
          {account.totalSuggestionScore}
        </div>
      </Container>
      <br />

      {loggedInAs && loggedInAs.screenName === account.screenName ? (
        <Button
          onClick={() => setShowCreateNode(true)}
          style={{
            width: "100%",
            border: `1px solid ${palette[2]}`,
            backgroundColor: palette[0],
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
        >
          Create New Crowdventure!
        </Button>
      ) : (
        ""
      )}
      <p />
      <h3>Featured Pages:</h3>
      <CardColumns>
        {account.nodes.map((node, idx) => {
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
                    <Tooltip>This page has been starred by this user!</Tooltip>
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

              <DropdownButton
                variant="light"
                style={{ position: "absolute", top: "0px", right: "0px" }}
                size="sm"
                drop="right"
                title={<span class="fa">&#xf013;</span>}
              >
                <Dropdown.Item
                  onClick={() => featurePage(node, node.featured)}
                  disabled={
                    !loggedInAs || loggedInAs.screenName !== account.screenName
                  }
                >
                  {node.featured ? "Un-f" : "F"}eature page
                </Dropdown.Item>
                <Dropdown.Item disabled>Delete</Dropdown.Item>
                <Dropdown.Item disabled>Make Private</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item disabled>Report</Dropdown.Item>
              </DropdownButton>
              <Card.Footer className="text-muted text-center">
                <small>
                  Author:{" "}
                  <img
                    src={
                      account.profilePicURL
                        ? account.profilePicURL
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
                  {account.screenName}
                  <br />
                  Views:{" " + node.views}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>

      <Modal show={showPicture} onHide={() => setShowPicture(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{account.screenName}</Modal.Title>
        </Modal.Header>
        <img
          src={
            account.profilePicURL
              ? account.profilePicURL
              : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
          }
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
          }}
          style={{
            width: "100%",
            height: "70vh",
            "object-fit": "contain",
          }}
        />
        {info ? info : "" /* it actually shouldnt ever get here but whatever */}
        <Modal.Footer>
          <Button size="sm" onClick={() => setShowPicture(false)}>
            Wow, {account.screenName} has a{" "}
            {Math.random() < 0.5 ? "cool" : "neat"} profile picture!
          </Button>
        </Modal.Footer>
      </Modal>
      <p />
      {loggedInAs && loggedInAs.screenName === account.screenName ? (
        <Container>
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
                {account.profilePicURL ? (
                  <img
                    src={account.profilePicURL}
                    onError={(e) => {
                      e.target.style.display = "none";
                      setInfo(
                        <span style={{ color: "red" }}>Picture not found!</span>
                      );
                    }}
                    style={{
                      opacity: account.profilePicURL === picture ? 1 : 0.2,
                      width: "100%",
                      "object-fit": "contain",
                    }}
                  />
                ) : (
                  ""
                )}
                <Form.Label>Profile Pic URL:</Form.Label>
                <Form.Control
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
                <Form.Label>Bio:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                {info ? info : ""}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={editPage}>Edit Account</Button>
                <Button
                  onClick={() => {
                    new Cookies().set("account", "", { path: "/" });
                    window.location.reload(false);
                  }}
                  variant="secondary"
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
