import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
//Tables Import
import Tables from "./tables";
import CreateTable from "./tables/Create";
import RenameTable from "./tables/Rename";
import DeleteTable from "./tables/Delete";
//Batches Import
import Batches from "./batches";
import CreateBatch from "./batches/Create";
import RenameBatch from "./batches/Rename";
import DeleteBatch from "./batches/Delete";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />

          <Route path="/tables" exact component={Tables} />
          <Route path="/tables/create" exact component={CreateTable} />
          <Route path="/tables/rename" exact component={RenameTable} />
          <Route path="/tables/delete" exact component={DeleteTable} />

          <Route path="/batches" exact component={Batches} />
          <Route path="/batches/create" exact component={CreateBatch} />
          <Route path="/batches/rename" exact component={RenameBatch} />
          <Route path="/batches/delete" exact component={DeleteBatch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
