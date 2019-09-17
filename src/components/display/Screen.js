import React, { Component } from "react";

import { connect } from "react-redux";

import {
  showModal,
  unshowModal,
  updateTable,
  updateLecture,
  deleteLecture,
  swapDay,
  swapBatch,
  swapPlace,
  swapTeacher,
  swapSubject,
  swapTime,
  updateBatch,
  updateDay,
  updatePlace,
  updateSubject,
  updateTeacher,
  updateTime,
  deleteBatch,
  deleteDay,
  deletePlace,
  deleteSubject,
  deleteTeacher,
  deleteTime
} from "../../actions";

import { listKey, keyList } from "../../actions/helpers";

import "../../resources/screen.css";

import "../../resources/render.css";

import LectureModal from "../modals/LectureModal";

import Exporter from "../modals/Exporter";
import TableActions from "../modals/TableActions";

class Screen extends Component {
  state = {
    tableMode: "",
    downloader: null,
    download: false
  };
  componentDidUpdate() {
    if (this.state.download) {
      this.state.downloader(this.refs.screen, () => {
        this.props.unshowModal();
        this.setState({ tableMode: "", downloader: null, download: false });
      });
    }
    this.props.user.save();
  }

  render() {
    let objector = {
      tables: this.props.tables,
      lectures: this.props.lectures,
      batches: this.props.batches,
      days: this.props.days,
      times: this.props.times,
      places: this.props.places,
      subjects: this.props.subjects,
      teachers: this.props.teachers
    };
    return (
      <div>
        <div
          style={{ marginTop: "1rem", flexDirection: "row" }}
          className="flex-center"
        >
          <button
            onClick={() => {
              this.props.showModal("content", <TableActions screen={this} />);
            }}
          >
            Table Actions
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.props.showModal("content", <Exporter screen={this} />);
            }}
          >
            Export
          </button>
        </div>
        <div className="flex-center" style={{ minWidth: "50em" }}>
          <div className={`screen ${this.state.tableMode}`} ref="screen">
            {objector.tables.map(table => {
              let base = objector[table.base].filter(
                i => i.id === table.baseValue
              )[0];
              let rows = objector[table.rows];
              let cols = objector[table.cols];
              if (base == null || rows == null || cols == null) {
                return (
                  <div
                    className="warning screen-element"
                    style={{ marginBottom: 0 }}
                    key={table.id + "error"}
                  >
                    There was a problem with one of the tables
                  </div>
                );
              }
              return (
                <table key={table.id} className="screen-table">
                  <thead>
                    {table.header.text.length > 0 ? (
                      <tr
                        className="table-header"
                        style={{ background: table.header.color }}
                      >
                        <td colSpan={cols.length + 2}>
                          <span>{table.header.text}</span>
                        </td>
                      </tr>
                    ) : (
                      <tr className="screen-element">
                        <td colSpan={cols.length + 2}>
                          <button
                            onClick={() => {
                              this.ObjectEdit("table", "header", table);
                            }}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {table.sidebar.text.length > 0 ? (
                      <tr
                        className="table-sidebar"
                        style={{ background: table.sidebar.color }}
                      >
                        <td rowSpan={rows.length + 2}>
                          <div>
                            <span>{table.sidebar.text}</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr className="table-sidebar">
                        <td rowSpan={rows.length + 2}>
                          <button
                            onClick={() => {
                              this.ObjectEdit("table", "sidebar", table);
                            }}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th
                        className="main-block"
                        style={
                          base.color != null || base.color !== "transparent"
                            ? { background: base.color }
                            : {}
                        }
                      >
                        {base != null ? (
                          <div>
                            <span>{base.name}</span>
                          </div>
                        ) : null}
                      </th>
                      {cols.map((col, colIndex) => {
                        return (
                          <th
                            key={"c" + col.id}
                            className="col-block"
                            style={
                              col.color != null || col.color !== "transparent"
                                ? { background: col.color }
                                : {}
                            }
                          >
                            <span>{col.name}</span>
                          </th>
                        );
                      })}
                    </tr>

                    {rows.map((row, rowIndex) => {
                      return (
                        <tr key={"r" + row.id}>
                          <th
                            className="row-block"
                            style={
                              row.color != null || row.color !== "transparent"
                                ? { background: row.color }
                                : {}
                            }
                          >
                            <span>{row.name}</span>
                          </th>
                          {cols.map((col, colIndex) => {
                            let block = objector["lectures"].filter(
                              block =>
                                block[listKey(table.base)] === base.id &&
                                block[listKey(table.rows)] === row.id &&
                                block[listKey(table.cols)] === col.id
                            );
                            if (block.length === 0) {
                              // if (this.state.mode === "print") {
                              //   return <td key={"emp" + col.id} />;
                              // }
                              return (
                                <td
                                  onClick={() => {
                                    let params = {};
                                    params[listKey(table.base)] = base.id;
                                    params[listKey(table.rows)] = row.id;
                                    params[listKey(table.cols)] = col.id;
                                    let toEdit = [
                                      "day",
                                      "time",
                                      "place",
                                      "batch",
                                      "subject",
                                      "teacher"
                                    ];
                                    this.props.showModal(
                                      "content",
                                      <LectureModal
                                        params={params}
                                        edit={toEdit.filter(p => {
                                          if (
                                            Object.keys(params).indexOf(p) < 0
                                          ) {
                                            return p;
                                          }
                                          return null;
                                        })}
                                        mode="create"
                                      />
                                    );
                                  }}
                                  key={"b" + col.id}
                                  className="table-block empty-block"
                                >
                                  <button>+</button>
                                </td>
                              );
                            } else {
                              let lecture = { ...block[0] };
                              return (
                                <td
                                  key={"b" + col.id}
                                  className="table-block"
                                  style={{ background: lecture.color }}
                                >
                                  {lecture.display.map(thing => {
                                    let loot = this.props[
                                      keyList(thing)
                                    ].filter(th => th.id === lecture[thing])[0];
                                    if (loot != null) {
                                      return (
                                        <span
                                          key={loot.name + lecture.id + "thing"}
                                        >
                                          {loot.name}
                                        </span>
                                      );
                                    } else {
                                      return (
                                        <span
                                          className="warning screen-element"
                                          style={{
                                            textTransform: "capitalize"
                                          }}
                                        >
                                          {loot} Error
                                        </span>
                                      );
                                    }
                                  })}
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {table.footer.text.length > 0 ? (
                      <tr
                        className="table-footer"
                        style={{ background: table.footer.color }}
                      >
                        <td colSpan={cols.length + 2}>
                          <span>{table.footer.text}</span>
                        </td>
                      </tr>
                    ) : (
                      <tr className="screen-element">
                        <td colSpan={cols.length + 2}>
                          <button
                            onClick={() => {
                              this.ObjectEdit("table", "footer", table);
                            }}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User,
    tables: state.Tables,
    lectures: state.Lectures,
    batches: state.Batches,
    days: state.Days,
    times: state.Times,
    places: state.Places,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};
export default connect(
  mapStateToProps,
  {
    showModal,
    unshowModal,
    updateTable,
    updateLecture,
    deleteLecture,
    swapBatch,
    swapDay,
    swapPlace,
    swapSubject,
    swapTeacher,
    swapTime,
    updateBatch,
    updateDay,
    updatePlace,
    updateSubject,
    updateTeacher,
    updateTime,
    deleteBatch,
    deleteDay,
    deletePlace,
    deleteSubject,
    deleteTeacher,
    deleteTime
  }
)(Screen);
