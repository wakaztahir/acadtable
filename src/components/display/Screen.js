import React, { Component } from "react";

import { connect } from "react-redux";

import {
  showModal,
  unshowModal,
  showMenu,
  unshowMenu,
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
  menu(event, element, tochange = null, additional = null) {
    this.props.showMenu({
      event,
      element,
      tochange,
      additional
    });
    return false;
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

    //ALL IMPLEMENTATION

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
        <p style={{ color: "rgba(0,0,0,.6)" }}>* Don't forget to right click</p>
        <div className="flex-center" style={{ minWidth: "50em" }}>
          <div className={`screen ${this.state.tableMode}`} ref="screen">
            {objector.tables.map(table => {
              let base = objector[table.base].filter(
                i => i.id === table.baseValue
              )[0];
              let rows = objector[table.rows];
              let cols = objector[table.cols];
              if (base == null) {
                return null;
              }
              return (
                <table key={table.id} className="screen-table">
                  <thead>
                    <tr
                      className="table-header"
                      style={{ background: table.header.color }}
                    >
                      <td
                        colSpan={cols.length + 1}
                        onContextMenu={x => {
                          x.preventDefault();
                          return this.menu(
                            { x: x.clientX, y: x.clientY },
                            table,
                            "header"
                          );
                        }}
                      >
                        <span>{table.header.text}</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        className="main-block"
                        onContextMenu={x => {
                          x.preventDefault();
                          return this.menu(
                            { x: x.clientX, y: x.clientY },
                            base,
                            null,
                            { moveBlock: true, block: table, rowsLine: true }
                          );
                        }}
                      >
                        {base != null ? (
                          <div>
                            <span>{base.name}</span>
                          </div>
                        ) : null}
                      </th>

                      {/* COLOUMNS HEADINGS */}

                      {cols.map(col => {
                        return (
                          <th
                            key={"c" + col.id}
                            className="col-block"
                            onContextMenu={x => {
                              x.preventDefault();
                              return this.menu(
                                { x: x.clientX, y: x.clientY },
                                col,
                                null,
                                { colsLine: true }
                              );
                            }}
                          >
                            <div>
                              <span>{col.name}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>

                    {/* ROWS MAPPING */}

                    {rows.map((row, rindex) => {
                      return (
                        <tr key={"r" + row.id}>
                          <th
                            className="row-block"
                            onContextMenu={x => {
                              x.preventDefault();
                              return this.menu(
                                { x: x.clientX, y: x.clientY },
                                row,
                                null,
                                { rowsLine: true }
                              );
                            }}
                          >
                            <div>
                              <span>{row.name}</span>
                            </div>
                          </th>

                          {/* COLOUMNS MAPPING */}

                          {cols.map((col, cindex) => {
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
                                  key={"emp" + col.id}
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
                                  style={{
                                    background: lecture.color
                                  }}
                                  onContextMenu={x => {
                                    x.preventDefault();
                                    return this.menu(
                                      { x: x.clientX, y: x.clientY },
                                      lecture,
                                      null,
                                      {
                                        tableBase: table.base,
                                        base: base,
                                        rname: table.rows,
                                        cname: table.cols,
                                        rows,
                                        cols,
                                        rindex,
                                        cindex,
                                        lecture
                                      }
                                    );
                                  }}
                                >
                                  {lecture.display.map(thing => {
                                    let loot = this.props[
                                      keyList(thing)
                                    ].filter(th => th.id === lecture[thing])[0];
                                    return (
                                      <span
                                        key={loot.name + lecture.id + "thing"}
                                      >
                                        {loot.name}
                                      </span>
                                    );
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
                    <tr
                      className="table-footer"
                      style={{ background: table.footer.color }}
                    >
                      <td
                        colSpan={cols.length + 1}
                        onContextMenu={x => {
                          x.preventDefault();
                          return this.menu(
                            { x: x.clientX, y: x.clientY },
                            table,
                            "footer"
                          );
                        }}
                      >
                        <span>{table.footer.text}</span>
                      </td>
                    </tr>
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
    showMenu,
    unshowMenu,
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
