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
  handleLogin() {
    (async () =>
      this.props.cookies.set("account", "4sod26pek2", { path: "/" }))().then(
      () => {
        window.location.reload();
      }
    );
  }
  render() {
    return this.loadRender(
      "Account",
      [`getAccount(ID:"${this.props.cookies.get("account")}"){screenName,ID}`],
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
      <span>
        You are not logged in.
        <button onClick={() => this.handleLogin()}>Log in</button>
        <button>Sign up</button>
      </span>
    );
  }
}

export default Header;