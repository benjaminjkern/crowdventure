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
  deleteAccount() {
    this.mutate(
      `deleteAccount(accountID:"${this.props.match.params.id}")`
    ).then((res) => {
      this.inspect(res);
      this.logOut();
    });
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
            <button onClick={() => this.logOut()}>Log Out</button>
            <button onClick={() => this.deleteAccount()}>Delete Account</button>
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
