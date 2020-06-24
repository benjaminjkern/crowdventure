import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardColumns,
  CardDeck,
  CardGroup,
} from "react-bootstrap";

import app_fetch from "./index";

const Home = () => {
  const [topNodes, setTopNodes] = useState(undefined);
  const [topAccounts, setTopAccounts] = useState(undefined);

  useEffect(() => {
    app_fetch({
      query: `query{allNodes{ID,title,owner{screenName},views}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.allNodes) setTopNodes(res.data.allNodes);
      else alert("Something went wrong when retrieving nodes");
    });

    app_fetch({
      query: `query{allAccounts{screenName,totalNodeViews,totalSuggestionScore}}`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data && res.data.allAccounts)
        setTopAccounts(res.data.allAccounts);
      else alert("Something went wrong when retrieving accounts");
    });
  }, []);
  return (
    <Container>
      <h1>Welcome!</h1>
      <Container>
        Crowdventure is a Crowd-Sourced Choose/Create-Your-Own-Adventure-Game!
      </Container>
      <p />
      <h3>Featured Pages:</h3>
      {topNodes ? (
        <CardColumns>
          {topNodes.slice(0, 1).map((node) => (
            <Card>
              <a href={`/crowdventure/#/node/${node.ID}`}>
                <Card.Body>
                  <Card.Title>{node.title}</Card.Title>
                </Card.Body>
              </a>
              <Card.Footer>
                Created by:{" "}
                <a href={`/crowdventure/#/account/${node.owner.screenName}`}>
                  {node.owner.screenName}
                </a>
                <br />
                Views:{" " + node.views}
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ) : (
        ""
      )}
      <h3>Featured Accounts:</h3>
      {topAccounts ? (
        <CardColumns>
          {topAccounts.map((account) => (
            <Card>
              <a href={`/crowdventure/#/account/${account.screenName}`}>
                <Card.Body>
                  <Card.Title>{account.screenName}</Card.Title>
                </Card.Body>
              </a>
              <Card.Footer>
                Total Views:{account.totalNodeViews}
                <br />
                Total Score:{account.totalSuggestionScore}
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Home;
