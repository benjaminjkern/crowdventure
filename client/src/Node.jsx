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
      <div class="node">
        <button>Go Back</button>
        <h1>{info.title}</h1>
        <p>{info.content}</p>
        <ChoiceList
          canon={true}
          nodeID={info.ID}
          resetPage={() => this.resetPage()}
          account={this.props.cookies.get("account")}
        />
        <p>
          Views: {info.views}
          <br /> Owner: {info.owner.screenName}{" "}
          {info.owner.ID === this.props.cookies.get("account")
            ? [
                "(You)",
                <Link to={`/editnode/${this.props.match.params.id}`}>
                  <button>Edit Page</button>
                </Link>,
              ]
            : ""}
        </p>
        Non-Canon Choices:
        <ChoiceList
          canon={false}
          nodeID={info.ID}
          resetPage={() => this.resetPage()}
          account={this.props.cookies.get("account")}
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
      [`getNode(ID:"${this.props.nodeID}"){${this.choices}{ID}}`],
      () => this.renderChoiceList()
    );
  }

  renderChoiceList() {
    const info = this.state["getNode"];
    return (
      <div class="choice-list">
        {info[this.choices].map((choice) => (
          <Choice
            resetPage={() => this.props.resetPage()}
            choiceID={choice.ID}
            account={this.props.account}
          />
        ))}
      </div>
    );
  }
}

class Choice extends CallableComponent {
  like() {
    this.mutate(
      `likeSuggestion(accountID:"${this.props.account}",choiceID:"${this.props.choiceID}"){ID}`
    );
    this.setState({ getChoice: undefined });
  }
  dislike() {
    this.mutate(
      `dislikeSuggestion(accountID:"${this.props.account}",choiceID:"${this.props.choiceID}"){ID}`
    );
    this.setState({ getChoice: undefined });
  }
  render() {
    return this.loadRender(
      "Choice",
      `getChoice(ID:"${this.props.choiceID}"){to{ID},action,score}`,
      () => this.renderChoice()
    );
  }
  renderChoice() {
    const choice = this.state.getChoice;
    return (
      <div class="choice">
        <Link
          onClick={() => this.props.resetPage()}
          to={`/node/${choice.to.ID}`}
        >
          <button>{choice.action}</button>
        </Link>
        <br />
        <button onClick={() => this.dislike()} class="like-btn">
          <span role="img" aria-label="thumbs down">
            👎
          </span>
        </button>
        {" " + choice.score + " "}
        <button onClick={() => this.like()} class="like-btn">
          <span role="img" aria-label="thumbs up">
            👍
          </span>
        </button>
      </div>
    );
  }
}

class SuggestBox extends CallableComponent {
  handleInput(event) {
    this.setState({ action: event.target.value });
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
      `getAccount(ID:"${this.props.cookies.get("account")}"){ID}`,
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
        <NodeSearcher
          setToID={(toID) => {
            this.setState({ toID });
          }}
        />
        <p>
          <button onClick={() => this.suggest()}>Suggest</button>
          {this.state.redirect ? this.state.redirect : ""}
        </p>
      </div>
    );
  }
}

class NodeSearcher extends CallableComponent {
  clickButton(node) {
    this.setState({
      search: node.title,
      searchNodes: undefined,
      toID: node.ID,
    });
    this.props.setToID(node.ID);
  }
  state = { search: "" };
  search(event) {
    this.setState({ search: event.target.value, toID: undefined });
    this.props.setToID("");

    if (event.target.value === "") this.setState({ searchNodes: undefined });
    this.query(
      `searchNodes(type:"title",query:"${event.target.value}"){title,ID}`
    ).then((results) => this.setState(results[0]));
  }
  render() {
    return (
      <div>
        Go to node:
        <input
          placeholder="Search for node..."
          value={this.state.search}
          onChange={(event) => this.search(event)}
        />
        {this.state.searchNodes
          ? this.state.searchNodes.map((node) => (
              <button onClick={() => this.clickButton(node)}>
                {node.title}
              </button>
            ))
          : ""}
        <br />
        {this.state.toID
          ? `(${this.state.toID})`
          : "(Leave empty to create new)"}
      </div>
    );
  }
}

export default Node;
