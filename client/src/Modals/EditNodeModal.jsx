import React, { useState } from "react";

import { mutation_call, palette, escape } from "../index";

import { Modal, Form, Button } from "react-bootstrap";

import SearchImage from "../SearchImage";
import ConfirmModal from "./ConfirmModal";

const EditNodeModal = (props) => {
  const { node, close, loggedInAs } = props;

  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");
  const [showingModal, showModal] = useState(undefined);

  const [title, setTitle] = useState(node.title);
  const [content, setContent] = useState(node.content);
  const [picture, setPicture] = useState(node.pictureURL);
  const [showChangePic, setShowChangePic] = useState(false);

  const deletePage = () => {
    mutation_call("deleteNode", { nodeID: node.ID }, 0, () => {
      history.back();
      setTimeout(() => window.location.reload(false), 100);
    });
  };

  const editNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content, true);
    const esPicture = escape(picture);

    mutation_call(
      "editNode",
      {
        nodeID: node.ID,
        title: esTitle,
        content: `""${esContent}""`,
        pictureURL: esPicture,
      },
      { ID: 0 },
      (res) => {
        if (res) {
          window.location.reload(false);
        }
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        close();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editing Page</Modal.Title>
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
              {!picture
                ? "(Don't use any picture)"
                : picture === node.pictureURL
                ? "(Use existing picture)"
                : "(Use new picture)"}
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
                  ? editNode()
                  : setInfo(
                      <span style={{ color: "red" }}>
                        Content cannot be empty!
                      </span>
                    )
                : setInfo(
                    <span style={{ color: "red" }}>Title cannot be empty!</span>
                  )
            }
            style={{
              border: `1px solid ${palette[2]}`,
              backgroundColor: palette[0],
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
          >
            Edit Page!
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              showModal(
                <ConfirmModal
                  close={() => showModal(undefined)}
                  onConfirm={deletePage}
                  title="Delete Page"
                  content="This will erase all suggested choices of this page, and their associated scores. This will NOT delete sub-pages of this page. Are you sure you wish to continue?"
                />
              );
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Form>
      {showingModal || ""}
    </Modal>
  );
};

export default EditNodeModal;
