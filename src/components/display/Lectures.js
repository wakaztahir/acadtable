import React, { Component } from "react";

import { connect } from "react-redux";

import {
  keyList,
  lectureValidator,
  LECTURE_COLOR
} from "../../actions/helpers";

import ColorsPanel from "../others/ColorsPanel";

import {
  createLecture,
  updateLecture,
  deleteLecture,
  showModal
} from "../../actions";

const DefaultCreator = {
  id: null,
  day: null,
  time: null,
  place: null,
  subject: null,
  teacher: null,
  batch: null,
  color: LECTURE_COLOR,
  display: "%batch%%subject%%teacher%",
  mode: "create"
};

class Lectures extends Component {
  state = {
    listshow: "all",
    showitem: "all",
    display: "main",
    creator: DefaultCreator
  };
  componentWillUnmount() {
    this.props.user.save();
  }
  creator() {
    let objector = {
      batch: this.props.batches,
      subject: this.props.subjects,
      teacher: this.props.teachers,
      day: this.props.days,
      time: this.props.times,
      place: this.props.places
    };
    return (
      <div>
        <h1>Lectures</h1>

        <div className="full-wrapper flex-center">
          <form
            onSubmit={event => {
              event.preventDefault();
              if (this.state.creator.mode === "create") {
                let lecture = {
                  batch: this.state.creator.batch,
                  subject: this.state.creator.subject,
                  teacher: this.state.creator.teacher,
                  place: this.state.creator.place,
                  day: this.state.creator.day,
                  time: this.state.creator.time,
                  color: this.state.creator.color
                };
                let validator = lectureValidator(this.props.lectures, lecture);
                if (validator.value) {
                  this.props.createLecture(lecture);
                  this.setState({ display: "main" });
                } else {
                  this.props.showModal("message", validator.message);
                }
              } else {
                let lecture = {
                  batch: this.state.creator.batch,
                  subject: this.state.creator.subject,
                  teacher: this.state.creator.teacher,
                  place: this.state.creator.place,
                  day: this.state.creator.day,
                  time: this.state.creator.time,
                  color: this.state.creator.color
                };
                let validator = lectureValidator(this.props.lectures, lecture, {
                  id: this.state.creator.id
                });
                if (validator.value) {
                  this.props.updateLecture(this.state.creator.id, lecture);
                  this.setState({ display: "main" });
                } else {
                  this.props.showModal("message", validator.message);
                }
              }
            }}
            className="form-table"
          >
            {Object.keys(objector).map(key => {
              let list = objector[key];
              if (this.state.creator[key] != null) {
                if (
                  list.filter(item => item.id === this.state.creator[key])
                    .length === 0
                ) {
                  if (list.length > 0) {
                    let creator = { ...this.state.creator };
                    creator[key] = list[0].id;
                    this.setState({ creator });
                  } else {
                    let creator = { ...this.state.creator };
                    creator[key] = null;
                    this.setState({ creator });
                  }
                }
              }
              return (
                <div className="form-row" key={key}>
                  <label
                    htmlFor={key + "sct"}
                    style={{ textTransform: "capitalize" }}
                  >
                    {key}
                  </label>
                  <select
                    name={key}
                    id={key + "sct"}
                    value={this.state.creator[key] || ""}
                    required={true}
                    onChange={x => {
                      let y = {};
                      y[key] = x.target.value;
                      this.setState({
                        creator: { ...this.state.creator, ...y }
                      });
                    }}
                  >
                    {list.map(item => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
            <div className="form-row">
              <label htmlFor="">Color </label>
              <ColorsPanel
                color={this.state.creator.color}
                change={color => {
                  this.setState({ creator: { ...this.state.creator, color } });
                }}
              />
            </div>
            <div className="form-row">
              <div>
                <button
                  onClick={() => {
                    this.setState({ display: "main" });
                  }}
                >
                  Cancel
                </button>
              </div>
              <input
                type="submit"
                value={this.state.creator.mode}
                style={{ textTransform: "capitalize" }}
                className="black-btn"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.display === "create") {
      return this.creator();
    }
    let objector = {
      batch: this.props.batches,
      subject: this.props.subjects,
      teacher: this.props.teachers,
      day: this.props.days,
      time: this.props.times,
      place: this.props.places
    };
    let itemlist;
    if (this.state.listshow === "all") {
      itemlist = [];
    } else {
      itemlist = objector[this.state.listshow];
    }
    const lectCard = lecture => {
      let subject = this.props.subjects.filter(
        st => st.id === lecture.subject
      )[0];
      let batch = this.props.batches.filter(bh => bh.id === lecture.batch)[0];
      let teacher = this.props.teachers.filter(
        tr => tr.id === lecture.teacher
      )[0];
      let time = this.props.times.filter(tm => tm.id === lecture.time)[0];
      let place = this.props.places.filter(pc => pc.id === lecture.place)[0];
      let day = this.props.days.filter(dy => dy.id === lecture.day)[0];
      return (
        <div
          key={lecture.id}
          className="block"
          style={{ background: lecture.color }}
        >
          <div className="block-txt">
            {subject != null ? (
              <span>{subject.name}</span>
            ) : (
              <span className="warning">Subject Error </span>
            )}
            {batch != null ? (
              <span>{batch.name}</span>
            ) : (
              <span className="warning">Batch Error </span>
            )}
            {teacher != null ? (
              <span>{teacher.name}</span>
            ) : (
              <span className="warning">Teacher Error </span>
            )}
            {time != null ? (
              <span>{time.name}</span>
            ) : (
              <span className="warning">Time Error </span>
            )}
            {place != null ? (
              <span>{place.name}</span>
            ) : (
              <span className="warning">Place Error </span>
            )}
            {day != null ? (
              <span>{day.name}</span>
            ) : (
              <span className="warning">Day Error </span>
            )}
          </div>
          <div className="block-btns">
            <button
              onClick={() => {
                this.setState({
                  display: "create",
                  creator: {
                    ...this.state.creator,
                    ...lecture,
                    mode: "update"
                  }
                });
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                this.props.deleteLecture(lecture.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    };

    return (
      <div>
        <h1>Lectures</h1>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({
                display: "create",
                creator: {
                  ...DefaultCreator,
                  day:
                    this.props.days[0] != null ? this.props.days[0].id : null,
                  time:
                    this.props.times[0] != null ? this.props.times[0].id : null,
                  place:
                    this.props.places[0] != null
                      ? this.props.places[0].id
                      : null,
                  subject:
                    this.props.subjects[0] != null
                      ? this.props.subjects[0].id
                      : null,
                  teacher:
                    this.props.teachers[0] != null
                      ? this.props.teachers[0].id
                      : null,
                  batch:
                    this.props.batches[0] != null
                      ? this.props.batches[0].id
                      : null
                }
              });
            }}
          >
            Create A Lecture
          </button>
        </div>
        <div style={{ marginLeft: "1rem" }}>
          <h3 style={{ display: "inline-block", marginRight: "10px" }}>
            Filter by
          </h3>
          <select
            value={this.state.listshow}
            onChange={x => {
              this.setState({ listshow: x.target.value, showitem: "all" });
            }}
            style={{ textTransform: "capitalize" }}
          >
            <option value="all">All</option>
            {Object.keys(objector).map(obj => {
              return (
                <option value={obj} key={obj + "listitem"}>
                  {keyList(obj)}
                </option>
              );
            })}
          </select>
          <select
            value={this.state.showitem}
            onChange={x => {
              this.setState({ showitem: x.target.value });
            }}
          >
            <option value="all">All</option>
            {itemlist.map(item => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>
        <div style={{ paddingBottom: "1rem" }}>
          {this.state.listshow === "all" ? (
            <div className="block-list">
              {this.props.lectures.map(lect => lectCard(lect))}
            </div>
          ) : (
            objector[this.state.listshow]
              .filter(item => {
                if (this.state.showitem === "all") {
                  return item;
                } else if (this.state.showitem === item.id) {
                  return item;
                }
                return null;
              })
              .map(item => {
                let lectures = this.props.lectures.filter(
                  lect => lect[this.state.listshow] === item.id
                );

                return (
                  <div>
                    <h2>{item.name}</h2>
                    <div className="block-list">
                      {lectures.length > 0 ? (
                        lectures.map(lect => lectCard(lect))
                      ) : (
                        <span>
                          There are no lectures for this{" "}
                          <strong style={{ textTransform: "capitalize" }}>
                            {this.state.listshow}
                          </strong>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User,
    lectures: state.Lectures,
    subjects: state.Subjects,
    places: state.Places,
    times: state.Times,
    teachers: state.Teachers,
    days: state.Days,
    batches: state.Batches
  };
};

export default connect(
  mapStateToProps,
  {
    createLecture,
    updateLecture,
    deleteLecture,
    showModal
  }
)(Lectures);
