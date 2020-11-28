import { useState, useEffect } from "react";

import {
  CardColumns,
  Card,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";

import EditChoiceModal from "../Modals/EditChoiceModal";

import { mutation_call, query_call } from "../index";

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
      <Alert variant="light">
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
              <Card className="text-center">
                <Card.Body style={{ paddingTop: "2em" }}>
                  <Card.Title>Loading...</Card.Title>
                </Card.Body>
              </Card>
            );
          return (
            <Card className="text-center">
              <a
                href={choice.to ? `/crowdventure/#/node/${choice.to.ID}` : ""}
                style={{
                  pointerEvents: choice.to ? "auto" : "none",
                  color: choice.to ? undefined : "grey",
                }}
              >
                <Card.Body style={{ cursor: "pointer", paddingTop: "2em" }}>
                  <Card.Title>{choice.action}</Card.Title>
                </Card.Body>
              </a>
              <DropdownButton
                variant="light"
                style={{ position: "absolute", top: "0px", right: "0px" }}
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
                <Dropdown.Item disabled>Report</Dropdown.Item>
              </DropdownButton>
              <Card.Footer>
                <a
                  href={`/crowdventure/#/node/${node.ID}`}
                  style={{
                    pointerEvents: loggedInAs ? "auto" : "none",
                    color: loggedInAs
                      ? choice.disliked
                        ? "red"
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
