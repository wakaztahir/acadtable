import React, { Component } from "react";

import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./Header";

import Display from "./display";

//Tables Import
import Tables from "./tables";
//Batches Import
import Batches from "./batches";
//Lectures Import
import Lectures from "./lectures";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <div className="wrapper">
            <Route path="/" exact component={Display} />

            <Route path="/tables" exact component={Tables} />

            <Route path="/batches" exact component={Batches} />

            <Route path="/lectures" exact component={Lectures} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
