import React from "react";
import { Link } from "react-router-dom";
import CallableComponent from "./CallableComponent";

class Header extends React.Component {
  render() {
    return (
      <div class="account-info">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Crowdventure Logo"
          />
        </Link>
        <AccountManager cookies={this.props.cookies} />
      </div>
    );
  }
}

class AccountManager extends CallableComponent {
  state = { value: "" };
  loginNew() {
    this.mutate([`createAccount(screenName:"${this.state.value}"){ID}`]).then(
      (account) => {
        this.handleLogin(account[0].createAccount.ID);
      }
    );
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleLogin(accountID) {
    this.query(`getAccount(ID:"${accountID}"){ID}`).then((res) => {
      if (res)
        (async () =>
          this.props.cookies.set("account", accountID, { path: "/" }))().then(
          () => {
            window.location.reload();
          }
        );
      else {
        alert("That account doesn't exist!");
        this.setState({ getAccount: undefined, value: "" });
      }
    });
  }
  render() {
    return this.loadRender(
      "Account",
      `getAccount(ID:"${this.props.cookies.get("account")}"){screenName,ID}`,
      () => this.renderAM(),
      () => this.renderNoAccount()
    );
  }
  renderAM() {
    const account = this.state.getAccount;
    return (
      <span>
        You are logged in as: {account.screenName}
        <Link to={`/account/${account.ID}`}>
          <button>Go to Account</button>
        </Link>
      </span>
    );
  }
  renderNoAccount() {
    return (
      <div>
        You are not logged in.
        {(() => {
          switch (this.state.loginStatus) {
            case "loggingIn":
              return (
                <div>
                  <input
                    placeholder="Enter your account id..."
                    value={this.state.value}
                    onChange={(event) => this.handleChange(event)}
                  />
                  <button onClick={() => this.handleLogin(this.state.value)}>
                    Log in
                  </button>
                </div>
              );
            case "signingUp":
              return (
                <div>
                  <input
                    placeholder="Please enter a screenName"
                    value={this.state.value}
                    onChange={(event) => this.handleChange(event)}
                  />
                  <button onClick={() => this.loginNew()}>Sign up</button>
                </div>
              );
            default:
              return (
                <div>
                  <button
                    onClick={() =>
                      this.setState({
                        loginStatus: "loggingIn",
                        getAccount: undefined,
                      })
                    }
                  >
                    Log in
                  </button>
                  <button
                    onClick={() =>
                      this.setState({
                        loginStatus: "signingUp",
                        getAccount: undefined,
                      })
                    }
                  >
                    Sign up
                  </button>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}

export default Header;
