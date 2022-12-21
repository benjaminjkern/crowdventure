import React, { useState, createRef } from "react";
import { Navbar, OverlayTrigger, Tooltip, Button } from "react-bootstrap";

import Cookies from "universal-cookie";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import LoginModal from "./Modals/LoginModal";
import SignUpModal from "./Modals/SignUpModal";
import UnsafeModal from "./Modals/UnsafeModal";

const AccountManager = (props) => {
    const { loggedInAs, setLoggedInAs } = props;
    const [showingModal, showModal] = useState(undefined);

    if (loggedInAs === undefined || loggedInAs === null) {
        return (
            <Navbar.Text style={{ "text-align": "right" }}>
                You are not logged in.{" "}
                <a
                    onClick={() => {
                        showModal(
                            <LoginModal
                                loggedInAs={loggedInAs}
                                setLoggedInAs={setLoggedInAs}
                                close={() => showModal(undefined)}
                            />
                        );
                    }}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                    }
                >
                    Log In
                </a>{" "}
                or{" "}
                <a
                    onClick={() => {
                        showModal(
                            <SignUpModal
                                loggedInAs={loggedInAs}
                                setLoggedInAs={setLoggedInAs}
                                close={() => showModal(undefined)}
                            />
                        );
                    }}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                    }
                >
                    Sign Up
                </a>
                {showingModal || ""}
            </Navbar.Text>
        );
    }

    const name = createRef();

    return (
        <Navbar.Text>
            <a
                href={`/#/account/${loggedInAs.screenName}`}
                style={{
                    color: loggedInAs && loggedInAs.unsafeMode ? "white" : "",
                    fontSize: "1.5em",
                }}
                onMouseOver={() => {
                    name.current.style.textDecoration = "underline";
                }}
                onMouseOut={() => {
                    name.current.style.textDecoration = "none";
                }}
            >
                <div style={{ position: "relative" }}>
                    <span
                        ref={name}
                        style={{
                            position: "absolute",
                            top: "0.25em",
                            right: "3.25em",
                        }}
                    >
                        {loggedInAs.screenName}
                    </span>
                    <img
                        src={
                            loggedInAs.profilePicURL
                                ? loggedInAs.profilePicURL
                                : process.env.PUBLIC_URL +
                                  "/defaultProfilePic.jpg"
                        }
                        onError={(e) => {
                            e.target.src =
                                process.env.PUBLIC_URL +
                                "/defaultProfilePic.jpg";
                        }}
                        style={{
                            position: "absolute",
                            right: "1em",
                            border: "1px solid #bbb",
                            height: "2em",
                            width: "2em",
                            "object-fit": "cover",
                            "border-radius": "50%",
                        }}
                    />
                    {loggedInAs.notifications &&
                    loggedInAs.notifications.filter((notif) => !notif.seen)
                        .length > 0 ? (
                        <div
                            style={{
                                position: "absolute",
                                right: "1.5em",
                                top: "-0.5em",
                                borderRadius: "1em",
                                backgroundColor: "red",
                                width: "2em",
                                height: "2em",
                                lineHeight: "2em",
                                fontSize: "0.5em",
                                color: "white",
                            }}
                        >
                            {
                                loggedInAs.notifications.filter(
                                    (notif) => !notif.seen
                                ).length
                            }
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </a>
            <br></br>
            <p />
            <span className="small text-muted">
                Unsafe Mode:{" "}
                <BootstrapSwitchButton
                    checked={loggedInAs.unsafeMode}
                    onstyle="secondary"
                    size="sm"
                    onChange={(checked) => {
                        if (checked) {
                            showModal(
                                <UnsafeModal
                                    close={() => showModal(undefined)}
                                    loggedInAs={loggedInAs}
                                    onConfirm={() => {
                                        new Cookies().set("unsafeMode", true, {
                                            path: "/",
                                        });
                                        setLoggedInAs({
                                            ...loggedInAs,
                                            unsafeMode: true,
                                        });
                                        showModal(undefined);
                                    }}
                                />
                            );
                        } else {
                            new Cookies().set("unsafeMode", false, {
                                path: "/",
                            });
                            setLoggedInAs({
                                ...loggedInAs,
                                unsafeMode: false,
                            });
                        }
                    }}
                />
                <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-unsafe">
                            Unsafe mode allows you to see all content on
                            Crowdventure, including content that has been
                            flagged as unsafe for the general public!
                        </Tooltip>
                    }
                    placement="bottom"
                >
                    <Button
                        style={{
                            backgroundColor: "#00000000",
                            borderColor: "#00000000",
                            borderRadius: "50%",
                            color: loggedInAs.unsafeMode ? "white" : "black",
                        }}
                        size="xs"
                    >
                        <span className="fa fa-info-circle" />
                    </Button>
                </OverlayTrigger>
            </span>
            {showingModal || ""}
        </Navbar.Text>
    );
};

export default AccountManager;
