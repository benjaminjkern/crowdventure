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

const palette = [
  "rgb(100, 180, 244)",
  "rgb(158, 232, 255)",
  "rgb(90, 170, 234)",
];

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export { app_fetch, escape, palette };
