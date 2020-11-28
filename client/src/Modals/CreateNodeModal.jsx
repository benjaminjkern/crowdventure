import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import { escape, mutation_call, palette } from "../index";

import SearchImage from "../SearchImage";

const CreateNodeModal = (props) => {
  const { loggedInAs, callback, picture, close, featured } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictureField, setPictureField] = useState(picture);
  const [showChangePic, setShowChangePic] = useState(false);

  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");

  const createNode = () => {
    const esTitle = escape(title);
    const esContent = escape(content, true);
    const esPicture = escape(pictureField);
    mutation_call(
      "createNode",
      {
        accountScreenName: loggedInAs.screenName,
        title: esTitle,
        content: `""${esContent}""`,
        pictureURL: esPicture,
        featured: featured || false,
      },
      { ID: 0 },
      callback ||
        (() => {
          window.location.reload(false);
        })
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
        <Modal.Title>Creating New Page</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          {pictureField ? (
            <>
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={pictureField}
                  onError={() => {
                    setPictureField("");
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
                    setPictureField("");
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
                {pictureField ? "Change" : "Select"} Picture
              </Button>
            </div>
          </div>
          {showChangePic ? (
            <SearchImage
              callback={(url) => {
                setPictureField(url);
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
          {info || ""}
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
            Create Page!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateNodeModal;
