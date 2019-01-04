import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import Screen from "./Screen";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <Route path="/tables" component={Menu} />
          <Route path="/" exact component={Screen} />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  {}
)(App);
