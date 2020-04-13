/*

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/node" component={Node} />
            <Route path="/account" component={Account} />
            <Route path="/editnode" component={EditNode} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
*/

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Node from "./Node";
import Account from "./Account";
import Header from "./Header";
import Home from "./Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/node/:id" component={Node} />
          <Route path="/account/:id" component={Account} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
