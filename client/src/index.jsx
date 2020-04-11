import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as a from "./mock-data/mockAccounts.json";
import * as n from "./mock-data/mockNodes.json";
import * as c from "./mock-data/mockChoices.json";

const [ACCOUNTS, NODES, CHOICES] = [a, n, c].map((x) => x.default);

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

class ChoiceList extends React.Component {
  render() {
    let node = NODES[this.props.nodeID];
    this.choices =
      this.props.canon === "true" ? node.canonChoices : node.nonCanonChoices;
    return (
      <div>
        {this.choices.map((op) => (
          <Choice
            id={op}
            onClick={(toID) => {
              this.props.onClick(toID);
            }}
          />
        ))}
      </div>
    );
  }
}

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.info = CHOICES[props.id];
  }
  render() {
    return (
      <button
        onClick={() => {
          this.props.onClick(this.info.to);
        }}
      >
        {this.info.action}
      </button>
    );
  }
}

class NodePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = NODES[props.id];
  }

  moveToNode(node) {
    this.setState(NODES[node]);
  }

  render() {
    const owner = ACCOUNTS[this.state.owner];
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.content}</p>
        <p>Views: {this.state.views}</p>
        <p>
          Owner: {owner.screenName} ({owner.ID})
        </p>
        Canon Choices:
        <ChoiceList
          canon="true"
          nodeID={this.state.ID}
          onClick={(nodeID) => {
            this.moveToNode(nodeID);
          }}
        />
        Non-Canon Choices:
        <ChoiceList
          canon="false"
          nodeID={this.state.ID}
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
