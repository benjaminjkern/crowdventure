import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import util from "util";

const { createApolloFetch } = require("apollo-fetch");

const app_fetch = createApolloFetch({
  uri: "http://localhost:4000",
});

class CallableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadRender(name, id, selection, renderFunc) {
    if (!this.method)
      throw new Error("You need to specify a method for graphql!");

    switch (this.state[this.method]) {
      case null:
        return <span>Couldn't find {name}</span>;
      case undefined:
        app_fetch({
          query: `query{${this.method}(ID:"${id}"){${selection}}}`,
        }).then((res, err) => {
          if (err) alert(err);
          this.setState({
            [this.method]: res.data ? res.data[this.method] : null,
          });
        });
        return <span>Loading {name}...</span>;
      default:
        return renderFunc();
    }
  }
}

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

class Choice extends CallableComponent {
  method = "getChoice";

  render() {
    return this.loadRender("Choice", this.props.id, "action,to{ID}", () =>
      this.renderChoice()
    );
  }

  renderChoice() {
    return (
      <button
        onClick={() => {
          this.props.onClick(this.state[this.method].to.ID);
        }}
      >
        {this.state[this.method].action}
      </button>
    );
  }
}

class ChoiceList extends CallableComponent {
  choices = `${this.props.canon === "true" ? "c" : "nonC"}anonChoices`;
  method = "getNode";

  render() {
    return this.loadRender(
      "Choice List",
      this.props.nodeID,
      `${this.choices}{ID}`,
      () => this.renderChoiceList()
    );
  }

  renderChoiceList() {
    return (
      <div>
        {this.state[this.method][this.choices].map((choice) => (
          <Choice
            id={choice.ID}
            onClick={(toID) => {
              this.props.onClick(toID);
            }}
          />
        ))}
      </div>
    );
  }
}

class Node extends CallableComponent {
  constructor(props) {
    super(props);
    this.state = { id: props.id };
  }

  method = "getNode";

  moveToNode(node) {
    this.setState({ id: node, [this.method]: undefined });
  }

  render() {
    return this.loadRender(
      "Node",
      this.state.id,
      "title,content,views,ID,owner{screenName,ID}",
      () => this.renderNode()
    );
  }

  renderNode() {
    return (
      <div>
        <h1>{this.state[this.method].title}</h1>
        <p>{this.state[this.method].content}</p>
        <p>Views: {this.state[this.method].views}</p>
        <p>
          Owner: {this.state[this.method].owner.screenName} (
          {this.state[this.method].owner.ID})
        </p>
        Canon Choices:
        <ChoiceList
          canon="true"
          nodeID={this.state[this.method].ID}
          onClick={(nodeID) => {
            this.moveToNode(nodeID);
          }}
        />
        Non-Canon Choices:
        <ChoiceList
          canon="false"
          nodeID={this.state[this.method].ID}
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
    return [<Header />, <Node id="Y9JJ" />];
  }
}

// ========================================

ReactDOM.render(<Crowdventure />, document.getElementById("root"));
