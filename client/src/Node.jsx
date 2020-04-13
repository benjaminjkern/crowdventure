import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class Node extends CallableComponent {
  method = "getNode";

  resetState() {
    this.setState({ [this.method]: undefined });
  }

  render() {
    return this.loadRender(
      "Node",
      [
        `getNode(ID:"${this.props.match.params.id}"){title,content,views,ID,owner{screenName,ID}}`,
      ],
      () => this.renderNode()
    );
  }

  renderNode() {
    const info = this.state["getNode"];
    return (
      <div>
        <h1>{info.title}</h1>
        <p>{info.content}</p>
        <p>Views: {info.views}</p>
        <p>
          Owner: {info.owner.screenName} ({info.owner.ID})
        </p>
        Canon Choices:
        <ChoiceList
          resetState={() => this.resetState()}
          canon="true"
          nodeID={info.ID}
        />
        Non-Canon Choices:
        <ChoiceList
          resetState={() => this.resetState()}
          canon="false"
          nodeID={info.ID}
        />
        <p>
          <SuggestBox />
        </p>
      </div>
    );
  }
}

class ChoiceList extends CallableComponent {
  choices = `${this.props.canon === "true" ? "c" : "nonC"}anonChoices`;

  render() {
    return this.loadRender(
      "Choice List",
      [`getNode(ID:"${this.props.nodeID}"){${this.choices}{ID,action,to{ID}}}`],
      () => this.renderChoiceList()
    );
  }

  renderChoiceList() {
    const info = this.state["getNode"];
    return (
      <div>
        {info[this.choices].map((choice) => (
          <Link to={`/node/${choice.to.ID}`}>
            <button onClick={() => this.props.resetState()}>
              {choice.action}
            </button>
          </Link>
        ))}
      </div>
    );
  }
}

class SuggestBox extends CallableComponent {
  render() {
    // this should only work if you are logged in
    return (
      <div>
        Suggest your own action:
        <input />
        <p>
          <label>
            <input type="radio" name="choice-create" defaultChecked />
            Create new node
          </label>
          <label>
            <input type="radio" name="choice-create" />
            Connect existing node
          </label>
          <button>Suggest</button>
        </p>
      </div>
    );
  }
}

export default Node;
