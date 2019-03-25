import React, { Component } from "react";

import storage from "../../actions/storage";

import { connect } from "react-redux";

import { listKey } from "../../actions/helpers";

import {
  createTable,
  updateTable,
  deleteTable,
  showModal,
  unshowModal
} from "../../actions";

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
    },
    quicker: {
      base: "days",
      rows: "places",
      cols: "times"
    }
  };
  componentWillUnmount() {
    storage.save();
  }
  creator(objector) {
    return (
      <div>
        <h1>Tables</h1>
        <div className="full-wrapper flex-center">
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
                {Object.keys(objector).map(key => {
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
                  value={
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
                  {this.state.creator.baseValue !== null
                    ? objector[this.state.creator.base].filter(
                        item => item.id === this.state.creator.baseValue
                      ).length > 0
                      ? null
                      : this.setState({
                          creator: { ...this.state.creator, baseValue: null }
                        })
                    : null}
                  {objector[this.state.creator.base].map(item => {
                    if (this.state.creator.baseValue == null) {
                      this.setState({
                        creator: { ...this.state.creator, baseValue: item.id }
                      });
                    }
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
                value={this.state.creator.rows}
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
                  .filter(key => key !== this.state.creator.base)
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
                value={this.state.creator.cols}
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
              <button
                onClick={() => {
                  this.setState({ display: "main" });
                }}
                style={{ marginRight: "1em" }}
              >
                Cancel
              </button>
              <div>
                {this.state.creator.action === "update" ? (
                  <button
                    onClick={() => {
                      this.props.deleteTable(this.state.creator.id);
                      this.setState({ display: "main" });
                    }}
                  >
                    Delete
                  </button>
                ) : null}
                <input
                  type="submit"
                  style={{ textTransform: "capitalize" }}
                  value={this.state.creator.action}
                  className="black-btn"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  quicker(objector) {
    let objects = Object.keys(objector);
    return (
      <div>
        <h1>Tables</h1>
        <div className="full-wrapper flex-center">
          <h2>Table Settings</h2>
          <div className="form-table">
            <div className="form-row">
              <label htmlFor="base">Tables for</label>
              <select
                type="text"
                value={this.state.quicker.base}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, base: x.target.value }
                  })
                }
                style={{ textTransform: "capitalize" }}
              >
                {objects.map(obj => {
                  return (
                    <option key={"base" + obj} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="rows">Rows </label>
              <select
                id="rows"
                type="text"
                value={this.state.quicker.rows}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, rows: x.target.value }
                  })
                }
                style={{ textTransform: "capitalize" }}
              >
                {objects.map(obj => {
                  if (obj === this.state.quicker.base) {
                    return null;
                  }
                  return (
                    <option key={"row" + obj} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="cols">Columns </label>
              <select
                id="cols"
                type="text"
                value={this.state.quicker.cols}
                onChange={x =>
                  this.setState({
                    quicker: { ...this.state.quicker, cols: x.target.value }
                  })
                }
                style={{ textTransform: "capitalize" }}
              >
                {objects.map(obj => {
                  if (
                    obj === this.state.quicker.rows ||
                    obj === this.state.quicker.base
                  ) {
                    return null;
                  }
                  return (
                    <option key={"col" + obj} value={obj}>
                      {obj}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <br />
          <div>
            <button
              onClick={() => {
                this.setState({ display: "main" });
              }}
            >
              Cancel
            </button>
            &nbsp;
            <button
              onClick={() => {
                let tables = [];
                let tFor = objector[this.state.quicker.base];
                tFor.forEach(base => {
                  tables.push({
                    base: this.state.quicker.base,
                    baseValue: base.id,
                    rows: this.state.quicker.rows,
                    cols: this.state.quicker.cols
                  });
                });
                tables.forEach(table => {
                  this.props.createTable(table);
                });
                this.setState({ display: "main" });
              }}
              className="black-btn"
            >
              Create Tables
            </button>
          </div>
        </div>
      </div>
    );
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
        <h1>Tables</h1>
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
          &nbsp;
          <button
            onClick={() => {
              this.setState({ display: "quick" });
            }}
          >
            Quick Tables
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.props.showModal(
                "confirm",
                "All tables will be deleted , Are you sure ?",
                [
                  () => {
                    this.props.tables.forEach(table => {
                      this.props.deleteTable(table.id);
                    });
                    this.props.unshowModal();
                  },
                  () => {
                    this.props.unshowModal();
                  }
                ]
              );
            }}
          >
            Delete All Tables
          </button>
        </div>
        <div className="sq-list">
          {this.props.tables.map(table => {
            let base = objector[table.base].filter(
              item => item.id === table.baseValue
            );
            let baseName;
            if (base.length === 0) {
              console.log("Table Base Not Found", table);
              baseName = null;
            } else {
              baseName = base[0].name;
            }
            return (
              <div
                key={table.id}
                className="sq-list-item"
                onClick={() => {
                  this.setState({
                    display: "create",
                    creator: { ...table, action: "update" }
                  });
                }}
              >
                <h2>
                  <strong style={{ fontWeight: 500 }}>
                    {baseName != null ? (
                      baseName
                    ) : (
                      <span className="warning">Error</span>
                    )}
                  </strong>{" "}
                  Table
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
  { createTable, updateTable, deleteTable, showModal, unshowModal }
)(Tables);
