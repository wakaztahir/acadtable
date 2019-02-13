import React, { Component } from "react";
import storage from "../../engine/storage";

import Area from "./areas";

import { connect } from "react-redux";

import {
  createBlock,
  updateBlock,
  deleteBlock,
  createTable,
  updateTable,
  deleteTable,
  createDay,
  updateDay,
  deleteDay,
  createTime,
  updateTime,
  deleteTime,
  createPlace,
  updatePlace,
  deletePlace,
  createBatch,
  updateBatch,
  deleteBatch,
  createSubject,
  updateSubject,
  deleteSubject,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from "../../actions";

class EditCollection extends Component {
  state = {
    ...storage.getData(this.props.collectionID),
    editArea: "tables"
  };
  updateState = () => {
    this.setState({ ...storage.getData(this.props.collectionID) });
  };
  render() {
    const UserArea = () => {
      switch (this.state.editArea) {
        case "tables":
          return (
            <Area
              array={this.state.tables}
              createActionCreator={data => {
                this.props.createTable(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateTable(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteTable(this.state.id, propID);
                this.updateState();
              }}
              name="table"
              editor="TableEditor"
              heading="Tables"
              items={[
                { name: "days", list: this.state.days },
                { name: "times", list: this.state.times },
                { name: "batches", list: this.state.batches },
                { name: "places", list: this.state.places },
                { name: "subjects", list: this.state.subjects },
                { name: "teachers", list: this.state.teachers }
              ]}
              keys={[
                {
                  name: "name",
                  required: true
                }
                // { name: "options" },
                // { name: "settings" }
              ]}
            />
          );
        case "lectures":
        default:
          return (
            <Area
              array={this.state.blocks}
              createActionCreator={data => {
                this.props.createBlock(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateBlock(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteBlock(this.state.id, propID);
                this.updateState();
              }}
              name="block"
              heading="Lectures"
              keys={[
                {
                  name: "text",
                  required: true,
                  locked: true,
                  show: false
                },
                {
                  name: "name",
                  required: true
                },
                { name: "customText" },
                { name: "day" },
                { name: "place" },
                { name: "time" },
                { name: "batch" },
                { name: "subject" },
                { name: "teacher" }
              ]}
            />
          );
        case "days":
          return (
            <Area
              array={this.state.days}
              createActionCreator={data => {
                this.props.createDay(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateDay(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteDay(this.state.id, propID);
                this.updateState();
              }}
              name="day"
              heading="Days"
              keys={[
                {
                  name: "name",
                  required: true
                }
              ]}
            />
          );
        case "times":
          return (
            <Area
              array={this.state.times}
              createActionCreator={data => {
                this.props.createTime(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateTime(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteTime(this.state.id, propID);
                this.updateState();
              }}
              name="time"
              heading="Times"
              keys={[
                {
                  name: "name",
                  required: true
                }
              ]}
            />
          );
        case "places":
          return (
            <Area
              array={this.state.places}
              createActionCreator={data => {
                this.props.createPlace(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updatePlace(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deletePlace(this.state.id, propID);
                this.updateState();
              }}
              name="place"
              heading="Places"
              keys={[
                {
                  name: "name",
                  required: true
                }
              ]}
            />
          );
        case "batches":
          return (
            <Area
              array={this.state.batches}
              createActionCreator={data => {
                this.props.createBatch(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateBatch(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteBatch(this.state.id, propID);
                this.updateState();
              }}
              name="batch"
              heading="Batches"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                }
              ]}
            />
          );
        case "subjects":
          return (
            <Area
              array={this.state.subjects}
              createActionCreator={data => {
                this.props.createSubject(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateSubject(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteSubject(this.state.id, propID);
                this.updateState();
              }}
              name="subject"
              heading="Subjects"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                }
              ]}
            />
          );
        case "teachers":
          return (
            <Area
              array={this.state.teachers}
              createActionCreator={data => {
                this.props.createTeacher(this.state.id, data);
                this.updateState();
              }}
              updateActionCreator={(propID, data) => {
                this.props.updateTeacher(this.state.id, propID, data);
                this.updateState();
              }}
              deleteActionCreator={propID => {
                this.props.deleteTeacher(this.state.id, propID);
                this.updateState();
              }}
              name="teacher"
              heading="Teachers"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                }
              ]}
            />
          );
      }
    };
    let MenuItems = [
      "lectures",
      "tables",
      "batches",
      "days",
      "times",
      "places",
      "subjects",
      "teachers"
    ];
    return (
      <div>
        <div className="buttons-list">
          <button onClick={this.props.cancel}>Back</button>
        </div>
        <h1>Collection : {this.state.name}</h1>
        <div>
          {MenuItems.map(item => {
            let activeClass = "";
            if (item === this.state.editArea) {
              activeClass = "btn-red";
            }
            return (
              <button
                onClick={() => {
                  this.setState({ editArea: item });
                }}
                style={{ textTransform: "capitalize", margin: "2px" }}
                className={activeClass}
                key={item}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div>
          <UserArea />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    createBlock,
    updateBlock,
    deleteBlock,
    createTable,
    updateTable,
    deleteTable,
    createDay,
    updateDay,
    deleteDay,
    createTime,
    updateTime,
    deleteTime,
    createPlace,
    updatePlace,
    deletePlace,
    createBatch,
    updateBatch,
    deleteBatch,
    createSubject,
    updateSubject,
    deleteSubject,
    createTeacher,
    updateTeacher,
    deleteTeacher
  }
)(EditCollection);
