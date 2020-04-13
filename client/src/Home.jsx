import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class Home extends CallableComponent {
  render() {
    return this.loadRender(
      "Page",
      ["allNodes{ID,title}", "allAccounts{ID,screenName}"],
      () => this.renderApp()
    );
  }
  renderApp() {
    const nodes = this.state.allNodes;
    const accounts = this.state.allAccounts;
    return (
      <div>
        <p>
          Nodes:
          {nodes.map((node) => (
            <Link to={`/node/${node.ID}`}>
              <button>{node.title}</button>
            </Link>
          ))}
        </p>
        <p>
          Accounts:
          {accounts.map((account) => (
            <Link to={`/account/${account.ID}`}>
              <button>{account.screenName}</button>
            </Link>
          ))}
        </p>
      </div>
    );
  }
}

export default Home;
