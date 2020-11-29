import React, { useState, useEffect } from "react";

import {
  CardColumns,
  Card,
  DropdownButton,
  Dropdown,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import Cookies from "universal-cookie";
import EditChoiceModal from "../Modals/EditChoiceModal";

import { mutation_call, query_call, palette } from "../index";

const ChoiceColumns = (props) => {
  const { node, loggedInAs, canon } = props;

  const [choices, setChoices] = useState(
    (canon ? node.canonChoices : node.nonCanonChoices).map(() => null)
  );

  const [showingModal, showModal] = useState(undefined);

  const like = (idx) => {
    if (loggedInAs) {
      const choice = choices[idx];

      if (choice.liked) {
        choice.liked = false;
        choice.score--;
      } else {
        choice.liked = true;
        choice.score++;
        if (choice.disliked) choice.score++;
      }
      choice.disliked = false;
      setChoices([
        ...choices.slice(0, idx),
        choice,
        ...choices.slice(idx + 1, choices.length),
      ]);

      mutation_call(
        "likeSuggestion",
        { accountScreenName: loggedInAs.screenName, choiceID: choice.ID },
        { ID: 0 },
        () => {}
      );
    }
  };

  const dislike = (idx) => {
    if (loggedInAs) {
      const choice = choices[idx];

      if (choice.disliked) {
        choice.disliked = false;
        choice.score++;
      } else {
        choice.disliked = true;
        choice.score--;
        if (choice.liked) choice.score--;
      }
      choice.liked = false;
      setChoices([
        ...choices.slice(0, idx),
        choice,
        ...choices.slice(idx + 1, choices.length),
      ]);

      mutation_call(
        "dislikeSuggestion",
        { accountScreenName: loggedInAs.screenName, choiceID: choice.ID },
        { ID: 0 },
        () => {}
      );
    }
  };

  const makeCanon = (choiceID) => {
    mutation_call("makeCanon", { choiceID: choiceID }, { ID: 0 }, () =>
      setTimeout(() => window.location.reload(false), 100)
    );
  };

  const makeNonCanon = (choiceID) => {
    mutation_call("makeNonCanon", { choiceID: choiceID }, { ID: 0 }, () =>
      setTimeout(() => window.location.reload(false), 100)
    );
  };

  const removeSuggestion = (choiceID) => {
    mutation_call("removeSuggestion", { choiceID: choiceID }, {}, () =>
      window.location.reload(false)
    );
  };

  const reportSuggestion = (choiceID) => {
    mutation_call(
      "createFeedback",
      {
        ...(loggedInAs ? { accountScreenName: loggedInAs.screenName } : {}),
        info: "This is inappropriate",
        reportingObjectType: "Choice",
        reportingObjectID: choiceID,
      },
      { info: 0, reporting: 0 },
      () => {
        alert("Successfully reported action!");
        window.location.reload(false);
      }
    );
  };

  useEffect(() => {
    if (
      choices.length !==
        (canon ? node.canonChoices : node.nonCanonChoices).length ||
      choices.some(
        (choice, i) =>
          choice !== null &&
          choice.ID !== (canon ? node.canonChoices : node.nonCanonChoices)[i].ID
      )
    )
      setChoices(
        (canon ? node.canonChoices : node.nonCanonChoices).map(() => null)
      );

    if (choices.some((choice) => choice === null)) {
      (canon ? node.canonChoices : node.nonCanonChoices).forEach(
        (choiceID, i) => {
          if (choices[i] !== null) return;

          query_call(
            "getChoice",
            { ID: choiceID.ID },
            {
              ID: 0,
              action: 0,
              likedBy: { screenName: 0 },
              dislikedBy: { screenName: 0 },
              score: 0,
              suggestedBy: {
                screenName: 0,
                profilePicURL: 0,
              },
              hidden: 0,
              to: {
                owner: {
                  screenName: 0,
                },
                ID: 0,
                hidden: 0,
              },
              from: {
                ID: 0,
              },
            },
            (choice) => {
              choice.liked =
                loggedInAs &&
                choice.likedBy.some(
                  (account) => account.screenName === loggedInAs.screenName
                );
              choice.disliked =
                loggedInAs &&
                choice.dislikedBy.some(
                  (account) => account.screenName === loggedInAs.screenName
                );
              setChoices([
                ...choices.slice(0, i),
                choice,
                ...choices.slice(i + 1, choices.length),
              ]);
            }
          );
        }
      );
    }
  });

  if (!choices)
    return (
      <Alert
        variant={
          (loggedInAs && loggedInAs.unsafeMode) ||
          new Cookies().get("unsafeMode") === "true"
            ? "dark"
            : "light"
        }
      >
        <title>Loading Page...</title>
        <Alert.Heading>Loading...</Alert.Heading>
      </Alert>
    );

  if (choices.length > 0)
    return (
      <CardColumns>
        {choices.map((choice, idx) => {
          if (choice === null)
            return (
              <Card
                className="text-center"
                {...(loggedInAs && loggedInAs.unsafeMode
                  ? { style: { backgroundColor: palette[4] } }
                  : {})}
              >
                <Card.Body style={{ paddingTop: "2em" }}>
                  <Card.Title>Loading...</Card.Title>
                </Card.Body>
              </Card>
            );

          if (
            (choice.hidden && !loggedInAs) ||
            (choice.hidden &&
              !loggedInAs.unsafeMode &&
              loggedInAs.screenName !== choice.suggestedBy.screenName &&
              (loggedInAs.screenName !== node.owner.screenName || !canon))
          )
            return <span />;

          const disabled =
            !choice.to ||
            (choice.to.hidden && !loggedInAs) ||
            (choice.to.hidden &&
              !loggedInAs.unsafeMode &&
              choice.to.owner.screenName !== loggedInAs.screenName);

          return (
            <Card
              className="text-center"
              {...(loggedInAs && loggedInAs.unsafeMode
                ? { style: { backgroundColor: palette[4] } }
                : {})}
            >
              <a
                href={!disabled ? `/crowdventure/#/node/${choice.to.ID}` : ""}
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
                style={{
                  pointerEvents: !disabled ? "auto" : "none",
                  color: !disabled
                    ? loggedInAs && loggedInAs.unsafeMode
                      ? palette[0]
                      : palette[2]
                    : "grey",
                }}
              >
                <Card.Body style={{ cursor: "pointer", paddingTop: "2em" }}>
                  <Card.Title>{choice.action}</Card.Title>
                </Card.Body>
              </a>
              {choice.hidden ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      This action is hidden, because it has been marked as
                      unsafe! You can see it because you are{" "}
                      {loggedInAs && loggedInAs.unsafeMode
                        ? "in Unsafe Mode."
                        : "the owner."}
                    </Tooltip>
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "6.5px",
                      color: "red",
                      "-webkit-touch-callout": "none",
                      "-webkit-user-select": "none",
                      "-khtml-user-select": "none",
                      "-moz-user-select": "none",
                      "-ms-user-select": "none",
                      "user-select": "none",
                      "text-shadow": "0 0 1px black",
                    }}
                    class="fa"
                  >
                    &#xf056;
                  </div>
                </OverlayTrigger>
              ) : (
                ""
              )}
              {!choice.hidden && choice.to.hidden && !disabled ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      This page this action leads to is hidden, because it has
                      been marked as unsafe! You will be able to see it because
                      you are
                      {loggedInAs && loggedInAs.unsafeMode
                        ? "in Unsafe Mode."
                        : "the owner."}
                    </Tooltip>
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "6.5px",
                      color: "red",
                      "-webkit-touch-callout": "none",
                      "-webkit-user-select": "none",
                      "-khtml-user-select": "none",
                      "-moz-user-select": "none",
                      "-ms-user-select": "none",
                      "user-select": "none",
                      "text-shadow": "0 0 1px black",
                    }}
                    class="fa"
                  >
                    &#xf056;
                  </div>
                </OverlayTrigger>
              ) : (
                ""
              )}
              <DropdownButton
                variant={
                  loggedInAs && loggedInAs.unsafeMode ? "secondary" : "light"
                }
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                }}
                size="sm"
                drop="right"
                title={<span class="fa">&#xf013;</span>}
              >
                <Dropdown.Item
                  disabled={
                    !loggedInAs ||
                    loggedInAs.screenName !== node.owner.screenName
                  }
                  onClick={() =>
                    canon ? makeNonCanon(choice.ID) : makeCanon(choice.ID)
                  }
                >
                  Make {canon ? "Nonc" : "C"}anon
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={
                    !loggedInAs ||
                    (loggedInAs.screenName !== choice.suggestedBy.screenName &&
                      loggedInAs.screenName !== node.owner.screenName)
                  }
                  onClick={() => removeSuggestion(choice.ID)}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    showModal(
                      <EditChoiceModal
                        choice={choice}
                        loggedInAs={loggedInAs}
                        fromNode={node}
                        close={() => showModal(undefined)}
                      />
                    )
                  }
                  disabled={
                    !(
                      loggedInAs &&
                      ((canon &&
                        loggedInAs.screenName === node.owner.screenName) ||
                        (!canon &&
                          loggedInAs.screenName ===
                            choice.suggestedBy.screenName))
                    )
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => reportSuggestion(choice.ID)}>
                  Report
                </Dropdown.Item>
              </DropdownButton>
              <Card.Footer
                {...(loggedInAs && loggedInAs.unsafeMode
                  ? { style: { backgroundColor: palette[5] } }
                  : {})}
              >
                <a
                  href={`/crowdventure/#/node/${node.ID}`}
                  style={{
                    pointerEvents: loggedInAs ? "auto" : "none",
                    color: loggedInAs
                      ? choice.disliked
                        ? "red"
                        : loggedInAs.unsafeMode
                        ? "white"
                        : "black"
                      : "grey",
                  }}
                  className="fa fa-thumbs-down"
                  onClick={() => dislike(idx)}
                ></a>
                {" " + (choice.score || 0) + " "}
                <a
                  href={`/crowdventure/#/node/${node.ID}`}
                  style={{
                    pointerEvents: loggedInAs ? "auto" : "none",
                    color: loggedInAs
                      ? choice.liked
                        ? "green"
                        : loggedInAs.unsafeMode
                        ? "white"
                        : "black"
                      : "grey",
                  }}
                  className="fa fa-thumbs-up"
                  onClick={() => like(idx)}
                ></a>
                <br />
                <small className="text-muted">
                  Suggested By:{" "}
                  <a
                    href={`/crowdventure/#/account/${choice.suggestedBy.screenName}`}
                    style={{
                      color:
                        loggedInAs && loggedInAs.unsafeMode
                          ? palette[0]
                          : palette[2],
                    }}
                  >
                    <img
                      src={
                        choice.suggestedBy.profilePicURL
                          ? choice.suggestedBy.profilePicURL
                          : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
                      }
                      onError={(e) => {
                        e.target.src =
                          process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
                      }}
                      style={{
                        border: "1px solid #bbb",
                        height: "2em",
                        width: "2em",
                        "object-fit": "cover",
                        "border-radius": "50%",
                      }}
                    />{" "}
                    {choice.suggestedBy.screenName}
                  </a>
                </small>
              </Card.Footer>
            </Card>
          );
        })}
        {showingModal || ""}
      </CardColumns>
    );

  return null;
};

export default ChoiceColumns;
