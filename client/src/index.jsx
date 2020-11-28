import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: require("./apolloURL.js").backendURL,
});

const query_call = (query, parameters, attributes, callback) => {
  app_fetch({
    query: `query{${query}${formatParameters(parameters)}${formatAttributes(
      attributes
    )}}`,
  }).then((res, err) => {
    if (err) alert(err);
    if (res.data) callback(res.data[query]);
    else alert("Something went wrong when calling query");
  });
};

const mutation_call = (query, parameters, attributes, callback) => {
  app_fetch({
    query: `mutation{${query}${formatParameters(parameters)}${formatAttributes(
      attributes
    )}}`,
  }).then((res, err) => {
    if (err) alert(err);
    if (res.data) callback(res.data[query]);
    else alert("Something went wrong when calling mutation");
  });
};

const formatParameters = (parameters) =>
  Object.keys(parameters).length > 0
    ? `(${Object.keys(parameters)
        .map(
          (param) =>
            `${param}:${typeof parameters[param] === "string" ? '"' : ""}${
              parameters[param]
            }${typeof parameters[param] === "string" ? '"' : ""}`
        )
        .join(",")})`
    : "";

const formatAttributes = (attributes) =>
  Object.keys(attributes).length > 0
    ? `{${Object.keys(attributes)
        .map((attribute) => attribute + formatAttributes(attributes[attribute]))
        .join(",")}}`
    : "";

const escape = (text, newlines = false) =>
  text
    ? newlines
      ? text.replace(/"$/, ' " ').replace(/^"/, ' " ').replace(/"""/g, ` "" " `)
      : text.replace(/\n/g, "").replace(/\\/g, `\\\\`).replace(/"/g, `\\"`)
    : text;

const palette = [
  "rgb(100, 180, 244)",
  "rgb(158, 232, 255)",
  "rgb(80, 160, 224)",
];

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export { app_fetch, escape, palette, query_call, mutation_call };
