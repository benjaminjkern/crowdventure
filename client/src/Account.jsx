import React from "react";
import CallableComponent from "./CallableComponent";
import { Link } from "react-router-dom";

class Account extends CallableComponent {
  logOut() {
    (async () =>
      this.props.cookies.remove("account", { path: "/" }))().then(() =>
      window.location.reload()
    );
  }
  render() {
    return this.loadRender(
      "Account",
      [
        `getAccount(ID:"${this.props.match.params.id}"){ID,screenName,nodes{ID,title},suggestedChoices{ID,from{title},action,to{title}},totalNodeViews,totalSuggestionScore}`,
      ],
      () => this.renderAccount()
    );
  }

  renderAccount() {
    const info = this.state.getAccount;
    if (
      !this.state.loggedIn &&
      this.props.cookies.get("account") === this.props.match.params.id
    )
      this.setState({
        loggedIn: (
          <div>
            Edit suggested choices:
            {info.suggestedChoices.map((choice) => (
              <Link to={`/editchoice/${choice.ID}`}>
                <button>
                  {choice.from.title} -({choice.action})-> {choice.to.title}
                </button>
              </Link>
            ))}
            <br />
            <Link onClick={() => this.logOut()}>
              <button>Log Out</button>
            </Link>
          </div>
        ),
      });
    return (
      <div>
        <h1>{info.screenName}</h1>
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
          Total Node Views:
          {info.totalNodeViews}
        </p>
        {this.state.loggedIn ? this.state.loggedIn : ""}
      </div>
    );
  }
}

export default Account;
