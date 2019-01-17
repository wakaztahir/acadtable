import React, { Component } from "react";

import { HashRouter as Router, Route } from "react-router-dom";
//Header Import
import Header from "./Header";

//Display Import
import Display from "./display";

//Tables Import
import Tables from "./tables";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Header} />
          <div className="wrapper">
            <Route path="/" exact component={Display} />

            <Route path="/tables" exact component={Tables} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
