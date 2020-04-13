import React from "react";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: "http://localhost:4000",
});

class CallableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadRender(name, queries, renderFunc) {
    for (let id in queries) {
      let method = queries[id].match(/^\w+(?=\(|\{)/);
      switch (this.state[method]) {
        case null:
          return <span>Couldn't find {name}</span>;
        case undefined:
          app_fetch({
            query: `query{${queries[id]}}`,
          }).then((res, err) => {
            if (err) throw new Error(err);
            this.setState({
              [method]: res.data ? res.data[method] : null,
            });
          });
          return <span>Loading {name}...</span>;
        default:
          continue;
      }
    }
    return renderFunc();
  }

  mutate(queries) {
    for (let id in queries) {
      app_fetch({
        query: `mutation{${queries[id]}}`,
      }).then((res, err) => {
        if (err) throw new Error(err);
        // I dont think I need to do anything else cuz these are async
      });
    }
  }
}

export default CallableComponent;
