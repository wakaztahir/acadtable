import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

import Display from "./display";

//Tables Import
import Tables from "./tables";
import CreateTable from "./tables/Create";
import RenameTable from "./tables/Rename";
//Batches Import
import Batches from "./batches";
import CreateBatch from "./batches/Create";
import RenameBatch from "./batches/Rename";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <div className="wrapper">
            <Route path="/" exact component={Display} />
            <Route path="/tables" exact component={Tables} />
            <Route path="/tables/create" exact component={CreateTable} />
            <Route path="/tables/rename" exact component={RenameTable} />

            <Route path="/batches" exact component={Batches} />
            <Route path="/batches/create" exact component={CreateBatch} />
            <Route path="/batches/rename" exact component={RenameBatch} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
