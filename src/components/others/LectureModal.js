import React, { Component } from "react";

import { connect } from "react-redux";

import {
  unshowModal,
  createLecture,
  updateLecture,
  createDay,
  createTime,
  createBatch,
  createPlace,
  createTeacher,
  createSubject
} from "../../actions/";
import { keyList } from "../../actions/helpers";

class LectureModal extends Component {
  state = {
    params: this.props.params,
    display: "main"
  };
  render() {
    let params = this.props.params;
    let info = {
      day: null,
      time: null,
      place: null,
      batch: null,
      subject: null,
      teacher: null,
      ...params
    };
    let toEdit = this.props.edit;
    if (this.state.display === "main") {
      return (
        <div className="full-wrapper">
          <form
            className="full-wrapper form-table flex-center"
            onSubmit={e => {
              e.preventDefault();
              let i = 0;
              while (e.target[i] != null) {
                if (e.target[i].name != null || e.target[i].name !== "") {
                  info[e.target[i].name] = e.target[i].value;
                  i++;
                } else {
                  break;
                }
              }
              if (this.props.mode === "create") {
                this.props.createLecture(info);
                this.props.unshowModal();
              } else if (this.props.mode === "update") {
                this.props.updateLecture(this.props.id, info);
                this.props.unshowModal();
              }
            }}
          >
            {toEdit.map(key => {
              let list = this.props[keyList(key)];
              let value = params[key] != null ? params[key] : null;
              if (value == null || this.props.mode === "update") {
                return (
                  <div key={"inp" + key} className="form-row ">
                    <label
                      htmlFor={key}
                      style={{ textTransform: "capitalize" }}
                    >
                      {key} &nbsp;
                    </label>
                    <select
                      id={key}
                      name={key}
                      defaultValue={
                        info[key] != null
                          ? info[key]
                          : list.length > 0
                          ? list[0].id
                          : null
                      }
                    >
                      {list.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      style={{ margin: "0 0.5em" }}
                      onClick={() => {
                        this.setState({ display: key });
                      }}
                    >
                      +
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
            <div className="form-row">
              <span>
                <button onClick={this.props.unshowModal}>Cancel</button>
              </span>
              &nbsp;
              <input
                type="submit"
                style={{ textTransform: "capitalize" }}
                className="black-btn"
                value={this.props.mode || "create"}
              />
            </div>
          </form>
        </div>
      );
    } else {
      let creator;
      switch (this.state.display) {
        case "day":
          creator = this.props.createDay;
          break;
        case "time":
          creator = this.props.createTime;
          break;
        case "place":
          creator = this.props.createPlace;
          break;
        case "subject":
          creator = this.props.createSubject;
          break;
        case "batch":
          creator = this.props.createBatch;
          break;
        case "teacher":
          creator = this.props.createTeacher;
          break;
        default:
          creator = null;
          break;
      }
      return (
        <div>
          <button
            onClick={() => {
              this.setState({ display: "main" });
            }}
          >
            Back
          </button>
          <div style={{ marginTop: "1em" }}>
            {creator != null ? (
              <form
                className="form-table"
                onSubmit={e => {
                  e.preventDefault();
                  let name = e.target[0].value;
                  creator({ name });
                  this.setState({ display: "main" });
                }}
              >
                <div className="form-row">
                  <label htmlFor="" style={{ textTransform: "capitalize" }}>
                    {this.state.display} &nbsp;
                  </label>
                  <input type="text" />
                </div>
                <div className="form-row">
                  <span />
                  <input type="submit" />
                </div>
              </form>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
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
    unshowModal,
    updateLecture,
    createDay,
    createTime,
    createBatch,
    createPlace,
    createTeacher,
    createSubject
  }
)(LectureModal);
