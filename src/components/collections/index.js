import React, { Component } from "react";

import List from "./List";
import Create from "./Create";
import Edit from "./Edit";

import { connect } from "react-redux";

import {
  createCollection,
  selectCollection,
  copyCollection,
  renameCollection,
  deleteCollection
} from "../../actions";

import { rand } from "../../actions/helpers";

class Collections extends Component {
  state = {
    createForm: false,
    editCollection: null
  };
  render() {
    let list = this.props.collections;

    //Collection Buttons
    let buttons = [];
    buttons.push({
      name: "select",
      action: id => {
        this.props.selectCollection(id);
      },
      selected: true
    });
    buttons.push({
      name: "copy",
      action: id => {
        this.props.copyCollection(id, rand("collection"));
      }
    });
    buttons.push({
      name: "edit",
      action: id => {
        this.setState({
          editCollection: id
        });
      }
    });
    buttons.push({
      name: "delete",
      action: id => {
        this.props.deleteCollection(id);
      }
    });

    if (this.state.editCollection != null) {
      return (
        <Edit
          collectionID={this.state.editCollection}
          cancel={() => {
            this.setState({ editCollection: null });
          }}
        />
      );
    }

    return (
      <div>
        <h1>Collections</h1>
        <Create
          name="collection"
          display={this.state.createForm ? "form" : "button"}
          click={() => {
            this.setState({ createForm: true });
          }}
          submit={values => {
            this.props.createCollection(rand("collection"), values.name);
            this.setState({ createForm: false });
          }}
          cancel={() => {
            this.setState({ createForm: false });
          }}
        />
        <List
          selected={
            this.props.selectedCollection != null
              ? this.props.selectedCollection.id
              : null
          }
          list={list}
          buttons={buttons}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collections: state.CollectionsList,
    selectedCollection: state.SelectedCollection
  };
};
export default connect(
  mapStateToProps,
  {
    createCollection,
    selectCollection,
    copyCollection,
    renameCollection,
    deleteCollection
  }
)(Collections);
