import React, { Component } from "react";

import Manager from "./manager";

import { connect } from "react-redux";

import {
  createTableByName,
  selectTableById,
  deleteTableById,
  renameTableById
} from "./../actions";

class Tables extends Component {
  selectButton = id => {
    this.props.selectTableById(id);
  };
  render() {
    return (
      <Manager
        mainHeading="Tables"
        createButtonText="Create A Table"
        list={this.props.list}
        create={name => {
          this.props.createTableByName(name);
        }}
        delete={id => {
          this.props.deleteTableById(id);
        }}
        rename={(id, newname) => {
          this.props.renameTableById(id, newname);
        }}
        buttons={[{ name: "Select", onClick: this.selectButton }]}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.TableList
  };
};

export default connect(
  mapStateToProps,
  {
    createTableByName,
    selectTableById,
    deleteTableById,
    renameTableById
  }
)(Tables);
