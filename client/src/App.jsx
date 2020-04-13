import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";

import Node from "./Node";
import Account from "./Account";
import Header from "./Header";
import Home from "./Home";
import EditNode from "./EditNode";

class App extends React.Component {
  cookies = new Cookies();
  render() {
    return (
      <BrowserRouter>
        <Header cookies={this.cookies} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/node/:id"
            render={(props) => <Node {...props} cookies={this.cookies} />}
          />
          <Route
            path="/account/:id"
            render={(props) => <Account {...props} cookies={this.cookies} />}
          />
          <Route path="/editnode/:id" component={EditNode} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
