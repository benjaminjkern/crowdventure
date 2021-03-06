import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import SearchPage from "../Node/SearchPage";

import CreateNodeModal from "./CreateNodeModal";

import { mutation_call, palette, escape } from "../index";

const EditChoiceModal = (props) => {
  const { choice, loggedInAs, fromNode, close } = props;

  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");

  const [toPage, setToPage] = useState(choice.to.ID);
  const [suggestAction, setSuggestAction] = useState(choice.action);
  const [showingModal, showModal] = useState("");
  const [hidden, setHidden] = useState(choice.hidden);

  const editChoice = (toID) => {
    if (!toID) {
      showModal(
        <CreateNodeModal
          loggedInAs={loggedInAs}
          picture={fromNode.pictureURL}
          callback={(node) => editChoice(node.ID)}
          close={() => showModal(undefined)}
        />
      );
    } else {
      const escaped = escape(suggestAction);
      mutation_call(
        "editSuggestion",
        {
          choiceID: choice.ID,
          action: escaped,
          toID: toID,
          ...(hidden !== undefined ? { hidden } : {}),
        },
        { ID: 0 },
        () => {
          window.location.reload(false);
        }
      );
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        close();
      }}
    >
      <Modal.Header
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[5] } }
          : {})}
        closeButton
      >
        <Modal.Title>Editing Choice</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[4] } }
            : {})}
        >
          <Form.Label>Action:</Form.Label>
          <Form.Control
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
            value={suggestAction}
            onChange={(e) => setSuggestAction(e.target.value)}
          ></Form.Control>
          <Form.Label>Go to Page:</Form.Label>
          <SearchPage callback={(nodeID) => setToPage(nodeID)} toID={toPage} />

          {loggedInAs && loggedInAs.isAdmin ? (
            <>
              <Form.Label>Admin Controls:</Form.Label>
              <Form.Check
                type="checkbox"
                checked={hidden || false}
                onChange={(e) => setHidden(e.target.checked)}
                label="Choice should be hidden"
                id="hide"
              />
            </>
          ) : (
            ""
          )}
          {info ? info : ""}
        </Modal.Body>
        <Modal.Footer
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[5] } }
            : {})}
        >
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
            style={{
              border: `1px solid ${palette[2]}`,
              backgroundColor: palette[0],
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
          >
            Edit Choice
          </Button>
        </Modal.Footer>
      </Form>
      {showingModal || ""}
    </Modal>
  );
};

export default EditChoiceModal;
