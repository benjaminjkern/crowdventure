import React from "react";
import CallableComponent from "./CallableComponent";
import { Link, Redirect } from "react-router-dom";

class Node extends CallableComponent {
  resetState() {
    this.setState({ getNode: undefined });
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
          canon={true}
          nodeID={info.ID}
        />
        Non-Canon Choices:
        <ChoiceList
          resetState={() => this.resetState()}
          canon={false}
          nodeID={info.ID}
        />
        <p>
          <SuggestBox
            fromID={this.props.match.params.id}
            resetState={() => this.resetState()}
          />
        </p>
      </div>
    );
  }
}

class ChoiceList extends CallableComponent {
  choices = `${this.props.canon ? "c" : "nonC"}anonChoices`;

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
  handleInput(event) {
    this.setState({ action: event.target.value });
  }
  handleChange(event) {
    this.setState({ toID: event.target.value });
  }

  suggest() {
    if (!this.state.toID) {
      this.mutate([
        `createNode(accountID:"4sod26pek2",title:"",content:""){ID}`,
      ]).then((node) => {
        this.setState({ toID: node[0].createNode.ID });

        this.mutate([
          `suggestChoice(accountID:"4sod26pek2"
                fromID: "${this.props.fromID}"
                action: "${this.state.action}"
                toID: "${this.state.toID}"){ID}`,
        ]);

        this.setState({
          redirect: <Redirect to={`/editnode/${this.state.toID}`} />,
        });
      });
    } else {
      // redundant code but some of it is in the then statement so I dont wanna mess with it
      this.mutate([
        `suggestChoice(accountID:"4sod26pek2"
                fromID: "${this.props.fromID}"
                action: "${this.state.action}"
                toID: "${this.state.toID}"){ID}`,
      ]);

      this.props.resetState();
    }
  }

  render() {
    // this should only work if you are logged in
    return (
      <div>
        Suggest your own action:
        <input
          value={this.state.action}
          onChange={(event) => this.handleInput(event)}
        />
        <br />
        Set node to go to (leave blank to create new node):
        <input
          value={this.state.toID}
          onChange={(event) => this.handleChange(event)}
        />
        <p>
          <button onClick={() => this.suggest()}>Suggest</button>
          {this.state.redirect ? this.state.redirect : ""}
        </p>
      </div>
    );
  }
}

export default Node;
