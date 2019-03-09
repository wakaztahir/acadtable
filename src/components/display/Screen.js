import React, { Component } from "react";

import { connect } from "react-redux";

import { showModal, unshowModal } from "../../actions";

import { listKey } from "../../actions/helpers";

import {
  downloadPNG,
  downloadJPEG,
  downloadPDF
} from "../../actions/downloader";

import "../../resources/screen.css";

import "../../resources/render.css";

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
                      <td>{base != null ? base.name : null}</td>
                      {cols.map(col => {
                        return <td key={"c" + col.id}>{col.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => {
                      return (
                        <tr key={"r" + row.id}>
                          <td>{row.name}</td>
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
                                    //this.props.displayAddModal(params);
                                  }}
                                  key={"b" + col.id}
                                  className="table-block empty-block"
                                >
                                  <button>+</button>
                                </td>
                              );
                            } else {
                              let lecture = block[0];
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
                                  onClick={() => {}}
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
    unshowModal
  }
)(Screen);
