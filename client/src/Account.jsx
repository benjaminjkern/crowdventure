import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import {
  Container,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { escape, query_call, palette } from "./index";
import CreateNodeModal from "./Modals/CreateNodeModal";
import EditAccountModal from "./Modals/EditAccountModal";
import PictureModal from "./Modals/PictureModal";

import NodeViewer from "./NodeViewer";

import { Redirect } from "react-router-dom";

const Account = (props) => {
  const { loggedInAs, setLoggedInAs } = props;

  const [redirect, setRedirect] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [showingModal, showModal] = useState(undefined);

  useEffect(() => {
    const pageID = escape(props.match.params.id);
    if (!account || pageID !== account.screenName) {
      query_call(
        "getAccount",
        { screenName: pageID },
        {
          bio: 0,
          screenName: 0,
          profilePicURL: 0,
          totalNodeViews: 0,
          totalSuggestionScore: 0,
          nodes: {
            owner: { screenName: 0, profilePicURL: 0 },
            featured: 0,
            hidden: 0,
            ID: 0,
            title: 0,
            views: 0,
            pictureURL: 0,
          },
        },
        (res) => setAccount(res)
      );
    }
  });

  if (account === undefined) {
    return (
      <Alert variant={loggedInAs && loggedInAs.unsafeMode ? "dark" : "light"}>
        <title>Loading Account...</title>
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );
  }

  if (account === null)
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You ran into an error</Alert.Heading>
        <p>
          This page does not exist, or maybe our database is down. Who knows?
          Not you. Hahahaha
        </p>
      </Alert>
    );

  return (
    <Container>
      <title>{account.screenName} on Crowdventure!</title>

      <h1>
        <img
          src={
            account.profilePicURL
              ? account.profilePicURL
              : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
          }
          alt={account.screenName + " Profile Pic"}
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
          }}
          style={{
            border: "1px solid #bbb",
            height: "3em",
            width: "3em",
            "object-fit": "cover",
            "border-radius": "50%",
            "margin-right": "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            showModal(
              <PictureModal
                loggedInAs={loggedInAs}
                title={account.screenName}
                pictureURL={account.profilePicURL}
                close={() => showModal(undefined)}
              />
            );
          }}
        />{" "}
        <span className="display-4 align-middle">{account.screenName}</span>
      </h1>

      {account.bio ||
      (loggedInAs && loggedInAs.screenName === account.screenName) ? (
        <Container>
          {account.bio.split("\n").map((line) => (
            <p style={{ textIndent: "5%" }}>{line}</p>
          ))}
          {loggedInAs && loggedInAs.screenName === account.screenName ? (
            <p style={{ textIndent: "1%" }} class="text-muted">
              Unsafe Mode:{" "}
              <BootstrapSwitchButton
                checked={loggedInAs.unsafeMode}
                onstyle="secondary"
                size="sm"
                onChange={(checked) => {
                  new Cookies().set("unsafeMode", checked, {
                    path: "/",
                  });
                  setLoggedInAs({
                    ...loggedInAs,
                    unsafeMode: checked,
                  });
                }}
              />
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-unsafe">
                    Unsafe mode allows you to see all content on Crowdventure,
                    including content that has been flagged as unsafe for the
                    general public!
                  </Tooltip>
                }
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
            </p>
          ) : (
            ""
          )}
        </Container>
      ) : (
        ""
      )}

      <Container>
        {loggedInAs && loggedInAs.screenName === account.screenName ? (
          <span>
            <Button
              variant="secondary"
              onClick={() => {
                showModal(
                  <EditAccountModal
                    loggedInAs={loggedInAs}
                    screenName={account.screenName}
                    bio={account.bio}
                    profilePicture={account.profilePicURL}
                    setAccount={setAccount}
                    setRedirect={setRedirect}
                    close={() => showModal(undefined)}
                  />
                );
              }}
              size="sm"
            >
              Edit Account
            </Button>{" "}
            <Button
              size="sm"
              onClick={() => {
                new Cookies().set("account", "", { path: "/" });
                new Cookies().set("unsafeMode", "false", { path: "/" });
                window.location.reload(false);
              }}
              variant="secondary"
            >
              Log out
            </Button>{" "}
          </span>
        ) : (
          ""
        )}
        <div style={{ float: "right" }} class="text-muted">
          Total views: {account.totalNodeViews} Total score:{" "}
          {account.totalSuggestionScore}
        </div>
      </Container>
      <br />

      {loggedInAs && loggedInAs.screenName === account.screenName ? (
        <Button
          onClick={() => {
            showModal(
              <CreateNodeModal
                close={() => showModal(undefined)}
                loggedInAs={loggedInAs}
                featured={true}
                callback={(res) =>
                  setRedirect(<Redirect to={`/node/${res.ID}`} />)
                }
              />
            );
          }}
          style={{
            width: "100%",
            border: `1px solid ${palette[2]}`,
            backgroundColor: palette[0],
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
        >
          Create a New Adventure!
        </Button>
      ) : (
        ""
      )}

      <p />

      <h3>Featured Pages:</h3>
      <NodeViewer nodes={account.nodes} loggedInAs={loggedInAs} />

      {showingModal || ""}
      {redirect || ""}
    </Container>
  );
};

export default Account;
