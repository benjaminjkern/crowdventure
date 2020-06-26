import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: require("./apolloURL.js"),
});

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export default app_fetch;
