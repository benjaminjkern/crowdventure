import React from "react";
import CallableComponent from "./CallableComponent";
import { Link, Redirect } from "react-router-dom";

class Node extends CallableComponent {
  resetPage() {
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
    const info = this.state.getNode;
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
          canon={true}
          nodeID={info.ID}
          resetPage={() => this.resetPage()}
        />
        Non-Canon Choices:
        <ChoiceList
          canon={false}
          nodeID={info.ID}
          resetPage={() => this.resetPage()}
        />
        <p>
          <SuggestBox
            fromID={this.props.match.params.id}
            cookies={this.props.cookies}
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
          <Link
            onClick={() => this.props.resetPage()}
            to={`/node/${choice.to.ID}`}
          >
            <button>{choice.action}</button>
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
    const accountID = this.props.cookies.get("account");
    if (!this.state.toID) {
      this.mutate([
        `createNode(accountID:"${accountID}",title:"",content:""){ID}`,
      ]).then((node) => {
        this.setState({ toID: node[0].createNode.ID });

        this.mutate([
          `suggestChoice(accountID:"${accountID}"
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
        `suggestChoice(accountID:"${accountID}"
                fromID: "${this.props.fromID}"
                action: "${this.state.action}"
                toID: "${this.state.toID}"){ID}`,
      ]);

      window.location.reload();
    }
  }
  render() {
    return this.loadRender(
      "Suggestion Box",
      [`getAccount(ID:"${this.props.cookies.get("account")}"){ID}`],
      () => this.renderSuggestBox(),
      () => this.renderNoBox()
    );
  }

  renderNoBox() {
    return <div>You can only suggest new choices if you are logged in.</div>;
  }

  renderSuggestBox() {
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
