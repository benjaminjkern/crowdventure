import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: require("./apolloURL.js").backendURL,
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
  "rgb(80, 160, 224)",
];

const SearchImage = (props) => {
  const { callback } = props;
  const { API_KEY } = require("./apolloURL.js");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(
      "https://pixabay.com/api/?key=" +
        API_KEY +
        "&q=" +
        encodeURIComponent(query) +
        "&page=" +
        (query !== lastQuery ? 1 : page)
    )
      .then((data) => data.json())
      .then(({ hits }) => {
        const newOptions = hits.reduce(
          (p, hit, i) =>
            (i + options.length) % 2 == 0
              ? [
                  ...p,
                  {
                    id: "(Image Selected)",
                    urls: [hit.previewURL],
                    longUrls: [hit.largeImageURL],
                  },
                ]
              : [
                  ...p.slice(0, p.length - 1),
                  {
                    id: "(Image Selected)",
                    urls: [p[p.length - 1].urls[0], hit.previewURL],
                    longUrls: [p[p.length - 1].longUrls[0], hit.largeImageURL],
                  },
                ],
          query !== lastQuery ? [] : options
        );
        setOptions(newOptions);

        if (query !== lastQuery) {
          setPage(2);
        } else {
          setPage(page + 1);
        }
        setLastQuery(query);
        setIsLoading(false);
      })
      .catch(alert);
  };

  return (
    <AsyncTypeahead
      id="async-example"
      isLoading={isLoading}
      filterBy={() => true}
      labelKey="id"
      minLength={2}
      onSearch={handleSearch}
      maxResults={9}
      onPaginate={() => handleSearch(lastQuery)}
      useCache={false}
      options={options}
      placeholder="Search for an image..."
      renderMenuItemChildren={(option, props) => (
        <div>
          <img
            onClick={() => callback(option.longUrls[0])}
            src={option.urls[0]}
            style={{
              marginRight: "10px",
              borderRadius: "4px",
              width: "50%",
              height: "auto",
            }}
          />
          {option.urls.length === 2 ? (
            <img
              onClick={() => callback(option.longUrls[1])}
              src={option.urls[1]}
              style={{
                marginRight: "10px",
                borderRadius: "4px",
                width: "50%",
                height: "auto",
              }}
            />
          ) : (
            ""
          )}
        </div>
      )}
    />
  );
};

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

export { app_fetch, escape, palette, SearchImage };
