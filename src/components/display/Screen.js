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

import { listKey, keyList, lectureValidator } from "../../actions/helpers";

import {
  downloadPNG,
  downloadJPEG,
  downloadPDF
} from "../../actions/downloader";

import "../../resources/screen.css";

import "../../resources/render.css";

import LectureModal from "../others/LectureModal";
import AreaEditor from "../others/AreaEditor";
import ObjectEditor from "../others/ObjectEditor";

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
  switcher(area, request) {
    let req = this.props[
      `${request}${area[0].toUpperCase()}${listKey(area).substr(
        1,
        listKey(area).length
      )}`
    ];
    if (req == null) {
      return null;
    }
    return req;
  }
  swapper(area, from, to) {
    let swap = null;
    swap = this.switcher(area, "swap");
    if (swap != null) {
      swap(from.id, to.id);
    }
  }
  lectureSwap(from, to) {
    let lectFind = this.props.lectures.filter(
      l => l.day === to.day && l.time === to.time && l.place === to.place
    );
    if (lectFind.length > 0) {
      let otherLecture = { ...lectFind[0] };
      otherLecture = {
        ...otherLecture,
        day: from.day,
        time: from.time,
        place: from.place
      };
      let otherValidator = lectureValidator(
        this.props.lectures,
        otherLecture,
        from
      );
      if (otherValidator.value) {
        this.props.updateLecture(otherLecture.id, otherLecture);
        let validator = lectureValidator(this.props.lectures, to, otherLecture);
        if (validator.value) {
          this.props.updateLecture(to.id, to);
        } else {
          this.props.showModal("message", validator.message);
        }
      } else {
        this.props.showModal(
          "message",
          "2nd lecture error , " + otherValidator.message
        );
      }
    } else {
      let validator = lectureValidator(this.props.lectures, to);
      if (validator.value) {
        this.props.updateLecture(to.id, to);
      } else {
        this.props.showModal("message", validator.message);
      }
    }
  }
  AreaEdit(area, element) {
    this.props.showModal(
      "content",
      <AreaEditor
        element={element}
        update={data => {
          this.switcher(area, "update")(element.id, data);
        }}
        delete={() => {
          this.switcher(area, "delete")(element.id);
        }}
      />
    );
  }
  ObjectEdit(area, obj, element) {
    this.props.showModal(
      "content",
      <ObjectEditor
        element={element}
        obj={obj}
        update={data => {
          this.switcher(keyList(area), "update")(element.id, data);
        }}
        delete={null}
      />
    );
  }
  deleter(area, element) {
    let deletor = null;
    deletor = this.switcher(area, "delete");
    if (deletor != null) {
      deletor(element.id);
    } else {
      console.log(deletor);
    }
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
              this.props.showModal();
              this.setState({
                tableMode: "pdfrender render",
                downloader: downloadPDF,
                download: true
              });
            }}
          >
            Download PDF
          </button>
          <button
            onClick={() => {
              this.props.showModal();
              this.setState({
                tableMode: "imgrender render",
                downloader: downloadJPEG,
                download: true
              });
            }}
          >
            Download JPEG
          </button>
          <button
            onClick={() => {
              this.props.showModal();
              this.setState({
                tableMode: "imgrender render",
                downloader: downloadPNG,
                download: true
              });
            }}
          >
            Download PNG
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

                          <div className="block-buttons">
                            <button
                              className="edit"
                              onClick={() => {
                                this.ObjectEdit("table", "header", table);
                              }}
                            />
                            <button
                              className="delete"
                              onClick={() => {
                                this.props.updateTable(table.id, {
                                  ...table,
                                  header: {
                                    ...table.header,
                                    text: ""
                                  }
                                });
                              }}
                            />
                          </div>
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
                          <div className="block-buttons">
                            <button
                              className="edit"
                              onClick={() => {
                                this.ObjectEdit("table", "sidebar", table);
                              }}
                            />
                            <button
                              className="delete"
                              onClick={() => {
                                this.props.updateTable(table.id, {
                                  ...table,
                                  sidebar: {
                                    ...table.sidebar,
                                    text: ""
                                  }
                                });
                              }}
                            />
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
                            <div className="block-buttons">
                              <button
                                className="edit"
                                style={{ width: "60%", left: "20%" }}
                                onClick={() => {
                                  this.AreaEdit(table.base, base);
                                }}
                              />
                            </div>
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
                            <div className="block-buttons">
                              {colIndex === 0 ? null : (
                                <button
                                  onClick={() => {
                                    this.swapper(
                                      table.cols,
                                      col,
                                      cols[colIndex - 1]
                                    );
                                  }}
                                  className="left"
                                />
                              )}
                              {colIndex === cols.length - 1 ? null : (
                                <button
                                  onClick={() => {
                                    this.swapper(
                                      table.cols,
                                      col,
                                      cols[colIndex + 1]
                                    );
                                  }}
                                  className="right"
                                />
                              )}
                              <button
                                className="edit"
                                style={{ width: "60%", left: "20%" }}
                                onClick={() => {
                                  this.AreaEdit(table.cols, col);
                                }}
                              />
                            </div>
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
                            <div className="block-buttons">
                              {rowIndex === 0 ? null : (
                                <button
                                  onClick={() => {
                                    this.swapper(
                                      table.rows,
                                      row,
                                      rows[rowIndex - 1]
                                    );
                                  }}
                                  className="above"
                                />
                              )}
                              {rowIndex === rows.length - 1 ? null : (
                                <button
                                  onClick={() => {
                                    this.swapper(
                                      table.rows,
                                      row,
                                      rows[rowIndex + 1]
                                    );
                                  }}
                                  className="bottom"
                                />
                              )}
                              <button
                                className="edit"
                                onClick={() => {
                                  this.AreaEdit(table.rows, row);
                                }}
                                style={{
                                  width: "60%",
                                  height: "50%",
                                  top: "25%",
                                  left: "20%"
                                }}
                              />
                            </div>
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
                              let subject = this.props.subjects.filter(
                                st => st.id === lecture.subject
                              )[0];
                              let batch = this.props.batches.filter(
                                bh => bh.id === lecture.batch
                              )[0];
                              let teacher = this.props.teachers.filter(
                                tr => tr.id === lecture.teacher
                              )[0];
                              return (
                                <td
                                  key={"b" + col.id}
                                  className="table-block"
                                  style={{ background: lecture.color }}
                                >
                                  {batch != null ? (
                                    <span>{batch.name}</span>
                                  ) : (
                                    <span className="warning screen-element">
                                      Batch Error
                                    </span>
                                  )}
                                  {subject != null ? (
                                    <span>{subject.name}</span>
                                  ) : (
                                    <span className="warning screen-element">
                                      Subject Error
                                    </span>
                                  )}
                                  {teacher != null ? (
                                    <span>{teacher.name}</span>
                                  ) : (
                                    <span className="warning screen-element">
                                      Teacher Error
                                    </span>
                                  )}
                                  <div className="block-buttons">
                                    {rowIndex === 0 ? null : (
                                      <button
                                        className="above"
                                        onClick={() => {
                                          let effectedRow = null;
                                          rows.filter((r, i) => {
                                            if (r.id === row.id) {
                                              effectedRow = rows[i - 1];
                                            }
                                            return r;
                                          });
                                          if (effectedRow != null) {
                                            let to = { ...lecture };
                                            to[listKey(table.rows)] =
                                              effectedRow.id;
                                            this.lectureSwap(block[0], to);
                                          }
                                        }}
                                      />
                                    )}
                                    {rowIndex === rows.length - 1 ? null : (
                                      <button
                                        className="bottom"
                                        onClick={() => {
                                          let effectedRow = null;
                                          rows.filter((r, i) => {
                                            if (r.id === row.id) {
                                              effectedRow = rows[i + 1];
                                            }
                                            return r;
                                          });
                                          if (effectedRow != null) {
                                            let to = { ...lecture };
                                            to[listKey(table.rows)] =
                                              effectedRow.id;
                                            this.lectureSwap(block[0], to);
                                          }
                                        }}
                                      />
                                    )}
                                    {colIndex === cols.length - 1 ? null : (
                                      <button
                                        className="right"
                                        onClick={() => {
                                          let effectedCol = null;
                                          cols.filter((c, i) => {
                                            if (c.id === col.id) {
                                              effectedCol = cols[i + 1];
                                            }
                                            return c;
                                          });
                                          if (effectedCol != null) {
                                            let to = { ...lecture };
                                            to[listKey(table.cols)] =
                                              effectedCol.id;
                                            this.lectureSwap(block[0], to);
                                          }
                                        }}
                                      />
                                    )}
                                    {colIndex === 0 ? null : (
                                      <button
                                        className="left"
                                        onClick={() => {
                                          let effectedCol = null;
                                          cols.filter((c, i) => {
                                            if (c.id === col.id) {
                                              effectedCol = cols[i - 1];
                                            }
                                            return c;
                                          });
                                          if (effectedCol != null) {
                                            let to = { ...lecture };
                                            to[listKey(table.cols)] =
                                              effectedCol.id;
                                            this.lectureSwap(block[0], to);
                                          }
                                        }}
                                      />
                                    )}
                                    <button
                                      className="edit"
                                      onClick={() => {
                                        this.props.showModal(
                                          "content",
                                          <LectureModal
                                            id={lecture.id}
                                            params={{ ...lecture }}
                                            edit={[
                                              "subject",
                                              "batch",
                                              "teacher"
                                            ]}
                                            mode="update"
                                          />
                                        );
                                      }}
                                    />
                                    <button
                                      className="delete"
                                      onClick={() => {
                                        this.props.showModal(
                                          "confirm",
                                          "Are you sure ?",
                                          [
                                            () => {
                                              this.props.deleteLecture(
                                                lecture.id
                                              );
                                            }
                                          ]
                                        );
                                      }}
                                    />
                                  </div>
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

                          <div className="block-buttons">
                            <button
                              className="edit"
                              onClick={() => {
                                this.ObjectEdit("table", "footer", table);
                              }}
                            />
                            <button
                              className="delete"
                              onClick={() => {
                                this.props.updateTable(table.id, {
                                  ...table,
                                  footer: { ...table.footer, text: "" }
                                });
                              }}
                            />
                          </div>
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
