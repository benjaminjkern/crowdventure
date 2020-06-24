import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Node from "./Node";
import Account from "./Account";
import Home from "./Home";

import Cookies from "universal-cookie";
import {
  Navbar,
  Container,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import app_fetch from "./index";

const App = () => {
  return (
    <Container>
      <Navbar>
        <Navbar.Brand href="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Crowdventure Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <AccountManager />
        </Navbar.Collapse>
      </Navbar>
      <HashRouter basename="/">
        <Route path="/" component={Home} exact />
        <Route path="/node/:id" component={Node} />
        <Route path="/account/:id" component={Account} />
      </HashRouter>
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
    else if (screenName.includes('"'))
      setInfo(
        <div style={{ color: "red" }}>
          Screen Name cannot include (") character!
        </div>
      );
    else if (pass1.includes('"'))
      setInfo(
        <div style={{ color: "red" }}>
          Password cannot include (") character!
        </div>
      );
    else
      app_fetch({
        query: `query{getAccount(screenName:"${screenName}"){screenName}}`,
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
  };

  const createAccount = () =>
    app_fetch({
      query: `mutation{createAccount(screenName:"${screenName}",password:"${pass1}"){screenName}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.createAccount) {
        new Cookies().set("account", screenName, { path: "/" });
        setAccount(res.data.createAccount);
        setShowSignUp(false);
        window.location.reload(false);
      } else alert("Something went wrong when creating account");
    });

  const login = () => {
    if (screenName.includes('"'))
      setInfo(
        <div style={{ color: "red" }}>
          Screen Name cannot include (") character!
        </div>
      );
    else if (pass1.includes('"'))
      setInfo(
        <div style={{ color: "red" }}>
          Password cannot include (") character!
        </div>
      );
    else {
      app_fetch({
        query: `query{getAccount(screenName:"${screenName}",password:"${pass1}"){screenName}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data && res.data.getAccount) {
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
    }
  };

  useEffect(() => {
    let loggedInAs = new Cookies().get("account"); // INSECURE DOES NOT CHECK FOR PASSWORD WHEN YOU LOAD PAGE BUT WAHTEVER
    if (loggedInAs)
      app_fetch({
        query: `query{getAccount(screenName:"${loggedInAs}"){screenName}}`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) setAccount(res.data.getAccount);
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
        <a href="#" onClick={() => setShowLogin(true)}>
          Log In
        </a>{" "}
        or{" "}
        <a href="#" onClick={() => setShowSignUp(true)}>
          Sign Up
        </a>
        <Modal show={showLogin} onHide={() => setShowLogin(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Label>Screen Name:</Form.Label>
              <Form.Control
                required
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
              />
              <Form.Label>Password:</Form.Label>
              <Form.Control
                required
                type="password"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
              />
              {info ? info : ""}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => login()}>
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
                  required
                  value={screenName}
                  onChange={(e) => setScreenName(e.target.value)}
                />
                <Form.Label>Create Password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                />
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                />
              </Form.Group>
              {info ? info : ""}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => handleSubmitSignUp()}>
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
      <a href={`/account/${account.screenName}`}>{account.screenName}</a>
    </Navbar.Text>
  );
};

export default App;
