import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Node from "./Node/Node";
import Account from "./Account";
import Home from "./Home";
import Notifications from "./Notifications";
import AccountManager from "./AccountManager";

import { Navbar, Container } from "react-bootstrap";

import Cookies from "universal-cookie";
import history from "history/browser";

import { mutation_call, palette } from "./index";
const packageJson = require("../package.json");

const App = () => {
    const [loggedInAs, setLoggedInAs] = useState(undefined);

    useEffect(() => {
        if (loggedInAs === undefined) {
            const cookies = new Cookies();
            const savedAccount = escape(cookies.get("account"));

            if (!savedAccount || savedAccount === "")
                cookies.set("unsafeMode", "false", { path: "/" });

            mutation_call(
                "loginAccount",
                { screenName: savedAccount },
                {
                    screenName: 0,
                    profilePicURL: 0,
                    isAdmin: 0,
                    notifications: {
                        seen: 0,
                    },
                },
                (res) => {
                    if (res) {
                        res.unsafeMode = cookies.get("unsafeMode") === "true";
                        setLoggedInAs(res);
                    } else {
                        cookies.set("account", "", { path: "/" });
                        cookies.set("unsafeMode", "false", { path: "/" });
                    }
                }
            );
        }

        if (loggedInAs && loggedInAs.unsafeMode) {
            document.getElementById(
                "root"
            ).style.backgroundImage = `linear-gradient(
      to right,
      rgb(158, 232, 255),
      ${palette[3]} 10%,
      ${palette[3]} 90%,
      rgb(158, 232, 255)
    )`;
            document.getElementById("root").style.color = "rgb(225, 240, 255)";
        } else {
            document.getElementById(
                "root"
            ).style.backgroundImage = `linear-gradient(
        to right,
        rgb(158, 232, 255),
        rgb(245,250,255) 10%,
        rgb(245,250,255) 90%,
        rgb(158, 232, 255)
      )`;
            document.getElementById("root").style.color = "";
        }
    });

    return (
        <Container>
            <Navbar expand="lg" className="row border-bottom">
                <Navbar.Brand href="/" style={{ maxWidth: "60%" }}>
                    <img
                        href="/"
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        alt="Crowdventure Logo"
                        style={{ width: "100%" }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="bg-light"
                    style={{ marginRight: "20px" }}
                />

                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <div className="text-center">
                        <AccountManager
                            loggedInAs={loggedInAs}
                            setLoggedInAs={setLoggedInAs}
                        />
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <br />
            <HashRouter>
                <Switch>
                    <Route
                        path="/"
                        render={(props) => (
                            <Home
                                {...props}
                                loggedInAs={loggedInAs}
                                history={history}
                            />
                        )}
                        exact
                    />
                    <Route
                        path="/node/:id"
                        render={(props) => (
                            <Node
                                {...props}
                                loggedInAs={loggedInAs}
                                history={history}
                            />
                        )}
                    />
                    <Route
                        path="/account/:id"
                        render={(props) => (
                            <Account
                                {...props}
                                loggedInAs={loggedInAs}
                                setLoggedInAs={setLoggedInAs}
                            />
                        )}
                    />
                    <Route
                        path="/notifications"
                        render={(props) => (
                            <Notifications
                                {...props}
                                loggedInAs={loggedInAs}
                                setLoggedInAs={setLoggedInAs}
                            />
                        )}
                    />
                </Switch>
            </HashRouter>
            <br />
            <Navbar className="row border-top">
                <div className="col">
                    <small className="text-muted">
                        @ 2020 Copyright: (MIT) Benjamin Kern
                    </small>
                </div>

                <div
                    className="col text-right"
                    style={{ paddingRight: "20px" }}
                >
                    <a href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
                        <small className="text-muted">
                            Version: {packageJson.version}
                        </small>
                    </a>
                </div>
            </Navbar>
            <title>Crowdventure! - Page not found!</title>
        </Container>
    );
};

export default App;
