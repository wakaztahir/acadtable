import React, { Component } from "react";

import storage from "../../actions/storage";

import { connect } from "react-redux";

import { listKey } from "../../actions/helpers";

import { createTable, updateTable, deleteTable } from "../../actions";

class Tables extends Component {
  state = {
    display: "main",
    creator: {
      action: "create",
      id: null,
      base: "days",
      baseValue: null,
      rows: "times",
      cols: "places"
    }
  };
  componentWillUnmount() {
    storage.save();
  }
  creator(objector) {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.action === "create") {
              let { base, baseValue, rows, cols } = this.state.creator;
              this.props.createTable({ base, baseValue, rows, cols });
            } else if (this.state.creator.action === "update") {
              let { id, base, baseValue, rows, cols } = this.state.creator;
              this.props.updateTable(id, { base, baseValue, rows, cols });
            }
            this.setState({ display: "main" });
          }}
          className="form-table"
        >
          <div className="form-row">
            <label htmlFor="base">Table of </label>
            <select
              defaultValue={this.state.creator.base}
              style={{ textTransform: "capitalize" }}
              onChange={event => {
                this.setState({
                  creator: { ...this.state.creator, base: event.target.value }
                });
              }}
              required={true}
            >
              {Object.keys(objector)
                .filter(
                  key =>
                    key !== this.state.creator.rows &&
                    key !== this.state.creator.cols
                )
                .map(key => {
                  return (
                    <option key={"base" + key} value={key}>
                      {key}
                    </option>
                  );
                })}
            </select>
          </div>
          {this.state.creator.base != null &&
          objector[this.state.creator.base].length > 0 ? (
            <div className="form-row">
              <label
                htmlFor="baseValue"
                style={{ textTransform: "capitalize" }}
              >
                {listKey(this.state.creator.base)}
              </label>
              <select
                defaultValue={
                  this.state.creator.baseValue == null
                    ? objector[this.state.creator.base][0].id
                    : this.state.creator.baseValue
                }
                style={{ textTransform: "capitalize" }}
                onChange={event => {
                  this.setState({
                    creator: {
                      ...this.state.creator,
                      baseValue: event.target.value
                    }
                  });
                }}
                required={true}
              >
                {objector[this.state.creator.base].map(item => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          <div className="form-row">
            <label htmlFor="rows">Rows </label>
            <select
              defaultValue={this.state.creator.rows}
              style={{ textTransform: "capitalize" }}
              onChange={event => {
                this.setState({
                  creator: {
                    ...this.state.creator,
                    rows: event.target.value
                  }
                });
              }}
              required={true}
            >
              {Object.keys(objector)
                .filter(
                  key =>
                    key !== this.state.creator.base &&
                    key !== this.state.creator.cols
                )
                .map(key => {
                  return (
                    <option key={"rows" + key} value={key}>
                      {key}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="cols">Columns </label>
            <select
              defaultValue={this.state.creator.cols}
              style={{ textTransform: "capitalize" }}
              onChange={event => {
                this.setState({
                  creator: {
                    ...this.state.creator,
                    cols: event.target.value
                  }
                });
              }}
              required={true}
            >
              {Object.keys(objector)
                .filter(
                  key =>
                    key !== this.state.creator.base &&
                    key !== this.state.creator.rows
                )
                .map(key => {
                  return (
                    <option key={"cols" + key} value={key}>
                      {key}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-row">
            <div />
            <div>
              <button
                onClick={() => {
                  this.setState({ display: "main" });
                }}
                style={{ marginRight: "1em" }}
              >
                Cancel
              </button>
              <input
                type="submit"
                style={{ textTransform: "capitalize" }}
                value={this.state.creator.action}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
  quicker(objector) {
    return null;
  }
  edit(table) {
    this.setState({
      display: "create",
      creator: { ...table, action: "update" }
    });
  }
  render() {
    let objector = {
      days: this.props.days,
      times: this.props.times,
      places: this.props.places,
      batches: this.props.batches,
      subjects: this.props.subjects,
      teachers: this.props.teachers
    };
    if (this.state.display === "create") {
      return this.creator(objector);
    } else if (this.state.display === "quick") {
      return this.quicker(objector);
    }
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({
                display: "create",
                creator: {
                  action: "create",
                  id: null,
                  base: "days",
                  baseValue: null,
                  rows: "times",
                  cols: "places"
                }
              });
            }}
          >
            Create A Table
          </button>
          <button
            onClick={() => {
              this.setState({ display: "quick" });
            }}
          >
            Quick Tables
          </button>
        </div>
        <div className="sq-list">
          {this.props.tables.map(table => {
            let base = objector[table.base].filter(
              item => item.id === table.baseValue
            );
            if (base.length === 0) {
              console.warning("Table Base Not Found", table);
              return null;
            }
            let baseName = base[0].name;
            return (
              <div
                key={table.id}
                className="sq-list-item"
                onClick={() => {
                  this.edit(table);
                }}
              >
                <h2>
                  <strong style={{ fontWeight: 500 }}>{baseName}</strong> Table
                </h2>
                <h3 style={{ fontWeight: 400 }}>{table.rows} as rows</h3>
                <h3 style={{ fontWeight: 400 }}>{table.cols} as columns</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tables: state.Tables,
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
  { createTable, updateTable, deleteTable }
)(Tables);
