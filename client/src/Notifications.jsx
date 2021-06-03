import React, { useState, useEffect, createRef } from "react";
import {
  CardColumns,
  Card,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import { query_call, mutation_call, palette } from "./index";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { SingleFieldSubscriptionsRule } from "graphql";

const Notifications = (props) => {
  const { loggedInAs, setLoggedInAs } = props;

  const [account, setAccount] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);
  const refs = [];
  const seenBtns = [];
  const topText = createRef();

  const cookies = new Cookies();
  if (!loggedInAs && cookies.get("account").length === 0)
    return <Redirect to="/" />;

  useEffect(() => {
    if (!account) {
      query_call(
        "getAccount",
        {
          screenName: loggedInAs
            ? loggedInAs.screenName
            : cookies.get("account"),
        },
        {
          screenName: 0,
          notifications: {
            time: 0,
            seen: 0,
            content: 0,
            link: 0,
          },
        },
        (res) => {
          setAccount(res);
          if (loggedInAs) {
            loggedInAs.notifications = res.notifications;
            setLoggedInAs({ ...loggedInAs });
          }
        }
      );
    }
  });

  if (!account || !loggedInAs)
    return (
      <Alert variant={loggedInAs && loggedInAs.unsafeMode ? "dark" : "light"}>
        <Alert.Heading>Loading Page...</Alert.Heading>
      </Alert>
    );

  const unseen = account.notifications
    ? account.notifications.filter((notif) => !notif.seen)
    : [];

  return (
    <div style={{ marginBottom: "3em" }}>
      <title>Notifications for {loggedInAs.screenName}</title>
      <span ref={topText}>
        You have {unseen.length} new notification
        {unseen.length !== 1 ? "s" : ""}
        {unseen.length ? "!" : "."}
      </span>
      <p />
      {account.notifications
        ? account.notifications.map((notification, idx) => {
            refs.push(createRef());
            seenBtns.push(createRef());
            return (
              <>
                <div
                  ref={refs[idx]}
                  style={{
                    width: "100%",
                    position: "relative",
                    backgroundColor: !loggedInAs.unsafeMode
                      ? "white"
                      : palette[4],
                    height: "4em",
                    borderRadius: "1em",
                    boxShadow: `0 0 3px ${palette[0]}`,
                    padding: "1em",
                    cursor: "pointer",
                    "-webkit-touch-callout": "none" /* iOS Safari */,
                    "-webkit-user-select": "none" /* Safari */,
                    "-khtml-user-select": "none" /* Konqueror HTML */,
                    "-moz-user-select": "none" /* Old versions of Firefox */,
                    "-ms-user-select": "none" /* Internet Explorer/Edge */,
                    "user-select":
                      "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
                  }}
                  onMouseOver={(e) => {
                    refs[idx].current.style.boxShadow = `0 0 6px ${palette[2]}`;
                  }}
                  onMouseOut={(e) => {
                    refs[idx].current.style.boxShadow = `0 0 3px ${palette[0]}`;
                  }}
                  onClick={(e) => {
                    if (
                      e.target !== seenBtns[idx].current &&
                      e.target.className !== "fa fa-times"
                    ) {
                      notification.seen = true;
                      mutation_call(
                        "seeNotification",
                        {
                          accountScreenName: account.screenName,
                          index: idx,
                          force: true,
                        },
                        {},
                        (res) => {
                          setAccount({ ...account });
                          loggedInAs.notifications = account.notifications;
                          setLoggedInAs({ ...loggedInAs });
                          if (notification.link)
                            setRedirect(<Redirect to={notification.link} />);
                        }
                      );
                    }
                  }}
                >
                  <div
                    style={{
                      width: "1.25em",
                      height: "1.25em",
                      position: "absolute",
                      left: "0.16em",
                      top: "0.16em",
                      fontSize: "2.5em",
                      lineHeight: "calc(50% + 0.8em)",
                      backgroundColor: notification.seen
                        ? "lightgrey"
                        : palette[0],
                      color: notification.seen ? "grey" : "white",
                      borderRadius: "50%",
                      textAlign: "center",
                    }}
                    onMouseOver={(e) => {
                      seenBtns[
                        idx
                      ].current.style.backgroundColor = notification.seen
                        ? "silver"
                        : palette[2];
                    }}
                    onMouseOut={(e) => {
                      seenBtns[
                        idx
                      ].current.style.backgroundColor = notification.seen
                        ? "lightgrey"
                        : palette[0];
                    }}
                    onMouseDown={(e) => {
                      seenBtns[
                        idx
                      ].current.style.backgroundColor = notification.seen
                        ? "darkgray"
                        : palette[6];
                    }}
                    onMouseUp={(e) => {
                      seenBtns[
                        idx
                      ].current.style.backgroundColor = notification.seen
                        ? "silver"
                        : palette[2];
                    }}
                    onClick={(e) => {
                      if (e.target === seenBtns[idx].current) {
                        notification.seen = !notification.seen;
                        mutation_call(
                          "seeNotification",
                          {
                            accountScreenName: account.screenName,
                            index: idx,
                          },
                          {},
                          (res) => {
                            setAccount({ ...account });
                            loggedInAs.notifications = account.notifications;
                            setLoggedInAs({ ...loggedInAs });
                          }
                        );
                      }
                    }}
                    ref={seenBtns[idx]}
                    class="fa fa-exclamation"
                  ></div>{" "}
                  <div
                    style={{
                      width: "calc(100% - 4em)",
                      position: "absolute",
                      left: "4em",
                      lineHeight: "calc(50% + 1em)",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "-0.25em",
                      }}
                    >
                      {notification.content}
                    </span>

                    <span
                      class="text-muted"
                      style={{
                        position: "absolute",
                        top: "1.5em",
                        fontSize: "0.75em",
                      }}
                    >
                      {new Date(notification.time).toLocaleString()}
                    </span>
                  </div>
                  <span
                    class="fa fa-times"
                    style={{
                      position: "absolute",
                      top: "1.5em",
                      right: "1.5em",
                      color: "#888",
                      cursor: "pointer",
                      textShadow:
                        "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#555")}
                    onMouseLeave={(e) => (e.target.style.color = "#888")}
                    onClick={() => {
                      mutation_call(
                        "removeNotification",
                        {
                          accountScreenName: account.screenName,
                          index: idx,
                        },
                        {},
                        (res) => {
                          const newNotifs = account.notifications.filter(
                            (notif, i) => i !== idx
                          );
                          setAccount({
                            ...account,
                            notifications: newNotifs,
                          });

                          loggedInAs.notifications = newNotifs;
                          setLoggedInAs({ ...loggedInAs });
                        }
                      );
                    }}
                  />
                </div>
                <p />
              </>
            );
          })
        : ""}

      <Button
        className="float-right"
        onClick={() => {
          setRedirect(<Redirect to={`/account/${account.screenName}`} />);
        }}
        style={{
          border: `1px solid ${palette[2]}`,
          backgroundColor: palette[0],
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
        onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
      >
        Back to account &gt;
      </Button>
      {redirect || ""}
    </div>
  );
};

export default Notifications;
