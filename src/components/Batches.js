import React, { Component } from "react";

import Manager from "./manager";

import { connect } from "react-redux";

import {
  createBatchByName,
  deleteBatchById,
  renameBatchById
} from "./../actions";

class Batches extends Component {
  render() {
    return (
      <Manager
        mainHeading="Batches"
        createButtonText="Create A Batch"
        list={this.props.list}
        create={name => {
          this.props.createBatchByName(name);
        }}
        delete={id => {
          this.props.deleteBatchById(id);
        }}
        rename={(id, newname) => {
          this.props.renameBatchById(id, newname);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.BatchList
  };
};

export default connect(
  mapStateToProps,
  {
    createBatchByName,
    deleteBatchById,
    renameBatchById
  }
)(Batches);
