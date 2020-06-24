import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: "https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql",
});

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export default app_fetch;
