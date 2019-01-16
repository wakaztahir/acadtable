import React, { Component } from "react";

import Manager from "./manager";

import { connect } from "react-redux";

import {
  createSubjectByName,
  deleteSubjectById,
  renameSubjectById
} from "./../actions";

class Subjects extends Component {
  render() {
    return (
      <Manager
        mainHeading="Subjects"
        createButtonText="Create A Subject"
        list={this.props.list}
        create={name => {
          this.props.createSubjectByName(name);
        }}
        delete={id => {
          this.props.deleteSubjectById(id);
        }}
        rename={(id, newname) => {
          this.props.renameSubjectById(id, newname);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.SubjectList
  };
};

export default connect(
  mapStateToProps,
  {
    createSubjectByName,
    deleteSubjectById,
    renameSubjectById
  }
)(Subjects);
