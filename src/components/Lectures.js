import React, { Component } from "react";

import Manager from "./manager";

import { connect } from "react-redux";

import {
  createLectureByName,
  deleteLectureById,
  renameLectureById
} from "./../actions";

class Lectures extends Component {
  render() {
    return (
      <Manager
        mainHeading="Lectures"
        createButtonText="Create A Lecture"
        list={this.props.list}
        create={name => {
          this.props.createLectureByName(name);
        }}
        delete={id => {
          this.props.deleteLectureById(id);
        }}
        rename={(id, newname) => {
          this.props.renameLectureById(id, newname);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.LectureList
  };
};

export default connect(
  mapStateToProps,
  {
    createLectureByName,
    deleteLectureById,
    renameLectureById
  }
)(Lectures);
