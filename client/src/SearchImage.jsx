import React, { useState } from "react";

import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";

import { palette } from "./index";

const { BING_API_KEY } = require("./apolloURL");

const SearchImage = (props) => {
  const { callback, loggedInAs } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  const BLURAMOUNT = 10;

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(
      "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" +
        encodeURIComponent(query) +
        `&count=20&safeSearch=${
          loggedInAs && loggedInAs.unsafeMode ? "Off" : "Strict"
        }&offset=` +
        (query !== lastQuery ? 0 : page * 20),
      {
        headers: {
          "Ocp-Apim-Subscription-Key": BING_API_KEY,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        const newOptions = data.value.reduce(
          (p, hit, i) =>
            (i + options.length) % 2 == 0
              ? [
                  ...p,
                  {
                    id: "(Image Selected)",
                    urls: [hit.thumbnailUrl],
                    longUrls: [hit.contentUrl],
                    isFamilyFriendly: [hit.isFamilyFriendly],
                  },
                ]
              : [
                  ...p.slice(0, p.length - 1),
                  {
                    id: "(Image Selected)",
                    urls: [p[p.length - 1].urls[0], hit.thumbnailUrl],
                    longUrls: [p[p.length - 1].longUrls[0], hit.contentUrl],
                    isFamilyFriendly: [
                      p[p.length - 1].isFamilyFriendly[0],
                      hit.isFamilyFriendly,
                    ],
                  },
                ],
          query !== lastQuery ? [] : options
        );
        setOptions(newOptions);

        if (query !== lastQuery) {
          setPage(1);
        } else {
          setPage(page + 1);
        }
        setLastQuery(query);
        setIsLoading(false);
      })
      .catch(console.log);
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
      renderMenuItemChildren={(option) => (
        <div>
          <img
            onClick={() =>
              callback(option.longUrls[0], option.isFamilyFriendly[0])
            }
            src={option.urls[0]}
            style={{
              marginRight: "10px",
              borderRadius: "4px",
              width: "50%",
              height: "auto",
              ...(option.isFamilyFriendly[0]
                ? {}
                : {
                    "-webkit-filter": "blur(" + BLURAMOUNT + "px)",
                    filter: "blur(" + BLURAMOUNT + "px)",
                  }),
            }}
          />
          {option.urls.length === 2 ? (
            <img
              onClick={() =>
                callback(option.longUrls[1], option.isFamilyFriendly[1])
              }
              src={option.urls[1]}
              style={{
                marginRight: "10px",
                borderRadius: "4px",
                width: "50%",
                height: "auto",
                ...(option.isFamilyFriendly[1]
                  ? {}
                  : {
                      "-webkit-filter": "blur(" + BLURAMOUNT + "px)",
                      filter: "blur(" + BLURAMOUNT + "px)",
                    }),
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

export default SearchImage;
