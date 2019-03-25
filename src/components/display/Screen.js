import React, { Component } from "react";

import { connect } from "react-redux";

import {
  showModal,
  unshowModal,
  updateLecture,
  deleteLecture,
  swapDay,
  swapBatch,
  swapPlace,
  swapTeacher,
  swapSubject,
  swapTime
} from "../../actions";

import { listKey, lectureValidator } from "../../actions/helpers";

import {
  downloadPNG,
  downloadJPEG,
  downloadPDF
} from "../../actions/downloader";

import "../../resources/screen.css";

import "../../resources/render.css";

import LectureModal from "../others/LectureModal";

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
  swapper(area, from, to) {
    let swap;
    switch (area) {
      default:
        swap = null;
        break;
      case "days":
        swap = this.props.swapDay;
        break;
      case "times":
        swap = this.props.swapTime;
        break;
      case "batches":
        swap = this.props.swapBatch;
        break;
      case "places":
        swap = this.props.swapPlace;
        break;
      case "subjects":
        swap = this.props.swapSubject;
        break;
    }
    if (swap != null) {
      swap(from.id, to.id);
    }
  }
  lectureSwap(from, to) {
    let lectFind = this.props.lectures.filter(
      l => l.day === to.day && l.time === to.time && l.place === to.place
    );
    if (lectFind.length > 0) {
      let otherLecture = lectFind[0];
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
                  >
                    There was a problem with one of the tables
                  </div>
                );
              }
              return (
                <table key={table.id} className="screen-table">
                  <thead>
                    <tr>
                      <td className="main-block">
                        {base != null ? <span>{base.name}</span> : null}
                      </td>
                      {cols.map((col, colIndex) => {
                        return (
                          <td key={"c" + col.id} className="col-block">
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
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => {
                      return (
                        <tr key={"r" + row.id}>
                          <td className="row-block">
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
                            </div>
                          </td>
                          {cols.map(col => {
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
                                    this.props.showModal(
                                      "content",
                                      <LectureModal
                                        params={params}
                                        edit={["subject", "batch", "teacher"]}
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
                                <td key={"b" + col.id} className="table-block">
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
                                          lecture[listKey(table.rows)] =
                                            effectedRow.id;
                                          this.lectureSwap(block[0], lecture);
                                        }
                                      }}
                                    />
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
                                          lecture[listKey(table.rows)] =
                                            effectedRow.id;
                                          this.lectureSwap(block[0], lecture);
                                        }
                                      }}
                                    />
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
                                          lecture[listKey(table.cols)] =
                                            effectedCol.id;
                                          this.lectureSwap(block[0], lecture);
                                        }
                                      }}
                                    />
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
                                          lecture[listKey(table.cols)] =
                                            effectedCol.id;
                                          this.lectureSwap(block[0], lecture);
                                        }
                                      }}
                                    />
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
    updateLecture,
    deleteLecture,
    swapBatch,
    swapDay,
    swapPlace,
    swapSubject,
    swapTeacher,
    swapTime
  }
)(Screen);
