import React, { Component } from "react";

import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./Header";

import Display from "./display";

//Tables Import
import Tables from "./Tables";
//Batches Import
import Batches from "./Batches";
//Lectures Import
import Lectures from "./Lectures";
//Subjects Import
import Subjects from "./Subjects";
//Students Import
import Teachers from "./Teachers";

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

            <Route path="/subjects" exact component={Subjects} />

            <Route path="/teachers" exact component={Teachers} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
