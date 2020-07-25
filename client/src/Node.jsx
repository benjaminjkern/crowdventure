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

import { Typeahead } from "react-bootstrap-typeahead";

import { app_fetch, escape, palette } from "./index";

const Node = (props) => {
  const { history, match } = props;
  const [redirect, setRedirect] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [node, setNode] = useState(undefined);

  const [info, setInfo] = useState("");

  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestAction, setSuggestAction] = useState("");
  const [toPage, setToPage] = useState("");

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [createNodeCallback, setCreateNodeCallback] = useState(undefined);

  const [showEditNode, setShowEditNode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editURL, setEditURL] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [showEditSuggest, setShowEditSuggest] = useState(false);
  const [choiceID, setChoiceID] = useState("");

  const [showPicture, setShowPicture] = useState(false);

  const createNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content, true);
    const esPicture = escape(picture);
    app_fetch({
      query: `mutation{createNode(accountScreenName:"${account.screenName}",title:"${esTitle}",content:"""${esContent}""",pictureURL:"${esPicture}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.createNode) {
        createNodeCallback[0](res.data.createNode.ID);
      } else alert("Something went wrong when creating node");
    });
  };

  const editNode = () => {
    const esTitle = escape(editTitle);
    const esContent = escape(editContent, true);
    const esURL = escape(editURL);
    app_fetch({
      query: `mutation{editNode(nodeID:"${node.ID}",title:"${esTitle}",content:"""${esContent}""",pictureURL:"${esURL}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.editNode) {
        setShowEditNode(false);
        window.location.reload(false);
      } else alert("Something went wrong when editing node");
    });
  };

  const createNewAction = (toID) => {
    if (!toID) {
      setShowSuggest(false);
      setShowCreateNode(true);
      setTitle("");
      setContent("");
      setInfo("");
      setPicture(node.pictureURL ? node.pictureURL : "");
      setCreateNodeCallback([createNewAction]);
    } else {
      const escaped = escape(suggestAction);
      app_fetch({
        query: `mutation{suggestChoice(accountScreenName:"${account.screenName}",fromID:"${node.ID}",action:"${escaped}",toID:"${toID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) {
          setShowSuggest(false);
          setShowCreateNode(false);
          window.location.reload(false);
        } else alert("Something went wrong when creating choice!");
      });
    }
  };

  const deletePage = () => {
    app_fetch({
      query: `mutation{deleteNode(nodeID:"${node.ID}")}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setRedirect(<Redirect to="/" />);
      else alert("Something went wrong when deleting node");
    });
  };

  const editChoice = (toID) => {
    if (!toID) {
      setShowEditSuggest(false);
      setShowCreateNode(true);
      setInfo("");
      setTitle("");
      setContent("");
      setPicture(node.pictureURL ? node.pictureURL : "");
      setCreateNodeCallback([editChoice]);
    } else {
      let escaped = escape(suggestAction);
      app_fetch({
        query: `mutation{editSuggestion(choiceID:"${choiceID}",action:"${escaped}",toID:"${toID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) {
          setShowEditSuggest(false);
          setShowCreateNode(false);
          window.location.reload(false);
        } else alert("Something went wrong when editing choice!");
      });
    }
  };

  useEffect(() => {
    const pageID = escape(match.params.id);
    if (!node || pageID !== node.ID)
      app_fetch({
        query: `query{getNode(ID:"${pageID}"){pictureURL,fgColor,bgColor,ID,title,content,views,owner{screenName,profilePicURL},canonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.getNode) {
          setNode(res.data.getNode);
          props.setBgColor(res.data.getNode.bgColor);
          props.setFgColor(res.data.getNode.fgColor);
        } else setNode(null);
      });

    if (!account) {
      const cookies = new Cookies();
      const loggedInAs = escape(cookies.get("account"));
      if (loggedInAs)
        app_fetch({
          query: `mutation{loginAccount(screenName:"${loggedInAs}"){screenName}}`,
        }).then((res, err) => {
          if (err) alert(err);
          if (res.data) setAccount(res.data.loginAccount);
          else {
            alert("Something went wrong when retrieving account, logging out");
            cookies.set("account", "", { path: "/" });
            setAccount(null);
          }
        });
      else setAccount(null);
    }
  });

  if (node === undefined) {
    return (
      <Alert variant="light">
        <title>Loading Page...</title>
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );
  }

  if (node === null)
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
      <title>Crowdventure! - {node.title}</title>
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
          }}
          onClick={() => {
            setShowPicture(true);
            setInfo("");
          }}
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
      <Container className="row" style={{ paddingRight: "0px" }}>
        <div class="col">
          <h3>Choices:</h3>
        </div>
        <div class="col" style={{ paddingRight: "0px" }}>
          <Button
            onClick={() => {
              history.back();
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
        <ChoiceColumns
          owner={node.owner}
          choices={node.canonChoices}
          account={account}
          canon={true}
          nodeID={node.ID}
          onEdit={(choice) => {
            setSuggestAction(choice.action);
            setToPage(choice.to.ID);
            setChoiceID(choice.ID);
            setShowEditSuggest(true);
            setInfo("");
          }}
        />
      ) : (
        <p className="text-muted">
          By decree of <strong>{node.owner.screenName}</strong>, this journey
          ends here.
        </p>
      )}

      <p />

      <Container className="row" style={{ paddingRight: "0px" }}>
        <div class="col align-bottom">
          <h3 class="align-bottom">Other options:</h3>
        </div>
        <div class="col text-right" style={{ paddingRight: "0px" }}>
          <small class="text-muted">
            Author:{" "}
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
              {node.owner.screenName}{" "}
            </a>{" "}
            <br />
            Views: {node.views}
          </small>
          {account && node.owner.screenName === account.screenName ? (
            <p>
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  setEditTitle(node.title);
                  setEditContent(node.content);
                  setEditURL(node.pictureURL);
                  setShowEditNode(true);
                  setInfo("");
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
              setShowSuggest(true);
              setToPage("");
              setChoiceID("");
              setSuggestAction("");
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
            Suggest New Choice
          </Button>
        </span>
      </OverlayTrigger>
      <p />

      <ChoiceColumns
        owner={node.owner}
        choices={node.nonCanonChoices}
        account={account}
        canon={false}
        nodeID={node.ID}
        onEdit={(choice) => {
          setSuggestAction(choice.action);
          setToPage(choice.to.ID);
          setChoiceID(choice.ID);
          setShowEditSuggest(true);
          setInfo("");
        }}
      />

      {/******************************************
                         MODALS 
        ******************************************/}

      <Modal show={showEditSuggest} onHide={() => setShowEditSuggest(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Choice</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Label>Action:</Form.Label>
            <Form.Control
              value={suggestAction}
              onChange={(e) => setSuggestAction(e.target.value)}
            ></Form.Control>
            <Form.Label>Go to Page:</Form.Label>
            <SearchPage
              callback={(nodeID) => setToPage(nodeID)}
              toID={toPage}
            />
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                suggestAction
                  ? editChoice(toPage)
                  : setInfo(
                      <span style={{ color: "red" }}>
                        Action cannot be empty!
                      </span>
                    )
              }
            >
              Edit Choice
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showSuggest} onHide={() => setShowSuggest(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Suggesting New Choice</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Label>Action:</Form.Label>
            <Form.Control
              value={suggestAction}
              onChange={(e) => setSuggestAction(e.target.value)}
            />
            <Form.Label>Go to Page:</Form.Label>
            <SearchPage
              callback={(nodeID) => setToPage(nodeID)}
              toID={toPage}
            />
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                suggestAction
                  ? createNewAction(toPage)
                  : setInfo(
                      <span style={{ color: "red" }}>
                        Action cannot be empty!
                      </span>
                    )
              }
            >
              Submit New Choice
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showCreateNode} onHide={() => setShowCreateNode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Creating New Page</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {picture ? (
              <img
                src={picture}
                onError={(e) => {
                  e.target.style.display = "none";
                  setInfo(
                    <span style={{ color: "red" }}>Picture not found!</span>
                  );
                }}
                style={{
                  padding: "1px",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  width: "100%",
                  "object-fit": "contain",
                }}
              />
            ) : (
              ""
            )}
            <Form.Label>Picture:</Form.Label>
            <Form.File
              onChange={(e) => {
                setPicture(URL.createObjectURL(e.target.files[0]));
              }}
            />
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

      <Modal show={showEditNode} onHide={() => setShowEditNode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {node.pictureURL ? (
              <img
                src={node.pictureURL}
                onError={(e) => {
                  e.target.style.display = "none";
                  setInfo(
                    <span style={{ color: "red" }}>Picture not found!</span>
                  );
                }}
                style={{
                  opacity: node.pictureURL === editURL ? 1 : 0.2,
                  width: "100%",
                  "object-fit": "contain",
                }}
              />
            ) : (
              ""
            )}
            <Form.Label>Title:</Form.Label>
            <Form.Control
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <Form.Label>Picture URL:</Form.Label>
            <Form.Control
              required
              value={editURL}
              onChange={(e) => {
                setEditURL(e.target.value);
                setInfo("");
              }}
              placeholder="(Leave empty to not use a picture)"
            />
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
                title
                  ? content
                    ? editNode()
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
              Edit Page!
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShowConfirm(true);
                setInfo("");
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowConfirm(false)}>
            No!
          </Button>
          <Button variant="primary" onClick={deletePage}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPicture} onHide={() => setShowPicture(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{node.title}</Modal.Title>
        </Modal.Header>
        <img
          src={node.pictureURL}
          onError={(e) => {
            e.target.style.display = "none";
            setInfo(<span style={{ color: "red" }}>Picture not found!</span>);
          }}
          style={{
            width: "100%",
            maxHeight: "70vh",
            "object-fit": "contain",
          }}
        />
        {
          info
            ? info
            : "" /* it acctually shouldnt ever get here but whatever */
        }
        <Modal.Footer>
          <Button size="sm" onClick={() => setShowPicture(false)}>
            Thanks for showing me this {Math.random() < 0.5 ? "cool" : "neat"}{" "}
            picture!
          </Button>
        </Modal.Footer>
      </Modal>
      {redirect ? redirect : ""}
    </Container>
  );
};

const ChoiceColumns = (props) => {
  const { owner, account, choices, nodeID, canon, onEdit } = props;
  const [info, setInfo] = useState("");
  const [likeMap, setLikeMap] = useState(undefined);
  const [thisNode, setThisNode] = useState(undefined);
  const [thisAccount, setThisAccount] = useState(undefined);

  const like = (choiceID) => {
    if (account)
      app_fetch({
        query: `mutation{likeSuggestion(accountScreenName:"${account.screenName}",choiceID:"${choiceID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
      });
  };
  const dislike = (choiceID) => {
    if (account)
      app_fetch({
        query: `mutation{dislikeSuggestion(accountScreenName:"${account.screenName}",choiceID:"${choiceID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
      });
  };

  const makeCanon = (choiceID) => {
    app_fetch({
      query: `mutation{makeCanon(choiceID:"${choiceID}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.makeCanon)
        setTimeout(() => window.location.reload(false), 100); // TODO: Figure out why this is necessary
    });
  };

  const makeNonCanon = (choiceID) => {
    app_fetch({
      query: `mutation{makeNonCanon(choiceID:"${choiceID}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.makeNonCanon) window.location.reload(false);
    });
  };

  const removeSuggestion = (choiceID) => {
    app_fetch({
      query: `mutation{removeSuggestion(choiceID:"${choiceID}")}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) window.location.reload(false);
    });
  };

  useEffect(() => {
    if (!thisNode || thisNode !== nodeID || thisAccount === undefined) {
      setLikeMap({
        ...choices.reduce(
          (p, choice, idx) => ({
            ...p,
            [idx]: {
              disliked: account
                ? choice.dislikedBy
                    .map((account) => account.screenName)
                    .includes(account.screenName)
                : false,
              liked: account
                ? choice.likedBy
                    .map((account) => account.screenName)
                    .includes(account.screenName)
                : false,
              score: choice.score,
            },
          }),
          {}
        ),
      });
      setThisNode(nodeID);
      setThisAccount(account);
    }
  });

  if (likeMap && thisNode === nodeID && thisAccount !== undefined)
    return (
      <CardColumns>
        {info ? info : ""}
        {choices.map((choice, idx) => {
          return (
            <Card className="text-center">
              <a
                href={choice.to ? `/crowdventure/#/node/${choice.to.ID}` : ""}
                style={{
                  pointerEvents: choice.to ? "auto" : "none",
                  color: choice.to ? undefined : "grey",
                }}
              >
                <Card.Body style={{ cursor: "pointer", paddingTop: "2em" }}>
                  <Card.Title>{choice.action}</Card.Title>
                </Card.Body>
              </a>
              <DropdownButton
                variant="light"
                style={{ position: "absolute", top: "0px", right: "0px" }}
                size="sm"
                drop="right"
                title={<span class="fa">&#xf013;</span>}
              >
                <Dropdown.Item
                  disabled={!account || account.screenName !== owner.screenName}
                  onClick={() =>
                    canon ? makeNonCanon(choice.ID) : makeCanon(choice.ID)
                  }
                >
                  Make {canon ? "Nonc" : "C"}anon
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={
                    !account ||
                    (account.screenName !== choice.suggestedBy.screenName &&
                      account.screenName !== owner.screenName)
                  }
                  onClick={() => removeSuggestion(choice.ID)}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => onEdit(choice)}
                  disabled={
                    !account ||
                    (account.screenName !== choice.suggestedBy.screenName &&
                      (!canon || account.screenName !== owner.screenName))
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item disabled>Report</Dropdown.Item>
              </DropdownButton>
              <Card.Footer>
                <a
                  href={`/crowdventure/#/node/${nodeID}`}
                  style={{
                    pointerEvents: account ? "auto" : "none",
                    color: account
                      ? likeMap[idx].disliked
                        ? "red"
                        : "black"
                      : "grey",
                  }}
                  className="fa fa-thumbs-down"
                  onClick={(e) => {
                    if (account) {
                      setLikeMap({
                        ...likeMap,
                        [idx]: {
                          liked: false,
                          disliked: !likeMap[idx].disliked,
                          score:
                            likeMap[idx].score +
                            (likeMap[idx].liked
                              ? -2
                              : likeMap[idx].disliked
                              ? 1
                              : -1),
                        },
                      });
                    }
                    dislike(choice.ID);
                  }}
                ></a>
                {" " + (likeMap[idx] ? likeMap[idx].score : 0) + " "}
                <a
                  href={`/crowdventure/#/node/${nodeID}`}
                  style={{
                    pointerEvents: account ? "auto" : "none",
                    color:
                      account && likeMap[idx]
                        ? likeMap[idx].liked
                          ? "green"
                          : "black"
                        : "grey",
                  }}
                  className="fa fa-thumbs-up"
                  onClick={() => {
                    if (account) {
                      setLikeMap({
                        ...likeMap,
                        [idx]: {
                          disliked: false,
                          liked: !likeMap[idx].liked,
                          score:
                            likeMap[idx].score +
                            (likeMap[idx].disliked
                              ? 2
                              : likeMap[idx].liked
                              ? -1
                              : 1),
                        },
                      });
                    }
                    like(choice.ID);
                  }}
                ></a>
                <br />
                <small className="text-muted">
                  Suggested By:{" "}
                  <a
                    href={`/crowdventure/#/account/${choice.suggestedBy.screenName}`}
                  >
                    <img
                      src={
                        choice.suggestedBy.profilePicURL
                          ? choice.suggestedBy.profilePicURL
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
                    {choice.suggestedBy.screenName}
                  </a>
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>
    );
  return null;
};

const SearchPage = (props) => {
  const { callback, toID } = props;
  const [allNodes, setAllNodes] = useState(undefined);
  const [toNode, setToNode] = useState(undefined);

  const filterByCallback = (node, props) => {
    if (props.text === "") {
      callback("");
      return true;
    }
    return (
      node.title.toLowerCase().includes(props.text.toLowerCase()) ||
      node.owner.screenName.toLowerCase().includes(props.text.toLowerCase())
    );
  };

  useEffect(() => {
    if (toID) {
      app_fetch({
        query: `query{getNode(ID:"${toID}"){title,ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.getNode) setToNode(res.data.getNode);
        else alert("Something went wrong when retrieving node");
      });
    } else setToNode(null);

    app_fetch({
      query: `query{allNodes{title,owner{screenName,profilePicURL},ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.allNodes) setAllNodes(res.data.allNodes);
      else alert("Something went wrong when retrieving all nodes");
    });
  }, []);

  if (!allNodes || toNode === undefined) return <div>Loading...</div>;

  return (
    <Typeahead
      filterBy={filterByCallback}
      defaultSelected={[toNode ? toNode.title : ""]}
      labelKey="title"
      options={allNodes}
      placeholder="(Leave Empty to Create New Page)"
      renderMenuItemChildren={(node) => (
        <div onClick={() => callback(node.ID)}>
          {node.title}
          <div>
            <small>
              Author:{" "}
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
            </small>
          </div>
        </div>
      )}
    />
  );
};

export default Node;
