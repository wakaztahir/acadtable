import React, { Component } from "react";

import { connect } from "react-redux";

import storage from "../../actions/storage";

import { createLecture, updateLecture, deleteLecture } from "../../actions";

class Lectures extends Component {
  state = {
    display: "main",
    creator: {
      id: null,
      day: null,
      time: null,
      place: null,
      subject: null,
      teacher: null,
      batch: null,
      display: "%batch%%subject%%teacher%",
      mode: "create"
    }
  };
  componentWillUnmount() {
    storage.save();
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
        <form
          onSubmit={event => {
            event.preventDefault();
            if (this.state.creator.mode === "create") {
              let {
                place,
                subject,
                day,
                time,
                teacher,
                batch
              } = this.state.creator;
              this.props.createLecture({
                batch,
                subject,
                teacher,
                place,
                day,
                time
              });
            } else {
              let {
                id,
                place,
                subject,
                day,
                time,
                teacher,
                batch
              } = this.state.creator;
              this.props.updateLecture(id, {
                batch,
                subject,
                teacher,
                place,
                day,
                time
              });
            }
            this.setState({ display: "main" });
          }}
          className="form-table"
        >
          {Object.keys(objector).map(key => {
            let list = objector[key];
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
                  value={this.state.creator[key]}
                  required={true}
                  onChange={x => {
                    let y = {};
                    y[key] = x.target.value;
                    this.setState({ creator: { ...this.state.creator, ...y } });
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
            />
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.state.display === "create") {
      return this.creator();
    }
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <button
            onClick={() => {
              this.setState({
                display: "create",
                creator: {
                  id: null,
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
                      : null,
                  display: "%batch%%subject%%teacher%",
                  mode: "create"
                }
              });
            }}
          >
            Create A Lecture
          </button>
        </div>
        <div className="block-list">
          {this.props.lectures.map(lecture => {
            let subject = this.props.subjects.filter(
              st => st.id === lecture.subject
            )[0];
            let batch = this.props.batches.filter(
              bh => bh.id === lecture.batch
            )[0];
            let teacher = this.props.teachers.filter(
              tr => tr.id === lecture.teacher
            )[0];
            let time = this.props.times.filter(tm => tm.id === lecture.time)[0];
            let place = this.props.places.filter(
              pc => pc.id === lecture.place
            )[0];
            let day = this.props.days.filter(dy => dy.id === lecture.day)[0];
            return (
              <div key={lecture.id} className="block">
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
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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
    deleteLecture
  }
)(Lectures);
