import React, { Component } from "react";

import Manager from "./manager";

import { connect } from "react-redux";

import {
  createTeacherByName,
  deleteTeacherById,
  renameTeacherById
} from "./../actions";

class Teachers extends Component {
  render() {
    return (
      <Manager
        mainHeading="Teachers"
        createButtonText="Create A Teacher"
        list={this.props.list}
        create={name => {
          this.props.createTeacherByName(name);
        }}
        delete={id => {
          this.props.deleteTeacherById(id);
        }}
        rename={(id, newname) => {
          this.props.renameTeacherById(id, newname);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.TeacherList
  };
};

export default connect(
  mapStateToProps,
  {
    createTeacherByName,
    deleteTeacherById,
    renameTeacherById
  }
)(Teachers);
