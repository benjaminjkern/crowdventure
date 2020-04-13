import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class EditNode extends CallableComponent {
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
      [`getNode(ID:"${this.props.match.params.id}"){title,content}`],
      () => this.renderEditNode()
    );
  }

  renderEditNode() {
    const node = this.state.getNode;
    return (
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
          <textarea
            value={node.content}
            onChange={(event) => this.changeContent(event)}
          />
        </p>
        <Link
          onClick={() => this.handleSubmit()}
          to={`/node/${this.props.match.params.id}`}
        >
          <button>Submit</button>
        </Link>
      </div>
    );
  }
}

export default EditNode;
