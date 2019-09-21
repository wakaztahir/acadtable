import React, { Component } from "react";

import { connect } from "react-redux";

import {
  createLecture,
  deleteLecture,
  unshowModal,
  createTable,
  deleteTable,
  createDay,
  createTime,
  createBatch,
  createPlace,
  createTeacher,
  createSubject
} from "../../actions";

import ColorsPanel from "./ColorsPanel";

import {
  listKey,
  TABLE_HEADER_COLOR,
  TABLE_FOOTER_COLOR
} from "../../actions/helpers";

class TableActions extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      base: "days",
      baseValue: null,
      rows: "times",
      cols: "places",
      header: { text: "", color: TABLE_HEADER_COLOR },
      footer: { text: "", color: TABLE_FOOTER_COLOR }
    }
  };
  create() {
    let objector = {
      days: this.props.days,
      times: this.props.times,
      places: this.props.places,
      batches: this.props.batches,
      subjects: this.props.subjects,
      teachers: this.props.teachers
    };
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ display: "main" });
          }}
        >
          Back
        </button>
        <div className="full-wrapper flex-center">
          <form
            onSubmit={event => {
              event.preventDefault();

              let {
                base,
                baseValue,
                rows,
                cols,
                header,
                footer
              } = this.state.creator;
              this.props.createTable({
                base,
                baseValue,
                rows,
                cols,
                header,
                footer
              });

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
              <label htmlFor="header-tarea">Header</label>
              <input
                type="text"
                style={{ width: "20rem" }}
                value={this.state.creator.header.text}
                onChange={e => {
                  this.setState({
                    creator: {
                      ...this.state.creator,
                      header: {
                        ...this.state.creator.header,
                        text: e.target.value
                      }
                    }
                  });
                }}
              />
            </div>
            <div className="form-row">
              <span />
              <ColorsPanel
                color={this.state.creator.header.color}
                change={color => {
                  this.setState({
                    creator: {
                      ...this.state.creator,
                      header: { ...this.state.creator.header, color }
                    }
                  });
                }}
              />
            </div>
            <div className="form-row">
              <label htmlFor="">Footer</label>
              <input
                type="text"
                style={{ width: "20rem" }}
                value={this.state.creator.footer.text}
                onChange={e => {
                  this.setState({
                    creator: {
                      ...this.state.creator,
                      footer: {
                        ...this.state.creator.footer,
                        text: e.target.value
                      }
                    }
                  });
                }}
              />
            </div>
            <div className="form-row">
              <span />
              <ColorsPanel
                color={this.state.creator.footer.color}
                change={color => {
                  this.setState({
                    creator: {
                      ...this.state.creator,
                      footer: { ...this.state.creator.footer, color }
                    }
                  });
                }}
              />
            </div>
            <div className="form-row submit-row">
              <div>
                <input
                  type="submit"
                  style={{ textTransform: "capitalize" }}
                  value="Create Table"
                  className="black-btn"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
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
          <div className="form-row submit-row">
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
  delete() {
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
            this.props.deleteTable(ex.target[0].value);
            this.props.unshowModal();
          }}
        >
          <div className="form-row">
            <label htmlFor="fromtable">Select Table </label>&nbsp;
            <select
              name="tableid"
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
          <div className="form-row submit-row">
            <span />
            <input type="submit" value="Delete" />
          </div>
        </form>
      </div>
    );
  }
  addrowcol(thing) {
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
            let rows = ex.target[0].value;
            let rowtext = ex.target[1].value;
            let key = listKey(rows);
            key = key[0].toUpperCase() + key.substr(1, key.length);
            let func = this.props["create" + key];
            func({ name: rowtext });
            this.props.unshowModal();
          }}
        >
          <div className="form-row">
            <label htmlFor="fromtable">Select Table </label>&nbsp;
            <select
              name="tableid"
              id="fromtable"
              defaultValue={this.props.tables[0]}
            >
              {this.props.tables.map(table => {
                let baseName =
                  this.props[table.base].filter(
                    thing => thing.id === table.baseValue
                  )[0].name + " Table";
                return (
                  <option value={table[thing]} key={table.id}>
                    {baseName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="rowtext">
              {thing === "rows" ? "Row" : "Column"} Text
            </label>
            <input type="text" id="rowtext" name="rowtext" />
          </div>
          <div className="form-row submit-row">
            <span />
            <input
              type="submit"
              value={thing === "rows" ? "Add Row" : "Add Column"}
            />
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.display === "main") {
      return (
        <div>
          <h1>What to do ?</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => {
                this.setState({ display: "create" });
              }}
            >
              Create A Table
            </button>
            <br />

            <button
              onClick={() => {
                this.setState({ display: "copy" });
              }}
            >
              Copy A Table
            </button>
            <br />
            <button
              onClick={() => {
                this.setState({ display: "delete" });
              }}
            >
              Delete A Table
            </button>
            <br />

            <button
              onClick={() => {
                this.setState({ display: "addrow" });
              }}
            >
              Add Another Row
            </button>
            <br />

            <button
              onClick={() => {
                this.setState({ display: "addcol" });
              }}
            >
              Add Another Column
            </button>
            <br />

            <button
              onClick={() => {
                this.props.unshowModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    } else {
      switch (this.state.display) {
        case "create":
        default:
          return this.create();
        case "copy":
          return this.copy();
        case "delete":
          return this.delete();
        case "addrow":
          return this.addrowcol("rows");
        case "addcol":
          return this.addrowcol("cols");
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
  {
    createLecture,
    deleteLecture,
    unshowModal,
    createTable,
    deleteTable,
    createPlace,
    createBatch,
    createDay,
    createSubject,
    createTeacher,
    createTime
  }
)(TableActions);
