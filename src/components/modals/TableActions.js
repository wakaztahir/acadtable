import React, { Component } from "react";

import { connect } from "react-redux";

import { createLecture, deleteLecture, unshowModal } from "../../actions";

import { listKey } from "../../actions/helpers";

class TableActions extends Component {
  state = {
    display: "main"
  };
  copy() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ display: "main" });
          }}
        >
          Back
        </button>
        <br />
        <br />
        <form
          className="form-table"
          onSubmit={ex => {
            ex.preventDefault();
            let from = ex.target[0].value;
            let to = ex.target[1].value;
            if (from !== to) {
              let val1Table = this.props.tables.filter(
                table => table.id === to
              )[0];
              let val1Key = listKey(val1Table.base);
              let lectsDels = this.props.lectures.filter(
                lecture => lecture[val1Key] === val1Table.baseValue
              );
              lectsDels.forEach(l => this.props.deleteLecture(l.id));

              let val2Table = this.props.tables.filter(
                table => table.id === from
              )[0];
              let val2Key = listKey(val2Table.base);
              let lectsCret = this.props.lectures.filter(
                lecture => lecture[val2Key] === val2Table.baseValue
              );
              lectsCret.forEach(l => {
                let lecture = { ...l };
                lecture[val2Key] = val1Table.baseValue;
                this.props.createLecture(lecture);
              });
              this.props.unshowModal();
            }
          }}
        >
          <div className="form-row">
            <label htmlFor="fromtable">From </label>&nbsp;
            <select
              name="from"
              id="fromtable"
              defaultValue={this.props.tables[0].id}
            >
              {this.props.tables.map(table => {
                let baseName =
                  this.props[table.base].filter(
                    thing => thing.id === table.baseValue
                  )[0].name + " Table";
                return (
                  <option value={table.id} key={table.id}>
                    {baseName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="totable">To </label>&nbsp;
            <select
              name="to"
              id="totable"
              defaultValue={this.props.tables[0].id}
            >
              {this.props.tables.map(table => {
                let baseName =
                  this.props[table.base].filter(
                    thing => thing.id === table.baseValue
                  )[0].name + " Table";
                return (
                  <option value={table.id} key={table.id}>
                    {baseName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <span />
            <input type="submit" value="Copy Table" />
          </div>
        </form>
        <span style={{ color: "rgba(222,55,33,.8)", fontStyle: "italic" }}>
          The other table will be overwritten
        </span>
      </div>
    );
  }
  render() {
    if (this.state.display === "main") {
      return (
        <div>
          <h1>What to do ?</h1>
          <button
            onClick={() => {
              this.setState({ display: "copy" });
            }}
          >
            Copy A Table
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.props.unshowModal();
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      switch (this.state.display) {
        case "copy":
        default:
          return this.copy();
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    tables: state.Tables,
    lectures: state.Lectures,
    days: state.Days,
    times: state.Times,
    places: state.Places,
    batches: state.Batches,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  { createLecture, deleteLecture, unshowModal }
)(TableActions);
