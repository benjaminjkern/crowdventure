import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { query_call, mutation_call, palette } from "../index";

import Cookies from "universal-cookie";

const SignUpModal = (props) => {
  const { loggedInAs, setLoggedInAs, close } = props;
  const [show, setShow] = useState(true);
  const [info, setInfo] = useState("");

  const [screenName, setScreenName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmitSignUp = () => {
    if (pass1 !== pass2)
      setInfo(<div style={{ color: "red" }}>Passwords must match!</div>);
    else {
      const esScreenName = escape(screenName);
      query_call(
        "getAccount",
        { screenName: esScreenName },
        { screenName: 0 },
        (res) => {
          if (res) {
            setInfo(
              <div style={{ color: "red" }}>That account already exists!</div>
            );
          } else {
            createAccount();
          }
        }
      );
    }
  };

  const createAccount = () => {
    const esScreenName = escape(screenName);
    const esPass = escape(pass1);
    mutation_call(
      "createAccount",
      { screenName: esScreenName, password: esPass },
      { screenName: 0, profilePicURL: 0, isAdmin: 0 },
      (res) => {
        if (res) {
          new Cookies().set("account", screenName, { path: "/" });
          setLoggedInAs(res);
          setShow(false);
          close();
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
      <Modal.Header
        {...(loggedInAs && loggedInAs.unsafeMode
          ? { style: { backgroundColor: palette[5] } }
          : {})}
        closeButton
      >
        <Modal.Title>Sign Up for Crowdventure!</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[4] } }
            : {})}
        >
          <Form.Group>
            <Form.Label>Screen Name:</Form.Label>
            <Form.Control
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
            />
            <Form.Label>Create Password:</Form.Label>
            <Form.Control
              {...(loggedInAs && loggedInAs.unsafeMode
                ? { style: { backgroundColor: palette[5], color: "white" } }
                : {})}
              type="password"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
            />
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              {...(loggedInAs && loggedInAs.unsafeMode
                ? { style: { backgroundColor: palette[5], color: "white" } }
                : {})}
              type="password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </Form.Group>
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
            onClick={() =>
              screenName
                ? pass1
                  ? handleSubmitSignUp()
                  : setInfo(
                      <span style={{ color: "red" }}>
                        Please enter a screen name!
                      </span>
                    )
                : setInfo(
                    <span style={{ color: "red" }}>
                      Please enter a password!
                    </span>
                  )
            }
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
