import React from "react";
import CallableComponent from "./CallableComponent";
import { Redirect } from "react-router-dom";

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
    if (!node.title)
      this.setState({
        warning: "Your page needs a title!",
      });
    else {
      this.mutate([
        `editNode(nodeID:"${this.props.match.params.id}",title:"${node.title}",content:"${node.content}"){ID}`,
      ]);
      this.setState({
        redirect: <Redirect to={`/node/${this.props.match.params.id}`} />,
      });
    }
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
    if (this.props.cookies.get("account") !== node.owner.ID)
      this.setState({
        error: "You are not the owner of this page, so you cannot edit it!",
      });
    return this.doRender(
      "Editing node",
      <div>
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
        <button onClick={() => this.handleSubmit()}>Submit</button>
        {this.state.redirect ? this.state.redirect : ""}
      </div>
    );
  }
}

export default EditNode;
