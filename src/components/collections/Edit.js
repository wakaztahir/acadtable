import React, { Component } from "react";
import storage from "../../engine/storage";

import Area from "./areas";

import { connect } from "react-redux";

import {
  createBlock,
  createTable,
  createDay,
  createTime,
  createPlace,
  createBatch,
  createSubject,
  createTeacher
} from "../../actions";

class EditCollection extends Component {
  state = {
    ...storage.getData(this.props.collectionID)
  };
  render() {
    return (
      <div>
        <div className="buttons-list">
          <button onClick={this.props.cancel}>Back</button>
        </div>
        <div>Name : {this.state.name}</div>
        <div>
          {
            <Area
              array={this.state.tables}
              createActionCreator={data => {
                this.props.createTable(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteTable(this.state.id, data);
              }}
              name="table"
              heading="tables"
              keys={[
                {
                  name: "name",
                  required: true
                },
                {
                  name: "base",
                  required: true
                },
                {
                  name: "rows",
                  required: true
                },
                {
                  name: "columns",
                  required: true
                },
                { name: "options" },
                { name: "settings" }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.days}
              createActionCreator={data => {
                this.props.createDay(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteDay(this.state.id, data);
              }}
              name="day"
              heading="days"
              keys={[
                {
                  name: "name",
                  required: true
                },
                {
                  name: "number",
                  required: true
                },
                { name: "date" }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.times}
              createActionCreator={data => {
                this.props.createTime(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteTime(this.state.id, data);
              }}
              name="time"
              heading="times"
              keys={[
                {
                  name: "name",
                  required: true
                },
                {
                  name: "number",
                  required: true
                },
                { name: "time" }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.places}
              createActionCreator={data => {
                this.props.createPlace(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deletePlace(this.state.id, data);
              }}
              name="place"
              heading="places"
              keys={[
                {
                  name: "name",
                  required: true
                },
                {
                  name: "number",
                  required: true
                }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.batches}
              createActionCreator={data => {
                this.props.createBatch(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteBatch(this.state.id, data);
              }}
              name="batch"
              heading="batches"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                },
                {
                  name: "number",
                  required: true,
                  locked: false
                }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.subjects}
              createActionCreator={data => {
                this.props.createSubject(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteSubject(this.state.id, data);
              }}
              name="subject"
              heading="subjects"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                },
                {
                  name: "number",
                  required: true,
                  locked: false
                }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.teachers}
              createActionCreator={data => {
                this.props.createTeacher(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteTeacher(this.state.id, data);
              }}
              name="teacher"
              heading="teachers"
              keys={[
                {
                  name: "name",
                  required: true,
                  locked: false
                },
                {
                  name: "number",
                  required: true,
                  locked: false
                }
              ]}
            />
          }
        </div>
        <div>
          {
            <Area
              array={this.state.blocks}
              createActionCreator={data => {
                this.props.createBlock(this.state.id, data);
              }}
              deleteActionCreator={data => {
                this.props.deleteBlock(this.state.id, data);
              }}
              name="block"
              heading="blocks"
              keys={[
                {
                  name: "text",
                  required: true,
                  locked: true
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
          }
        </div>
        <div className="buttons-list">
          <button>Save</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    createBlock,
    createTable,
    createDay,
    createTime,
    createPlace,
    createBatch,
    createSubject,
    createTeacher
  }
)(EditCollection);
