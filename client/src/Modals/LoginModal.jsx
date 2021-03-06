import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { mutation_call, palette, escape } from "../index";

import Cookies from "universal-cookie";

const LoginModal = (props) => {
  const { loggedInAs, setLoggedInAs, close } = props;

  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");

  const [screenName, setScreenName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const esScreenName = escape(screenName);
    const esPass = escape(password);

    mutation_call(
      "loginAccount",
      { screenName: esScreenName, password: esPass },
      {
        screenName: 0,
        profilePicURL: 0,
        isAdmin: 0,
        notifications: { seen: 0 },
      },
      (res) => {
        if (res) {
          new Cookies().set("account", screenName, { path: "/" });
          setLoggedInAs(res);
          setShow(false);
          close();
        } else {
          setInfo(
            <div style={{ color: "red" }}>
              That account does not exist or the password did not match!
            </div>
          );
        }
      }
    );
  };

  const tryToLogin = () =>
    screenName
      ? password
        ? login()
        : setInfo(
            <span style={{ color: "red" }}>Please enter your screenName!</span>
          )
      : setInfo(
          <span style={{ color: "red" }}>Please enter your password!</span>
        );

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
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[4] } }
            : {})}
        >
          <Form.Label>Screen Name:</Form.Label>
          <Form.Control
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
            value={screenName}
            onChange={(e) => setScreenName(e.target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {info ? info : ""}
        </Modal.Body>
        <Modal.Footer
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[5] } }
            : {})}
        >
          <Button
            variant="primary"
            style={{
              border: `1px solid ${palette[2]}`,
              backgroundColor: palette[0],
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
            onClick={tryToLogin}
          >
            Log in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;
