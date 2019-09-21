import React, { Component } from "react";

import { connect } from "react-redux";

import {
  showModal,
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

import {
  keyList,
  lectureValidator,
  dayValidator,
  timeValidator,
  batchValidator,
  placeValidator,
  teacherValidator,
  subjectValidator,
  DAY_COLOR,
  TIME_COLOR,
  PLACE_COLOR,
  BATCH_COLOR,
  SUBJECT_COLOR,
  TEACHER_COLOR,
  DEFAULT_LECTURE
} from "../../actions/helpers";

import ColorsPanel from "./ColorsPanel";

class LectureModal extends Component {
  state = {
    params: this.props.params,
    display: "main"
  };
  render() {
    let params = this.props.params;
    let info = {
      ...DEFAULT_LECTURE,
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
              info.color = this.state.params.color;
              info.display =
                this.state.params.display !== undefined
                  ? this.state.params.display
                  : info.display;
              if (this.props.mode === "create") {
                let validator = lectureValidator(this.props.lectures, info);
                if (validator.value) {
                  this.props.createLecture(info);
                  this.props.unshowModal();
                } else {
                  this.props.showModal("message", validator.message);
                }
              } else if (this.props.mode === "update") {
                let validator = lectureValidator(this.props.lectures, info, {
                  id: this.state.params.id
                });
                if (validator.value) {
                  this.props.updateLecture(this.props.id, info);

                  this.props.unshowModal();
                } else {
                  this.props.showModal("message", validator.message);
                }
              }
            }}
          >
            {" "}
            {toEdit.map(key => {
              let list = this.props[keyList(key)];
              let value = params[key] != null ? params[key] : null;
              if (value == null || this.props.mode === "update") {
                return (
                  <div key={"inp" + key} className="form-row ">
                    <label
                      htmlFor={key}
                      style={{
                        textTransform: "capitalize"
                      }}
                    >
                      {" "}
                      {key} &nbsp;{" "}
                    </label>{" "}
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
                      {" "}
                      {list.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {" "}
                            {item.name}{" "}
                          </option>
                        );
                      })}{" "}
                    </select>{" "}
                    <button
                      style={{
                        margin: "0 0.5em"
                      }}
                      onClick={() => {
                        this.setState({
                          display: key
                        });
                      }}
                    >
                      +
                    </button>{" "}
                  </div>
                );
              } else {
                return null;
              }
            })}{" "}
            <div className="form-row">
              <label htmlFor=""> Color </label>{" "}
              <ColorsPanel
                color={this.state.params.color}
                change={color => {
                  this.setState({
                    params: {
                      ...this.state.params,
                      color
                    }
                  });
                }}
              />{" "}
            </div>{" "}
            <div className="form-row">
              <label htmlFor=""> Display </label>{" "}
              <select
                name=""
                id=""
                multiple
                value={info.display}
                onChange={ex => {
                  this.setState({
                    params: {
                      ...this.state.params,
                      display: [...ex.target.selectedOptions]
                        .filter(({ selected }) => selected)
                        .map(({ value }) => value)
                    }
                  });
                }}
                size="6"
              >
                <option value="batch"> Batch </option>{" "}
                <option value="teacher"> Teacher </option>{" "}
                <option value="subject"> Subject </option>{" "}
                <option value="place"> Place </option>{" "}
                <option value="day"> Day </option>{" "}
                <option value="time"> Time </option>{" "}
              </select>
              <span
                className="info"
                style={{
                  display: "inline"
                }}
              >
                <span>
                  These things will be displayed in the table in the order of
                  selection, Hold control to select multiple options{" "}
                </span>{" "}
              </span>{" "}
            </div>{" "}
            <div className="form-row">
              <span>
                <button onClick={this.props.unshowModal}> Cancel </button>{" "}
              </span>{" "}
              &nbsp;{" "}
              <input
                type="submit"
                style={{
                  textTransform: "capitalize"
                }}
                className="black-btn"
                value={this.props.mode || "create"}
              />{" "}
            </div>{" "}
          </form>{" "}
        </div>
      );
    } else {
      let creator, validator;
      let color = "transparent";
      switch (this.state.display) {
        case "day":
          creator = this.props.createDay;
          color = DAY_COLOR;
          validator = data => {
            return dayValidator(this.props.days, data);
          };
          break;
        case "time":
          creator = this.props.createTime;
          color = TIME_COLOR;
          validator = data => {
            return timeValidator(this.props.times, data);
          };
          break;
        case "place":
          creator = this.props.createPlace;
          color = PLACE_COLOR;
          validator = data => {
            return placeValidator(this.props.places, data);
          };
          break;
        case "subject":
          creator = this.props.createSubject;
          color = SUBJECT_COLOR;
          validator = data => {
            return subjectValidator(this.props.subjects, data);
          };
          break;
        case "batch":
          creator = this.props.createBatch;
          color = BATCH_COLOR;
          validator = data => {
            return batchValidator(this.props.batches, data);
          };
          break;
        case "teacher":
          creator = this.props.createTeacher;
          color = TEACHER_COLOR;
          validator = data => {
            return teacherValidator(this.props.teachers, data);
          };
          break;
        default:
          creator = null;
          break;
      }
      return (
        <div>
          <button
            onClick={() => {
              this.setState({
                display: "main"
              });
            }}
          >
            Back{" "}
          </button>{" "}
          <div
            style={{
              marginTop: "1em"
            }}
          >
            {" "}
            {creator != null ? (
              <form
                className="form-table"
                onSubmit={e => {
                  e.preventDefault();
                  let name = e.target[0].value;
                  let data = {
                    name,
                    color
                  };
                  let validation = validator(data);
                  if (validation.value) {
                    creator(data);
                  } else {
                    this.props.showModal("message", validation.message);
                  }
                  this.setState({
                    display: "main"
                  });
                }}
              >
                <div className="form-row">
                  <label
                    htmlFor=""
                    style={{
                      textTransform: "capitalize"
                    }}
                  >
                    {" "}
                    {this.state.display} &nbsp;{" "}
                  </label>{" "}
                  <input type="text" />
                </div>{" "}
                <div className="form-row">
                  <span />
                  <input type="submit" />
                </div>{" "}
              </form>
            ) : null}{" "}
          </div>{" "}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
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
    showModal,
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
