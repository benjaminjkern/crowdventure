import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import {
  Container,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { escape, query_call, palette, mutation_call } from "./index";
import CreateNodeModal from "./Modals/CreateNodeModal";
import EditAccountModal from "./Modals/EditAccountModal";
import PictureModal from "./Modals/PictureModal";
import UnsafeModal from "./Modals/UnsafeModal";

import NodeViewer from "./NodeViewer";

import { Redirect } from "react-router-dom";

const Account = (props) => {
  const { loggedInAs, setLoggedInAs, match } = props;

  const [redirect, setRedirect] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [showingModal, showModal] = useState(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedNodes, setSearchedNodes] = useState([]);

  const reportAccount = () => {
    if (account)
      mutation_call(
        "createFeedback",
        {
          ...(loggedInAs ? { accountScreenName: loggedInAs.screenName } : {}),
          info: "This is inappropriate",
          reportingObjectType: "Account",
          reportingObjectID: account.screenName,
        },
        { info: 0, reporting: 0 },
        () => {
          alert("Successfully reported account!");
          window.location.reload(false);
        }
      );
  };

  useEffect(() => {
    const pageID = escape(match.params.id);
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
          hidden: 0,
          isAdmin: 0,
          featuredNodes: {
            owner: { screenName: 0, profilePicURL: 0 },
            featured: 0,
            hidden: 0,
            ID: 0,
            title: 0,
            views: 0,
            pictureURL: 0,
            pictureUnsafe: 0,
          },
          nodes: {
            owner: { screenName: 0, profilePicURL: 0 },
            featured: 0,
            hidden: 0,
            ID: 0,
            title: 0,
            content: 0,
            views: 0,
            pictureURL: 0,
            pictureUnsafe: 0,
          },
        },
        (res) => {
          setAccount(res);
          setSearchQuery("");
          setSearchedNodes([]);
        }
      );
    }
  });

  if (account === undefined) {
    return (
      <Alert
        variant={
          (loggedInAs && loggedInAs.unsafeMode) ||
          new Cookies().get("unsafeMode") === "true"
            ? "dark"
            : "light"
        }
      >
        <title>Loading Account...</title>
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );
  }

  if (account === null)
    return (
      <Alert variant="danger">
        <title>Error! Account: {match.params.id}</title>
        <Alert.Heading>Oh snap! You ran into an error</Alert.Heading>
        <p>
          This page does not exist, or maybe our database is down. Who knows?
          Not you. Hahahaha
        </p>
      </Alert>
    );

  if (
    account.hidden &&
    (!loggedInAs ||
      (account.screenName !== loggedInAs.screenName && !loggedInAs.unsafeMode))
  )
    return (
      <Alert variant="danger">
        <title>{account.screenName} on Crowdventure!</title>
        <Alert.Heading>Unsafe!</Alert.Heading>
        <p>
          This page has been hidden from general users, because the content has
          been deemed unsafe. If you would like to see it, log in and turn on{" "}
          <b>Unsafe mode</b>!
        </p>
      </Alert>
    );

  return (
    <Container>
      <title>{account.screenName} on Crowdventure!</title>
      {account.hidden &&
      loggedInAs &&
      account.screenName === loggedInAs.screenName &&
      !loggedInAs.unsafeMode ? (
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            setAccount({ ...node, hidden: false });
          }}
        >
          <Alert.Heading>Unsafe!</Alert.Heading>
          <p>
            This page has been hidden from general users, because the content
            has been deemed unsafe. Users in unsafe mode can see this page and
            its content. Since you own this page, you can see it. If you believe
            this page should be considered safe, click <a href="">Here</a>.
          </p>
        </Alert>
      ) : (
        ""
      )}

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
                pictureURL={
                  account.profilePicURL
                    ? account.profilePicURL
                    : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
                }
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
          {account.bio
            ? account.bio
                .split("\n")
                .map((line) => <p style={{ textIndent: "5%" }}>{line}</p>)
            : ""}
          {loggedInAs && loggedInAs.screenName === account.screenName ? (
            <p style={{ textIndent: "1%" }} class="text-muted">
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
        {loggedInAs &&
        (loggedInAs.screenName === account.screenName || loggedInAs.isAdmin) ? (
          <Button
            variant="secondary"
            onClick={() => {
              showModal(
                <EditAccountModal
                  account={account}
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
          </Button>
        ) : (
          ""
        )}{" "}
        {loggedInAs && loggedInAs.screenName === account.screenName ? (
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
          </Button>
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
      <NodeViewer nodes={account.featuredNodes} loggedInAs={loggedInAs} />
      <h3>Search All Pages Authored by {account.screenName}:</h3>
      <Form>
        <Form.Control
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[5], color: "white" } }
            : {})}
          value={searchQuery}
          placeholder={"Search for a page..."}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length >= 2) {
              setSearchedNodes([
                ...account.nodes.filter((node) =>
                  node.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                ),
                ...account.nodes.filter(
                  (node) =>
                    !node.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) &&
                    node.content
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                ),
              ]);
            } else {
              setSearchedNodes([]);
            }
          }}
        />
      </Form>
      {searchQuery ? (
        <NodeViewer nodes={searchedNodes} loggedInAs={loggedInAs} />
      ) : (
        ""
      )}

      <Container>
        <Button
          style={{ marginRight: "0", marginLeft: "auto", display: "block" }}
          variant="danger"
          size="sm"
          onClick={reportAccount}
        >
          Report Account
        </Button>
      </Container>

      {showingModal || ""}
      {redirect || ""}
    </Container>
  );
};

export default Account;
