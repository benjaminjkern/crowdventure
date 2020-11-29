import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";

import LoginModal from "./Modals/LoginModal";
import SignUpModal from "./Modals/SignUpModal";

const AccountManager = (props) => {
  const { loggedInAs, setLoggedInAs } = props;
  const [showingModal, showModal] = useState(undefined);

  if (loggedInAs === undefined || loggedInAs === null) {
    return (
      <Navbar.Text>
        You are not logged in.{" "}
        <Button
          variant="light"
          onClick={() => {
            showModal(
              <LoginModal
                loggedInAs={loggedInAs}
                setLoggedInAs={setLoggedInAs}
                close={() => showModal(undefined)}
              />
            );
          }}
          size="sm"
        >
          Log In
        </Button>{" "}
        or{" "}
        <Button
          variant="light"
          onClick={() => {
            showModal(
              <SignUpModal
                loggedInAs={loggedInAs}
                setLoggedInAs={setLoggedInAs}
                close={() => showModal(undefined)}
              />
            );
          }}
          size="sm"
        >
          Sign Up
        </Button>
        {showingModal || ""}
      </Navbar.Text>
    );
  }

  return (
    <Navbar.Text
      style={{ color: loggedInAs && loggedInAs.unsafeMode ? "grey" : "" }}
    >
      You are logged in as:{" "}
      <a
        href={`/crowdventure/#/account/${loggedInAs.screenName}`}
        style={{ color: loggedInAs && loggedInAs.unsafeMode ? "white" : "" }}
      >
        <img
          src={
            loggedInAs.profilePicURL
              ? loggedInAs.profilePicURL
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
        {loggedInAs.screenName}
      </a>
    </Navbar.Text>
  );
};

export default AccountManager;
