import React, { useState, useEffect } from "react";

import { Typeahead } from "react-bootstrap-typeahead";

import { query_call } from "../index";

const SearchPage = (props) => {
  const { callback, toID } = props;
  const [allNodes, setAllNodes] = useState(undefined);
  const [toNode, setToNode] = useState(undefined);

  const filterByCallback = (node, props) => {
    if (props.text === "") {
      callback("");
      return true;
    }
    return (
      node.title.toLowerCase().includes(props.text.toLowerCase()) ||
      node.owner.screenName.toLowerCase().includes(props.text.toLowerCase())
    );
  };

  useEffect(() => {
    if (toID) {
      query_call("getNode", { ID: toID }, { title: 0, ID: 0 }, (res) =>
        setToNode(res)
      );
    } else setToNode(null);

    query_call(
      "allNodes",
      {},
      { title: 0, owner: { screenName: 0, profilePicURL: 0 }, ID: 0 },
      (res) => setAllNodes(res)
    );
  }, []);

  if (!allNodes || toNode === undefined) return <div>Loading...</div>;

  return (
    <Typeahead
      filterBy={filterByCallback}
      defaultSelected={[toNode ? toNode.title : ""]}
      labelKey="title"
      options={allNodes}
      placeholder="(Leave Empty to Create New Page)"
      renderMenuItemChildren={(node) => (
        <div onClick={() => callback(node.ID)}>
          {node.title}
          <div>
            <small>
              Author:{" "}
              <img
                src={
                  node.owner.profilePicURL
                    ? node.owner.profilePicURL
                    : process.env.PUBLIC_URL + "/defaultProfilePic.jpg"
                }
                onError={(e) => {
                  e.target.src =
                    process.env.PUBLIC_URL + "/defaultProfilePic.jpg";
                }}
                style={{
                  border: "1px solid #bbb",
                  height: "2em",
                  width: "2em",
                  "object-fit": "cover",
                  "border-radius": "50%",
                }}
              />{" "}
              {node.owner.screenName}
            </small>
          </div>
        </div>
      )}
    />
  );
};

export default SearchPage;
