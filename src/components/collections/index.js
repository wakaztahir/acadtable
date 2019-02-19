import React, { Component } from "react";

import List from "./List";
import Create from "./Create";
import Edit from "./Edit";

import { connect } from "react-redux";

import Modal from "../Modal";

import {
  createCollection,
  selectCollection,
  copyCollection,
  renameCollection,
  deleteCollection
} from "../../actions";

class Collections extends Component {
  state = {
    createForm: false,
    editCollection: null,
    modalDisplay: false,
    deleteFunction: () => {}
  };
  displayDeleteModal() {
    this.setState({ modalDisplay: true });
  }
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
        this.props.copyCollection(id);
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
        this.setState({
          modalDisplay: true,
          deleteFunction: () => {
            this.props.deleteCollection(id);
          }
        });
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
            this.props.createCollection(values.name);
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
        <Modal
          display={this.state.modalDisplay}
          type="confirm"
          yes={() => {
            this.state.deleteFunction();
            this.setState({ modalDisplay: false });
          }}
          cancel={() => this.setState({ modalDisplay: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collections: Object.values(state.Collections)
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