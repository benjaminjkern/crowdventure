import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class EditNode extends CallableComponent {
  makeNonCanon(choiceID) {
    this.mutate(`makeNonCanon(choiceID:"${choiceID}"){ID}`);
    this.setState({ getNode: undefined });
  }
  makeCanon(choiceID) {
    this.mutate(`makeCanon(choiceID:"${choiceID}"){ID}`);
    this.setState({ getNode: undefined });
  }

  changeTitle(event) {
    let changedState = this.state;
    changedState.getNode.title = event.target.value;
    this.setState(changedState);
  }

  changeContent(event) {
    let changedState = this.state;
    changedState.getNode.content = event.target.value;
    this.setState(changedState);
  }

  handleSubmit() {
    const node = this.state.getNode;
    this.mutate([
      `editNode(nodeID:"${this.props.match.params.id}",title:"${node.title}",content:"${node.content}"){ID}`,
    ]);
  }

  render() {
    return this.loadRender(
      "Node Editor",
      [
        `getNode(ID:"${this.props.match.params.id}"){title,content,owner{ID},canonChoices{ID,action},nonCanonChoices{ID,action}}`,
      ],
      () => this.renderEditNode()
    );
  }

  renderEditNode() {
    const node = this.state.getNode;
    if (this.state.validated === undefined)
      this.setState({
        validated: this.props.cookies.get("account") === node.owner.ID,
      });
    return this.state.validated ? (
      <div>
        <h1>Editing node</h1>
        <p>
          Title:
          <input
            value={node.title}
            onChange={(event) => this.changeTitle(event)}
          />
        </p>
        <p>
          Content:
          <br />
          <textarea
            value={node.content}
            onChange={(event) => this.changeContent(event)}
          />
        </p>
        <p>
          Click to change canonicity:
          <br />
          Canon choices:
          {node.canonChoices.map((choice) => (
            <button onClick={() => this.makeNonCanon(choice.ID)}>
              {choice.action}
            </button>
          ))}
          <br />
          Noncanon choices:
          {node.nonCanonChoices.map((choice) => (
            <button onClick={() => this.makeCanon(choice.ID)}>
              {choice.action}
            </button>
          ))}
        </p>
        <Link
          onClick={() => this.handleSubmit()}
          to={`/node/${this.props.match.params.id}`}
        >
          <button>Submit</button>
        </Link>
      </div>
    ) : (
      "You are not the owner of this node, and you cannot edit it"
    );
  }
}

export default EditNode;
