import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class EditChoice extends CallableComponent {
  changeAction(event) {
    let changedState = this.state;
    changedState.getNode.action = event.target.value;
    this.setState(changedState);
  }

  changeToID(event) {
    let changedState = this.state;
    changedState.getNode.toID = event.target.value;
    this.setState(changedState);
  }

  handleSubmit() {
    const choice = this.state.getChoice;
    this.mutate(
      `editSuggestion(choiceID:"${this.props.match.params.id}",action:"${choice.action}",toID:"${choice.toID}"){ID}`
    );
  }

  render() {
    return this.loadRender(
      "Choice Editor",
      `getChoice(ID:"${this.props.match.params.id}"){action,to{ID},from{ID,title},suggestedBy{ID}}`,
      () => this.renderEditChoice()
    );
  }

  renderEditChoice() {
    const choice = this.state.getChoice;
    if (this.state.validated === undefined)
      this.setState({
        validated: this.props.cookies.get("account") === choice.suggestedBy.ID,
      });
    return this.state.validated ? (
      <div>
        <h1>Editing Choice</h1>
        <p>From:{choice.from.title}</p>
        <p>
          Action:
          <input
            value={choice.action}
            onChange={(event) => this.changeAction(event)}
          />
        </p>
        <p>
          Go to (ID):
          <input
            value={choice.to.ID}
            onChange={(event) => this.changeToID(event)}
          />
        </p>
        <Link
          onClick={() => this.handleSubmit()}
          to={`/node/${choice.from.ID}`}
        >
          <button>Submit</button>
        </Link>
      </div>
    ) : (
      "You are not the owner of this choice, and you cannot edit it"
    );
  }
}

export default EditChoice;
