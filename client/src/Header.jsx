import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Crowdventure Logo"
          />
        </Link>
        <button>Account</button>
      </div>
    );
  }
}

export default Header;
