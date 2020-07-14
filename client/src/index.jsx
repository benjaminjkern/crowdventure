import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: require("./apolloURL.js"),
});

const escape = (text, newlines = false) =>
  text
    ? newlines
      ? text.replace(/"""/g, ` "" " `)
      : text.replace(/\n/g, "").replace(/\\/g, `\\\\`).replace(/"/g, `\\"`)
    : text;

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export { app_fetch, escape };
