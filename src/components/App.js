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
//Lectures Import
import Lectures from "./lectures";
import CreateLecture from "./lectures/Create";
import RenameLecture from "./lectures/Rename";

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

            <Route path="/lectures" exact component={Lectures} />
            <Route path="/lectures/create" exact component={CreateLecture} />
            <Route path="/lectures/rename" exact component={RenameLecture} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
