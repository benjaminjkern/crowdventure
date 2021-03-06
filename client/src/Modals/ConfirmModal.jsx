import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { palette } from "../index";

const ConfirmModal = (props) => {
  const { title, content, onConfirm, close, loggedInAs } = props;
  const [show, setShow] = useState(true);
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
        {content}
      </Modal.Body>
      <Modal.Footer
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[5] } }
          : {})}
      >
        <Button
          variant="danger"
          onClick={() => {
            setShow(false);
            close();
          }}
        >
          No!
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          style={{
            border: `1px solid ${palette[2]}`,
            backgroundColor: palette[0],
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
        >
          Yes!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
