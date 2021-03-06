import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { palette } from "../index";

const PictureModal = (props) => {
  const { title, pictureURL, close, loggedInAs } = props;
  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");

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
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[4] } }
          : {})}
      >
        <img
          src={pictureURL}
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
        {info ? info : ""}
      </Modal.Body>
      <Modal.Footer
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[5] } }
          : {})}
      >
        <Button
          size="sm"
          onClick={() => {
            setShow(false);
            close();
          }}
          style={{
            border: `1px solid ${palette[2]}`,
            backgroundColor: palette[0],
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
        >
          Thanks for showing me this {Math.random() < 0.5 ? "cool" : "neat"}{" "}
          picture!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PictureModal;
