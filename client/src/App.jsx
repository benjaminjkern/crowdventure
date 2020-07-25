import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect, Router } from "react-router-dom";

import Node from "./Node";
import Account from "./Account";
import Home from "./Home";

import Cookies from "universal-cookie";
import { Navbar, Container, Button, Modal, Form } from "react-bootstrap";

import { app_fetch, escape } from "./index";

import history from "history/browser";
const packageJson = require("../package.json");

const App = () => {
  const [bgColor, setBgColor] = useState(undefined);
  const [fgColor, setFgColor] = useState(undefined);
  return (
    <Container>
      <Navbar expand="lg">
        <Navbar.Brand href="/crowdventure">
          <img
            href="/crowdventure"
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Crowdventure Logo"
            style={{ width: "100%" }}
          />
        </Navbar.Brand>
        <a href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
          <small class="text-muted">Version: {packageJson.version}</small>
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <AccountManager />
        </Navbar.Collapse>
      </Navbar>
      <HashRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/node/:id"
            render={(props) => (
              <Node
                {...props}
                history={history}
                setBgColor={setBgColor}
                setFgColor={setFgColor}
              />
            )}
          />
          <Route path="/account/:id" component={Account} />
        </Switch>
      </HashRouter>
      <Navbar className="text-right">
        <small class="text-muted">@ 2020 Copyright: (MIT) Benjamin Kern</small>
      </Navbar>
      <title>Crowdventure! - Page not found!</title>
    </Container>
  );
};

const AccountManager = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [info, setInfo] = useState(undefined);

  const [screenName, setScreenName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmitSignUp = () => {
    if (pass1 !== pass2)
      setInfo(<div style={{ color: "red" }}>Passwords must match!</div>);
    else {
      const esScreenName = escape(screenName);
      app_fetch({
        query: `query{getAccount(screenName:"${esScreenName}"){screenName}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.getAccount)
          setInfo(
            <div style={{ color: "red" }}>That account already exists!</div>
          );
        else {
          createAccount();
        }
      });
    }
  };

  const createAccount = () => {
    const esScreenName = escape(screenName);
    const esPass = escape(pass1);
    app_fetch({
      query: `mutation{createAccount(screenName:"${esScreenName}",password:"${esPass}"){screenName,profilePicURL}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.createAccount) {
        new Cookies().set("account", screenName, { path: "/" });
        setAccount(res.data.createAccount);
        setShowSignUp(false);
        window.location.reload(false);
      } else alert("Something went wrong when creating account");
    });
  };

  const login = () => {
    const esScreenName = escape(screenName);
    const esPass = escape(pass1);
    app_fetch({
      query: `mutation{loginAccount(screenName:"${esScreenName}",password:"${esPass}"){screenName,profilePicURL}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.loginAccount) {
        new Cookies().set("account", screenName, { path: "/" });
        setAccount(res.data.getAccount);
        setShowLogin(false);
        window.location.reload(false);
      } else
        setInfo(
          <div style={{ color: "red" }}>
            That account does not exist or the password did not match!
          </div>
        );
    });
  };

  useEffect(() => {
    let loggedInAs = escape(new Cookies().get("account"));
    if (loggedInAs)
      app_fetch({
        query: `mutation{loginAccount(screenName:"${loggedInAs}"){screenName,profilePicURL}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) setAccount(res.data.loginAccount);
        else {
          alert("Something went wrong when logging in");
          new Cookies().set("account", "", { path: "/" });
        }
      });
  }, []);

  if (account === undefined || account === null) {
    return (
      <Navbar.Text>
        You are not logged in.{" "}
        <Button
          variant="light"
          onClick={() => {
            setShowLogin(true);
            setInfo("");
          }}
          size="sm"
        >
          Log In
        </Button>{" "}
        or{" "}
        <Button
          variant="light"
          onClick={() => {
            setShowSignUp(true);
            setInfo("");
          }}
          size="sm"
        >
          Sign Up
        </Button>
        <Modal show={showLogin} onHide={() => setShowLogin(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Label>Screen Name:</Form.Label>
              <Form.Control
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
              />
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
              />
              {info ? info : ""}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() =>
                  screenName
                    ? pass1
                      ? login()
                      : setInfo(
                          <span style={{ color: "red" }}>
                            Please enter your screenName!
                          </span>
                        )
                    : setInfo(
                        <span style={{ color: "red" }}>
                          Please enter your password!
                        </span>
                      )
                }
              >
                Log in
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up for Crowdventure!</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Screen Name:</Form.Label>
                <Form.Control
                  value={screenName}
                  onChange={(e) => setScreenName(e.target.value)}
                />
                <Form.Label>Create Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                />
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                />
              </Form.Group>
              {info ? info : ""}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
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
      </Navbar.Text>
    );
  }

  return (
    <Navbar.Text>
      You are logged in as:{" "}
      <a
        href={`/crowdventure/#/account/${account.screenName}`}
        onClick={() => setTimeout(() => window.location.reload(false), 100)}
      >
        <img
          src={
            account.profilePicURL
              ? account.profilePicURL
              : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
          }
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
          }}
          style={{
            border: "1px solid #bbb",
            height: "2em",
            width: "2em",
            "object-fit": "cover",
            "border-radius": "50%",
          }}
        />{" "}
        {account.screenName}
      </a>
    </Navbar.Text>
  );
};

export default App;
