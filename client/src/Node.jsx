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

import app_fetch from "./index";

const Node = (props) => {
  const [redirect, setRedirect] = useState(undefined);
  const nodeID = props.match.params.id;
  const [account, setAccount] = useState(undefined);
  const [node, setNode] = useState(undefined);

  const [info, setInfo] = useState("");

  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestAction, setSuggestAction] = useState("");
  const [toPage, setToPage] = useState("");

  const [showCreateNode, setShowCreateNode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createNodeCallback, setCreateNodeCallback] = useState(undefined);

  const [showEditNode, setShowEditNode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [showEditSuggest, setShowEditSuggest] = useState(false);
  const [choiceID, setChoiceID] = useState("");

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
          createNodeCallback[0](res.data.createNode.ID);
        } else alert("Something went wrong when creating node");
      });
  };

  const editNode = () => {
    if (editTitle.includes('"'))
      setInfo(
        <p style={{ color: "red" }}>
          The title cannot contain (") character! Try using (') or (`) instead!
        </p>
      );
    else if (editContent.includes('"'))
      setInfo(
        <p style={{ color: "red" }}>
          The content cannot contain (") character! Try using (') or (`)
          instead!
        </p>
      );
    else
      app_fetch({
        query: `mutation{editNode(nodeID:"${nodeID}",title:"${editTitle}",content:"${editContent}"){ID}}`,
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
      setCreateNodeCallback([createNewAction]);
    } else
      app_fetch({
        query: `mutation{suggestChoice(accountScreenName:"${account.screenName}",fromID:"${nodeID}",action:"${suggestAction}",toID:"${toID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) {
          setShowSuggest(false);
          setShowCreateNode(false);
          window.location.reload(false);
        } else alert("Something went wrong when creating choice!");
      });
  };

  const deletePage = () => {
    app_fetch({
      query: `mutation{deleteNode(nodeID:"${nodeID}")}`,
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
      setCreateNodeCallback([editChoice]);
    } else {
      app_fetch({
        query: `mutation{editSuggestion(choiceID:"${choiceID}",action:"${suggestAction}",toID:"${toID}"){ID}}`,
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
    const cookies = new Cookies();
    const loggedInAs = cookies.get("account");

    app_fetch({
      query: `query{getNode(ID:"${nodeID}"){ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setNode(res.data.getNode);
      else setNode(null);
    });

    app_fetch({
      query: `mutation{loginAccount(screenName:"${loggedInAs}"){screenName}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) setAccount(res.data.loginAccount);
      else {
        alert("Something went wrong when retrieving account");
        cookies.set("account", "", { path: "/" });
      }
    });
  }, []);

  if (node === undefined) {
    return (
      <Alert variant="light">
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
      <h1>{node.title}</h1>
      <Container>{node.content}</Container>
      <p />
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
          }}
        />
      ) : (
        <p className="text-muted">
          By decree of <strong>{node.owner.screenName}</strong>, this journey
          ends here.
        </p>
      )}
      <p />

      <p>
        Owner:{" "}
        <a href={`/crowdventure/#/account/${node.owner.screenName}`}>
          {node.owner.screenName}
        </a>
        {account && node.owner.screenName === account.screenName ? (
          <p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setEditTitle(node.title);
                setEditContent(node.content);
                setShowEditNode(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              Delete
            </Button>
          </p>
        ) : (
          ""
        )}
      </p>
      <h3>
        Other options:
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
              onClick={() => setShowSuggest(true)}
              disabled={!account}
              style={{
                width: "100%",
                pointerEvents: account ? "auto" : "none",
              }}
            >
              Suggest New Choice
            </Button>
          </span>
        </OverlayTrigger>
      </h3>
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
              required
              value={suggestAction}
              onChange={(e) => setSuggestAction(e.target.value)}
            ></Form.Control>
            <Form.Label>Go to Page:</Form.Label>
            <SearchPage
              callback={(nodeID) => setToPage(nodeID)}
              toID={toPage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => editChoice(toPage)}>Edit Choice</Button>
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
              required
              value={suggestAction}
              onChange={(e) => setSuggestAction(e.target.value)}
            />
            <Form.Label>Go to Page:</Form.Label>
            <SearchPage
              callback={(nodeID) => setToPage(nodeID)}
              toID={toPage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => createNewAction(toPage)}>
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

      <Modal show={showEditNode} onHide={() => setShowEditNode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></Form.Control>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              required
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            ></Form.Control>
            {info ? info : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={editNode}>Edit Page!</Button>
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
      {redirect ? redirect : ""}
    </Container>
  );
};

const ChoiceColumns = (props) => {
  const { owner, account, choices, nodeID, canon, onEdit } = props;

  const like = (choiceID) => {
    if (account)
      app_fetch({
        query: `mutation{likeSuggestion(accountScreenName:"${account.screenName}",choiceID:"${choiceID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.likeSuggestion) window.location.reload(false);
      });
  };
  const dislike = (choiceID) => {
    if (account)
      app_fetch({
        query: `mutation{dislikeSuggestion(accountScreenName:"${account.screenName}",choiceID:"${choiceID}"){ID}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.dislikeSuggestion)
          window.location.reload(false);
      });
  };

  const makeCanon = (choiceID) => {
    app_fetch({
      query: `mutation{makeCanon(choiceID:"${choiceID}"){ID}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.makeCanon) window.location.reload(false);
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

  return (
    <CardColumns>
      {choices.map((choice) => (
        <Card className="text-center">
          <a
            href={choice.to ? `/crowdventure/#/node/${choice.to.ID}` : ""}
            style={{
              pointerEvents: choice.to ? "auto" : "none",
              color: choice.to ? undefined : "grey",
            }}
            onClick={() => setTimeout(() => window.location.reload(false), 100)}
          >
            <Card.Body style={{ cursor: "pointer" }}>
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
                !account || choice.suggestedBy.screenName !== account.screenName
              }
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Report</Dropdown.Item>
          </DropdownButton>
          <Card.Footer>
            <a
              href={`/crowdventure/#/node/${nodeID}`}
              style={{
                pointerEvents: account ? "auto" : "none",
                color: account
                  ? choice.dislikedBy
                      .map((account) => account.screenName)
                      .includes(account.screenName)
                    ? "red"
                    : "black"
                  : "grey",
              }}
              className="fa fa-thumbs-down"
              onClick={() => dislike(choice.ID)}
            ></a>
            {" " + choice.score + " "}
            <a
              href={`/crowdventure/#/node/${nodeID}`}
              style={{
                pointerEvents: account ? "auto" : "none",
                color: account
                  ? choice.likedBy
                      .map((account) => account.screenName)
                      .includes(account.screenName)
                    ? "green"
                    : "black"
                  : "grey",
              }}
              className="fa fa-thumbs-up"
              onClick={() => like(choice.ID)}
            ></a>
            <br />
            <small className="text-muted">
              Suggested By:{" "}
              <a
                href={`/crowdventure/#/account/${choice.suggestedBy.screenName}`}
              >
                {choice.suggestedBy.screenName}
              </a>
            </small>
          </Card.Footer>
        </Card>
      ))}
    </CardColumns>
  );
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
      node.title.toLowerCase().includes(props.text) ||
      node.owner.screenName.toLowerCase().includes(props.text)
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
      query: `query{allNodes{title,owner{screenName},ID}}`,
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
            <small>Author: {node.owner.screenName}</small>
          </div>
        </div>
      )}
    />
  );
};

export default Node;
