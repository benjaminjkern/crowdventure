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

  async mutate(queries) {
    return Promise.all(
      queries.map((query) => {
        return app_fetch({
          query: `mutation{${query}}`,
        }).then((res) => res.data);
      })
    );
  }
}

export default CallableComponent;
