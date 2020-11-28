import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { palette } from "../index";

const ConfirmModal = (props) => {
  const { title, content, onConfirm, close } = props;
  const [show, setShow] = useState(true);
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        close();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
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
