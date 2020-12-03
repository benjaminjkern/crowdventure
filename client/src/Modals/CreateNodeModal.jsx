import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import { escape, mutation_call, palette } from "../index";

import SearchImage from "../SearchImage";

const CreateNodeModal = (props) => {
  const {
    loggedInAs,
    callback,
    picture,
    pictureUnsafe,
    close,
    featured,
  } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictureField, setPictureField] = useState(picture);
  const [showChangePic, setShowChangePic] = useState(false);

  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");
  const [shouldHide, setShouldHide] = useState(pictureUnsafe);

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
        featured: featured || false,
        ...(shouldHide ? { hidden: true, pictureUnsafe: true } : {}),
        ...(esPicture && esPicture.length ? { pictureURL: esPicture } : {}),
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
      <Modal.Header
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[5] } }
          : {})}
        closeButton
      >
        <Modal.Title>Creating New Page</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[4] } }
            : {})}
        >
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
                    setInfo(
                      <span style={{ color: "red" }}>Picture not found!</span>
                    );
                    setPictureField("");
                    setShouldHide(false);
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
                    setShouldHide(false);
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
              {!pictureField ? "(Don't use any picture)" : "(Use new picture)"}
            </div>
            <div class="col text-right">
              <Button
                variant={
                  loggedInAs && loggedInAs.unsafeMode ? "secondary" : "light"
                }
                size="sm"
                onClick={() => setShowChangePic(!showChangePic)}
              >
                {pictureField ? "Change" : "Select"} Picture
              </Button>
            </div>
          </div>
          {showChangePic ? (
            <SearchImage
              loggedInAs={loggedInAs}
              callback={(url, familyFriendly) => {
                setPictureField(url);
                setShowChangePic(false);
                setShouldHide(!familyFriendly);
              }}
            />
          ) : (
            ""
          )}
          <Form.Label>Title:</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
          />
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={content}
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
            onChange={(e) => setContent(e.target.value)}
          />
          {info || ""}
          {shouldHide ? (
            <span style={{ color: "red" }}>
              The image chosen will cause the page to automatically be hidden.
              If you would like to not have this happen, change or remove the
              image.
            </span>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[5] } }
            : {})}
        >
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
