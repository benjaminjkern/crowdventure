import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import util from "util";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: "http://localhost:4000",
});

// You can also easily pass variables for dynamic arguments

class Header extends React.Component {
  render() {
    return (
      <div>
        <a>Crowdventure Logo</a>
        <button>account</button>
      </div>
    );
  }
}

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { info } = this.state;

    if (info) return this.renderChoice();
    else {
      app_fetch({
        query: `query {
        getChoice(ID:"${this.props.id}") {
          action
          to {
            ID
          }
        }
      }`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) this.setState({ info: res.data.getChoice });
      });

      return <span>Loading Choice...</span>;
    }
  }

  renderChoice() {
    return (
      <button
        onClick={() => {
          this.props.onClick(this.state.info.to.ID);
        }}
      >
        {this.state.info.action}
      </button>
    );
  }
}

class ChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { choices } = this.state;

    if (choices) return this.renderChoiceList();
    else {
      const toGrab = `${this.props.canon === "true" ? "c" : "nonC"}anonChoices`;

      app_fetch({
        query: `query {
          getNode(ID:"${this.props.nodeID}") {
            ${toGrab} {
              ID
            }
          }
        }`,
      }).then((res, err) => {
        if (err) alert(err);
        if (res.data) this.setState({ choices: res.data.getNode[toGrab] });
      });
      return <span>Loading Choices...</span>;
    }
  }

  renderChoiceList() {
    return (
      <div>
        {this.state.choices.map((op) => (
          <Choice
            id={op.ID}
            onClick={(toID) => {
              this.props.onClick(toID);
            }}
          />
        ))}
      </div>
    );
  }
}

class NodePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id };
  }

  getNode() {
    app_fetch({
      query: `query {
        getNode(ID:"${this.state.id}") {
          title
          content
          views
          ID
          owner {
            screenName
            ID
          }
        }
      }`,
    }).then((res, err) => {
      if (err) alert(err);
      if (res.data) this.setState({ node: res.data.getNode });
    });
  }

  moveToNode(node) {
    this.setState({ id: node, node: undefined });
  }

  render() {
    const { node } = this.state;

    if (node) return this.renderNode();
    else {
      this.getNode();
      return <span>Loading node...</span>;
    }
  }

  renderNode() {
    return (
      <div>
        <h1>{this.state.node.title}</h1>
        <p>{this.state.node.content}</p>
        <p>Views: {this.state.node.views}</p>
        <p>
          Owner: {this.state.node.owner.screenName} ({this.state.node.owner.ID})
        </p>
        Canon Choices:
        <ChoiceList
          canon="true"
          nodeID={this.state.node.ID}
          onClick={(nodeID) => {
            this.moveToNode(nodeID);
          }}
        />
        Non-Canon Choices:
        <ChoiceList
          canon="false"
          nodeID={this.state.node.ID}
          onClick={(nodeID) => {
            this.moveToNode(nodeID);
          }}
        />
      </div>
    );
  }
}

class Crowdventure extends React.Component {
  render() {
    return (
      <div>
        <Header /> <NodePage id="Y9JJ" />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Crowdventure />, document.getElementById("root"));
