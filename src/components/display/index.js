import React, { Component } from "react";

import { connect } from "react-redux";

import Screen from "./Screen";
import Header from "./Header";

import {
  selectCollection,
  deselectCollection,
  createLecture
} from "../../actions";

class Display extends Component {
  state = {
    params: null
  };
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Screen params={this.state.params} />;
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User,
    tables: state.Tables,
    days: state.Days,
    places: state.Places,
    times: state.Times,
    lectures: state.Lectures,
    batches: state.Batches,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  {
    selectCollection,
    deselectCollection,
    createLecture
  }
)(Display);
