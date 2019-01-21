import React, { Component } from "react";

import List from "./List";
import Create from "./Create";
import Edit from "./Edit";

import { connect } from "react-redux";

import {
  createCollectionByName,
  selectCollectionById,
  renameCollectionById,
  deleteCollectionById
} from "../../actions";

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
        this.props.select(id);
      },
      selected: true
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
        this.props.delete(id);
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
            this.props.create(values.name);
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
    selectedCollection: state.SelectedCollection,
    collections: state.CollectionsList,
    tables: state.TablesList,
    days: state.DaysList,
    places: state.PlacesList,
    times: state.TimesList,
    blocks: state.BlocksList,
    batches: state.BatchesList,
    subjects: state.SubjectsList,
    teachers: state.TeachersList
  };
};

const mapDispatchToProps = {
  create: createCollectionByName,
  select: selectCollectionById,
  rename: renameCollectionById,
  delete: deleteCollectionById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections);
