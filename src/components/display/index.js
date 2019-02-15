import React, { Component } from "react";

import { connect } from "react-redux";

import Welcome from "./Welcome";
import Table from "./Table";

import {
  selectCollection,
  createBlock,
  createBatch,
  createDay,
  createTime,
  createPlace,
  createSubject,
  createTeacher
} from "../../actions";

class Display extends Component {
  state = {
    mode: "edit"
  };
  screen() {
    //Blocks , Subjects , Teachers : Info Containers
    let {
      tables,
      blocks,
      batches,
      days,
      times,
      places,
      subjects,
      teachers
    } = this.props;
    let objector = {
      tables,
      blocks,
      batches,
      days,
      times,
      places,
      subjects,
      teachers
    };

    let getBlockKey = listName => {
      switch (listName) {
        case "batches":
          return "batch";
        default:
          return listName.substr(0, listName.length - 1);
      }
    };

    return (
      <div>
        <h1>Acadtable</h1>
        <div>
          <button
            onClick={() => {
              this.setState({ mode: "edit" });
            }}
            className={this.state.mode === "edit" ? "btn-red" : ""}
          >
            edit
          </button>
          <button
            onClick={() => {
              this.setState({ mode: "print" });
            }}
            className={this.state.mode === "print" ? "btn-red" : ""}
          >
            print
          </button>
        </div>
        {tables.map(table => {
          let base = objector[table.base].filter(
            i => i.id === table.baseValue
          )[0];
          let rows = objector[table.rows];
          let cols = objector[table.cols];
          return (
            <Table
              id={table.id}
              key={table.id}
              mode={this.state.mode}
              base={base}
              baseBlockKey={getBlockKey(table.base)}
              rows={rows}
              rowsBlockKey={getBlockKey(table.rows)}
              cols={cols}
              colsBlockKey={getBlockKey(table.cols)}
              blocks={blocks}
            />
          );
        })}
      </div>
    );
  }
  render() {
    if (this.props.collections.length === 0) {
      return <Welcome />;
    } else if (this.props.selected === null) {
      if (this.props.collections.length === 1) {
        this.props.selectCollection(this.props.collections[0].id);
      }
      return (
        <div>
          <span>Please select a collection</span>
        </div>
      );
    }

    return this.screen();
  }
}

const mapStateToProps = state => {
  return {
    collections: state.CollectionsList,
    selected: state.SelectedCollection,
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

export default connect(
  mapStateToProps,
  {
    createBlock,
    createBatch,
    createDay,
    createTime,
    createPlace,
    createTeacher,
    createSubject,
    selectCollection
  }
)(Display);
