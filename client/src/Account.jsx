import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class Account extends CallableComponent {
  render() {
    return this.loadRender(
      "Account",
      [
        `getAccount(ID:"${this.props.match.params.id}"){ID,screenName,nodes{ID,title},suggestedChoices{from{title},action,to{title}}}`,
      ],
      () => this.renderAccount()
    );
  }

  renderAccount() {
    const info = this.state["getAccount"];
    return (
      <div>
        <h1>
          {info.screenName} ({info.ID})
        </h1>
        <p>
          Nodes:
          {info.nodes.map((node) => (
            <Link to={`/node/${node.ID}`}>
              <button>
                {node.title} ({node.ID})
              </button>
            </Link>
          ))}
        </p>
        <p>
          Suggested Choices:
          {info.suggestedChoices.map((choice) => (
            <button>
              {choice.from.title} -({choice.action})-> {choice.to.title}
            </button>
          ))}
        </p>
        <p></p>
      </div>
    );
  }
}

export default Account;
